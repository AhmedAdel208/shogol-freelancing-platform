"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Bell, CheckCheck, Inbox } from "lucide-react";
import { notificationsApi } from "@/lib/api/notifications";
import { useAuthStore } from "@/stores/useAuthStore";

const QUERY_KEY = ["notifications"];

export default function NotificationsContent() {
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  // 1. Fetch exact notifications from your elegant API
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: notificationsApi.getNotifications,
    enabled: isAuthenticated,
    refetchInterval: 15000, // Poll every 15s to stay fresh across devices
  });

  // Filter to only show UNREAD notifications (so "seen" messages disappear)
  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const unreadCount = unreadNotifications.length;

  // 2. Mutations for instant UX interactions
  const markAsReadMutation = useMutation({
    mutationFn: (id: string | number) => notificationsApi.markAsRead(id),
    onMutate: async (id) => {
      // Optimistic Update for list
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueryData<any[]>(QUERY_KEY);
      if (previous) {
        queryClient.setQueryData(
          QUERY_KEY,
          previous.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
      }
      
      // Optimistic Update for Top Badge
      await queryClient.cancelQueries({ queryKey: ["notifications-unread-count"] });
      queryClient.setQueryData(["notifications-unread-count"], (prev: number) => Math.max(0, (prev || 0) - 1));

      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onMutate: async () => {
      // Optimistic Update for list
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previous = queryClient.getQueryData<any[]>(QUERY_KEY);
      if (previous) {
        queryClient.setQueryData(
          QUERY_KEY,
          previous.map((n) => ({ ...n, isRead: true }))
        );
      }

      // Optimistic Update for Top Badge
      await queryClient.cancelQueries({ queryKey: ["notifications-unread-count"] });
      queryClient.setQueryData(["notifications-unread-count"], 0);

      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread-count"] });
    },
  });

  // 3. Time formatting for standard display
  const formatTime = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr.endsWith("Z") || dateStr.includes("+") ? dateStr : dateStr + "Z");
    const diffHours = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "الآن";
    if (diffHours < 24) return `منذ ${diffHours} ساعات`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "منذ يوم";
    return `منذ ${diffDays} أيام`;
  };

  const handleMarkAllRead = () => {
    if (unreadCount > 0) {
      markAllReadMutation.mutate();
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.isRead) {
      markAsReadMutation.mutate(notification.id);
    }

    // Dynamic Routing based on notification
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    } else {
      const type = notification.type?.toLowerCase() || "";
      if (type.includes("message")) {
        router.push("/messages");
      } else if (type.includes("proposal") || type.includes("request")) {
        router.push("/requests");
      } else if (type.includes("project")) {
        router.push("/projects");
      } 
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 font-cairo">
      {/* Header Match */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-10 gap-6">
        <div className="text-center sm:text-right">
          <h1 className="text-3xl font-black text-gray-900 mb-1">الإشعارات</h1>
          <p className="text-gray-500 font-medium text-sm">
            {unreadCount > 0 ? `لديك ${unreadCount} إشعارات غير مقروءة` : "ليس لديك إشعارات جديدة"}
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0 || markAllReadMutation.isPending}
          className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-bold transition-all duration-300 ${
            unreadCount > 0
              ? "border-primary text-primary hover:bg-primary/5 active:scale-95"
              : "border-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <CheckCheck size={18} />
          تعيين الكل كمقروء
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {unreadNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <Inbox className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 font-bold">لا توجد إشعارات حتى الآن</p>
          </div>
        ) : (
          unreadNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`flex items-center justify-between p-4 sm:p-5 bg-white border rounded-lg transition-all duration-300 cursor-pointer ${
                notification.isRead
                  ? "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  : "border-gray-300 hover:border-primary/50 shadow-[0_2px_10px_rgb(0,0,0,0.04)]"
              }`}
            >
              {/* Right Side: Bell Icon */}
              <div className="w-8 sm:w-10 flex justify-center text-gray-400 shrink-0">
                <Bell size={20} className={notification.isRead ? "text-gray-300" : "text-gray-400"} />
              </div>

              {/* Center Content */}
              <div className="flex-1 text-center px-4">
                <h3 className={`text-sm sm:text-base mb-1 ${notification.isRead ? "font-bold text-gray-700" : "font-black text-gray-900"}`}>
                  {notification.title}
                </h3>
                <p className={`text-xs sm:text-sm mb-2 ${notification.isRead ? "text-gray-500" : "text-gray-600"}`}>
                  {notification.message}
                </p>
                <div className="text-[11px] text-gray-400 font-medium">
                  {formatTime(notification.createdAt)}
                </div>
              </div>

              {/* Left Side: Unread Dot indicator */}
              <div className="w-8 sm:w-10 flex items-center justify-center shrink-0">
                {!notification.isRead && (
                  <div className="w-2 h-2 rounded-full bg-primary shadow-sm shadow-primary/40 animate-pulse" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
