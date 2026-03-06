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
            if (selectedConversationId) {
              queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.messages(selectedConversationId),
              });
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

        if (selectedConversationId) {
          const { joinConversation } = await import("@/lib/signalr/chatHub");
          joinConversation(selectedConversationId);
        }
      } catch { /* connection error */ }
    };

    bootstrap();

    return () => {
      cleanups.forEach((fn) => fn());
      stopChatHub();
      hubStartedRef.current = false;
    };
  }, [isAuthenticated, queryClient, selectedConversationId, user?.id]);

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

  // Sync selection from 'user' search param
  useEffect(() => {
    const userToChatId = searchParams.get("user");
    if (userToChatId && conversations.length > 0) {
      const target = conversations.find(c => 
        String(c.otherUserId).toLowerCase() === userToChatId.toLowerCase()
      );
      if (target && target.id !== selectedConversationId) {
        setSelectedConversationId(target.id);
      }
    }
  }, [searchParams, conversations, selectedConversationId]);

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

  const refetchConversations = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.conversations });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.onlineUsers });
  }, [queryClient]);

  const messages = Array.isArray(messagesQuery.data) ? messagesQuery.data : [];
  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);

  return {
    conversations,
    messages,
    selectedConversation,
    selectedConversationId,
    onlineUsers,
    currentUserId: user?.id ?? null,
    isLoadingConversations: conversationsQuery.isLoading || conversationsQuery.isFetching,
    isLoadingMessages: messagesQuery.isLoading || messagesQuery.isFetching,
    isInitialLoading: (conversationsQuery.isLoading && conversations.length === 0),
    isSending: sendMutation.isPending,
    selectConversation,
    sendMessage,
    refetchConversations,
  };
}
