export interface ChatMessage {
  id: number;
  conversationId: number;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  fileUrl?: string; // Mapped from attachmentUrl or fileUrl
  fileName?: string;
  sentAt: string; // Mapped from createdAt or sentAt
  isRead: boolean;
}

export interface Conversation {
  id: number;
  otherUserId: string;
  otherUserName: string;
  otherUserImage?: string;
  lastMessage: string;
  lastMessageTime: string; // Mapped from lastMessageAt or lastMessageDate
  unreadCount: number;
  isOnline: boolean;
}

export interface SendMessagePayload {
  receiverId: string;
  content?: string;
  attachment?: File;
}
