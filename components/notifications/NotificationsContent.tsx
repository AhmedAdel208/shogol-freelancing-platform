"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Wifi, WifiOff, Clock } from "lucide-react";
import { signalRService } from "@/lib/signalr/signalrService";

// Import extracted modules
import { Notification } from "./types";
import { notificationsApi } from "./api/notificationsApi";
import { getNotificationIcon, formatDate } from "./utils/notificationUtils";
import { useNotificationHandlers } from "./hooks/useNotificationHandlers";
import { useSignalRHandlers } from "./hooks/useSignalRHandlers";

export default function NotificationsContent() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signalRConnected, setSignalRConnected] = useState(false);

  // Custom hooks
  const { handleReceiveNotification, handleNotificationRead, handleNotificationDeleted } = 
    useSignalRHandlers(setNotifications);

  // Initialize SignalR connection
  useEffect(() => {
    const initializeSignalR = async () => {
      try {
        await signalRService.startConnection();
        setSignalRConnected(true);

        // Setup SignalR event listeners
        signalRService.onReceiveNotification(handleReceiveNotification);
        signalRService.onNotificationRead(handleNotificationRead);
        signalRService.onNotificationDeleted(handleNotificationDeleted);

        console.log('SignalR initialized successfully');
      } catch (error) {
        console.error('Failed to initialize SignalR:', error);
        setSignalRConnected(false);
      }
    };

    initializeSignalR();

    // Cleanup
    return () => {
      signalRService.offReceiveNotification(handleReceiveNotification);
      signalRService.offNotificationRead(handleNotificationRead);
      signalRService.offNotificationDeleted(handleNotificationDeleted);
      signalRService.stopConnection();
    };
  }, [handleReceiveNotification, handleNotificationRead, handleNotificationDeleted]);

  // Fetch initial notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationsApi.fetchNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      if (signalRConnected) {
        await signalRService.markAsRead(notificationId);
      } else {
        // Fallback to HTTP API
        const success = await notificationsApi.markAsRead(notificationId);
        if (success) {
          setNotifications(prev => 
            prev.map(notif => 
              notif.id === notificationId 
                ? { ...notif, isRead: true }
                : notif
            )
          );
        }
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      if (signalRConnected) {
        await signalRService.markAllAsRead();
      } else {
        // Fallback to HTTP API
        const success = await notificationsApi.markAllAsRead();
        if (success) {
          setNotifications(prev => 
            prev.map(notif => ({ ...notif, isRead: true }))
          );
        }
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  // Custom hook for notification handlers
  const { handleNotificationClick } = useNotificationHandlers(markAsRead);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          الإشعارات
        </h1>
        <p className="text-gray-400 text-lg">
          {unreadCount > 0 ? `لديك ${unreadCount} إشعار غير مقروء` : 'لا توجد إشعارات جديدة'}
        </p>

        {/* SignalR Connection Status */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {signalRConnected ? (
            <div className="flex items-center gap-2 text-green-400">
              <Wifi className="w-4 h-4" />
              <span className="text-sm">اتصال مباشر نشط</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-yellow-400">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm">اتصال عادي</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Actions */}
      {notifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="text-gray-400">
            {notifications.length} إشعار {unreadCount > 0 && `(${unreadCount} غير مقروء)`}
          </div>

          <div className="flex gap-4">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Check className="w-4 h-4" />
                تحديد الكل كمقروء
              </button>
            )}

            <button
              onClick={fetchNotifications}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
            >
              تحديث
            </button>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-400 mt-4">جاري تحميل الإشعارات...</p>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchNotifications}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              إعادة المحاولة
            </button>
          </div>
        </motion.div>
      )}

      {/* Notifications List */}
      {!loading && !error && (
        <div className="space-y-4">
          <AnimatePresence>
            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">لا توجد إشعارات</p>
                <p className="text-gray-500">ستظهر إشعاراتك هنا عندما تكون متاحة</p>
              </motion.div>
            ) : (
              notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative bg-gradient-to-br rounded-2xl border p-6 cursor-pointer transition-all duration-300 ${notification.isRead
                      ? 'from-gray-800 to-gray-900 border-gray-700'
                      : 'from-blue-900/20 to-indigo-900/20 border-blue-700/50'
                    }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 space-x-reverse flex-1">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${notification.isRead ? 'bg-gray-700' : 'bg-blue-600'
                        }`}>
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-semibold ${notification.isRead ? 'text-gray-300' : 'text-white'
                            }`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Clock className="w-4 h-4" />
                            {formatDate(notification.createdAt)}
                          </div>
                        </div>

                        <p className={`text-sm mb-3 ${notification.isRead ? 'text-gray-400' : 'text-gray-300'
                          }`}>
                          {notification.message}
                        </p>

                        {!notification.isRead && (
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                            <span className="text-xs text-blue-400">غير مقروء</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      {!notification.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(String(notification.id));

                          }}
                          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}

                      {/* <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button> */}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
