"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { startChatHub, onReceiveMessage, onMessageRead } from "@/lib/signalr/chatHub";
import { useAuthStore } from "@/stores/useAuthStore";

const ChatContext = createContext<null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const hubStartedRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    let cleanups: (() => void)[] = [];

    const init = async () => {
      try {
        await startChatHub();
        hubStartedRef.current = true;

        cleanups.push(
          onReceiveMessage(() => {
            // Invalidate conversations to update unread counts in header
            queryClient.invalidateQueries({ queryKey: ["chat-conversations"] });
          })
        );

        cleanups.push(
          onMessageRead(() => {
            queryClient.invalidateQueries({ queryKey: ["chat-conversations"] });
          })
        );
      } catch (err) {
        console.error("Global ChatProvider SignalR error:", err);
      }
    };

    init();

    return () => {
      cleanups.forEach(fn => fn());
    };
  }, [isAuthenticated, queryClient]);

  return <ChatContext.Provider value={null}>{children}</ChatContext.Provider>;
};

export const useChatProvider = () => useContext(ChatContext);
