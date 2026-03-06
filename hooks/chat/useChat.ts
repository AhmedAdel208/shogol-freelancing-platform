"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "@/lib/api/chat";
import {
  startChatHub,
  stopChatHub,
  onReceiveMessage,
  onUserOnline,
  onUserOffline,
  onMessageRead,
} from "@/lib/signalr/chatHub";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "@/common/toast";


const QUERY_KEYS = {
  conversations: ["chat-conversations"] as const,
  messages: (id: number) => ["chat-messages", id] as const,
  onlineUsers: ["chat-online-users"] as const,
};

export function useChat() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuthStore();
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState<Record<number, boolean>>({});
  const hubStartedRef = useRef(false);
  const selectedIdRef = useRef<number | null>(null);

  useEffect(() => {
    selectedIdRef.current = selectedConversationId;
  }, [selectedConversationId]);

  // ─── Real-time SignalR ───────────────────────────────────
  useEffect(() => {
    let token: string | null = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
      if (!token) {
        try {
          const raw = localStorage.getItem("auth-storage");
          if (raw) token = JSON.parse(raw)?.state?.token || null;
        } catch { /* ignore */ }
      }
    }
    if (!isAuthenticated || !token) return;

    let cleanups: (() => void)[] = [];

    const bootstrap = async () => {
      try {
        const { onUserTyping } = await import("@/lib/signalr/chatHub");
        await startChatHub();
        hubStartedRef.current = true;

        cleanups.push(
          onReceiveMessage(() => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations });
            const activeId = selectedIdRef.current;
            if (activeId) {
              queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.messages(activeId),
              });
              // Auto mark-as-read since user is actively viewing this conversation
              chatApi.markAsRead(activeId).then(() => {
                queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations });
              }).catch(() => {});
            }
          })
        );

        cleanups.push(
          onUserOnline((userId) => {
            const normalizedId = String(userId).toLowerCase();
            console.log("👤 User Online:", normalizedId);
            setOnlineUsers((prev: Set<string>) => {
              const next = new Set(prev);
              next.add(normalizedId);
              return next;
            });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations });
          })
        );

        cleanups.push(
          onUserOffline((userId) => {
            const normalizedId = String(userId).toLowerCase();
            console.log("👤 User Offline:", normalizedId);
            setOnlineUsers((prev: Set<string>) => {
              const next = new Set(prev);
              next.delete(normalizedId);
              return next;
            });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations });
          })
        );

        cleanups.push(
          onUserTyping((data) => {
            if (data.userId.toLowerCase() === user?.id?.toLowerCase()) return;
            
            setIsTyping(prev => ({ ...prev, [data.conversationId]: data.isTyping }));
            
            // Infer online if typing!
            if (data.isTyping) {
              setOnlineUsers((prev: Set<string>) => {
                const next = new Set(prev);
                next.add(data.userId.toLowerCase());
                return next;
              });
            }
          })
        );

        cleanups.push(
          onMessageRead((convId) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.messages(convId) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations });
          })
        );
      } catch { /* connection error */ }
    };

    bootstrap();

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [isAuthenticated, queryClient, user?.id]);

  // Handle Joining/Leaving Conversation Groups separately
  useEffect(() => {
    if (!isAuthenticated || !selectedConversationId) return;

    let mounted = true;
    const handleGroup = async () => {
      try {
        const { joinConversation } = await import("@/lib/signalr/chatHub");
        if (mounted) joinConversation(selectedConversationId);
      } catch { /* ignore */ }
    };

    handleGroup();
    return () => {
      mounted = false;
      // We don't strictly need to leave conversation group on cleanup 
      // as the hub handles it, but we could if needed.
    };
  }, [selectedConversationId, isAuthenticated]);

  // ─── REST Queries ────────────────────────────────────────
  const conversationsQuery = useQuery({
    queryKey: QUERY_KEYS.conversations,
    queryFn: chatApi.getConversations,
    enabled: isAuthenticated,
    refetchInterval: 30_000,
  });

  const messagesQuery = useQuery({
    queryKey: QUERY_KEYS.messages(selectedConversationId!),
    queryFn: () => chatApi.getMessages(selectedConversationId!),
    enabled: isAuthenticated && selectedConversationId !== null,
  });

  const onlineUsersQuery = useQuery({
    queryKey: QUERY_KEYS.onlineUsers,
    queryFn: chatApi.getOnlineUsers,
    enabled: isAuthenticated,
    refetchInterval: 60_000,
  });

  const conversations = Array.isArray(conversationsQuery.data) ? conversationsQuery.data : [];

  // ─── Mutations & Actions ─────────────────────────────────
  const sendMutation = useMutation({
    mutationFn: ({ receiverId, content, attachment }: { receiverId: string, content: string, attachment?: File }) =>
      chatApi.sendMessage(receiverId, content, attachment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations });
      if (selectedConversationId) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.messages(selectedConversationId) });
      }
    },
  });

  const markReadMutation = useMutation({
    mutationFn: (conversationId: number) => chatApi.markAsRead(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (conversationId: number) => chatApi.deleteConversation(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations });
      setSelectedConversationId(null);
      toast.success("تم حذف المحادثة بنجاح");
    },
    onError: () => {
      toast.error("فشل في حذف المحادثة. حاول مرة أخرى.");
    }
  });

  const messages = Array.isArray(messagesQuery.data) ? messagesQuery.data : [];
  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);

  // ─── Syncing Status ───────────────────────────────────────
  
  // Sync from online-users API
  useEffect(() => {
    if (onlineUsersQuery.data) {
      setOnlineUsers((prev: Set<string>) => {
        const next = new Set(prev);
        onlineUsersQuery.data.forEach(id => next.add(String(id).toLowerCase()));
        return next;
      });
    }
  }, [onlineUsersQuery.data]);

  // Sync selection from 'user' search param only once per param
  const handledUserParams = useRef(new Set<string>());

  useEffect(() => {
    const userToChatId = searchParams.get("user");
    if (userToChatId && conversations.length > 0) {
      const paramLower = userToChatId.toLowerCase();
      if (!handledUserParams.current.has(paramLower)) {
        const target = conversations.find(c => 
          String(c.otherUserId).toLowerCase() === paramLower
        );
        if (target) {
          handledUserParams.current.add(paramLower);
          setSelectedConversationId(target.id);
          markReadMutation.mutate(target.id);
        }
      }
    }
  }, [searchParams, conversations, markReadMutation]);

  // Mark as read when new messages arrive for the selected conversation
  useEffect(() => {
    if (selectedConversationId && messages.length > 0) {
      const hasUnread = selectedConversation?.unreadCount && selectedConversation.unreadCount > 0;
      if (hasUnread) {
        markReadMutation.mutate(selectedConversationId);
      }
    }
  }, [selectedConversationId, messages.length, selectedConversation?.unreadCount, markReadMutation]);

  // Sync from conversations initial state
  useEffect(() => {
    if (conversations.length > 0) {
      setOnlineUsers((prev: Set<string>) => {
        const next = new Set(prev);
        let changes = false;
        conversations.forEach(c => {
          if (c.isOnline) {
            const id = String(c.otherUserId).toLowerCase();
            if (!next.has(id)) {
              next.add(id);
              changes = true;
            }
          }
        });
        return changes ? next : prev;
      });
    }
  }, [conversations]);

  const selectConversation = useCallback(
    async (id: number) => {
      const { joinConversation, leaveConversation } = await import("@/lib/signalr/chatHub");
      if (selectedConversationId) leaveConversation(selectedConversationId);
      setSelectedConversationId(id);
      joinConversation(id);
      markReadMutation.mutate(id);
    },
    [selectedConversationId, markReadMutation]
  );

  const sendMessage = useCallback(
    (receiverId: string, content: string, attachment?: File) => {
      if (!content.trim() && !attachment) return;
      sendMutation.mutate({ receiverId, content, attachment });
    },
    [sendMutation]
  );

  const deleteConversation = useCallback(
    (conversationId: number) => {
      deleteMutation.mutate(conversationId);
    },
    [deleteMutation]
  );

  const refetchConversations = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.onlineUsers });
  }, [queryClient]);

  const sendTypingStatus = useCallback(
    (status: boolean) => {
      if (!selectedConversationId) return;
      import("@/lib/signalr/chatHub").then(({ sendTypingEvent }) => {
        sendTypingEvent(selectedConversationId, status);
      });
    },
    [selectedConversationId]
  );

  return {
    conversations,
    messages,
    selectedConversation,
    selectedConversationId,
    onlineUsers,
    isTyping: selectedConversationId ? isTyping[selectedConversationId] : false,
    currentUserId: user?.id ?? null,
    currentUserImage: (user as any)?.profilePictureUrl ?? undefined,
    isLoadingConversations: conversationsQuery.isLoading && conversations.length === 0,
    isFetchingConversations: conversationsQuery.isFetching,
    isLoadingMessages: messagesQuery.isLoading,
    isFetchingMessages: messagesQuery.isFetching,
    isInitialLoading: (conversationsQuery.isLoading && conversations.length === 0),
    isSending: sendMutation.isPending,
    selectConversation,
    sendMessage,
    refetchConversations,
    sendTypingStatus,
    deleteConversation,
    isDeleting: deleteMutation.isPending,
  };
}
