"use client";

import { useState } from "react";
import { useChat } from "@/hooks/chat/useChat";
import { useProfile } from "@/hooks/profile/useProfile";
import {
  ConversationList,
  ChatHeader,
  MessageList,
  ChatInput,
  EmptyChatState,
} from "@/components/chat";
import Gradientline from "@/components/ui/header/Gradientline";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Footer from "@/components/landing/footer/Footer";

export default function MessagesPage() {
  const [showChatMobile, setShowChatMobile] = useState(false);
  const { data: profile } = useProfile();

  const {
    conversations,
    messages,
    selectedConversation,
    selectedConversationId,
    onlineUsers,
    isTyping,
    currentUserId,
    currentUserImage,
    isLoadingConversations,
    isFetchingConversations,
    isLoadingMessages,
    isSending,
    selectConversation,
    sendMessage,
    refetchConversations,
    sendTypingStatus,
    deleteConversation,
    isDeleting,
  } = useChat();

  const handleSelectConversation = (id: number) => {
    selectConversation(id);
    setShowChatMobile(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg" dir="rtl">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <Gradientline />
        <LinksHeader />
      </header>

      <main className="flex-1  mx-auto w-full">
        <div className="bg-white shadow-sm border-t sm:border border-gray-100 overflow-hidden flex h-[calc(100vh-140px)] sm:h-[calc(100vh-180px)] min-h-[500px]">
          {/* Sidebar */}
          <div
            className={`${
              showChatMobile ? "hidden md:flex" : "flex"
            } w-full md:w-[350px] border-l border-gray-100 flex-col transition-all duration-300`}
          >
            <ConversationList
              conversations={conversations}
              selectedId={selectedConversationId}
              onlineUsers={onlineUsers}
              onSelect={handleSelectConversation}
              onRefresh={refetchConversations}
              isLoading={isLoadingConversations}
              isFetching={isFetchingConversations}
            />
          </div>

          {/* Chat Window */}
          <div
            className={`${
              showChatMobile ? "flex" : "hidden md:flex"
            } flex-1 flex-col bg-slate-50/30 transition-all duration-300`}
          >
            {selectedConversation ? (
              <>
                <ChatHeader
                  name={selectedConversation.otherUserName}
                  image={selectedConversation.otherUserImage}
                  isOnline={selectedConversation.isOnline || onlineUsers.has(selectedConversation.otherUserId)}
                  onBack={() => setShowChatMobile(false)}
                  onDelete={() => deleteConversation(selectedConversation.id)}
                  isDeleting={isDeleting}
                />

                <MessageList
                  messages={messages}
                  currentUserId={currentUserId}
                  currentUserImage={profile?.profilePictureUrl || currentUserImage}
                  otherUserImage={selectedConversation.otherUserImage}
                  isTyping={isTyping}
                  isLoading={isLoadingMessages}
                />

                <ChatInput
                  key={selectedConversation.id}
                  onSend={(content, attachment) =>
                    sendMessage(
                      selectedConversation.otherUserId,
                      content,
                      attachment
                    )
                  }
                  isSending={isSending}
                  onTyping={sendTypingStatus}
                />
              </>
            ) : (
              <EmptyChatState />
            )}
          </div>
        </div>
      </main>

    </div>
  );
}
