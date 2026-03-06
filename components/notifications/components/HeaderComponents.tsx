import React from 'react';
import { motion } from 'framer-motion';
import { Check, Wifi, WifiOff } from 'lucide-react';
import { ANIMATION_CONFIG } from '../constants';

interface NotificationsHeaderProps {
  unreadCount: number;
  signalRConnected: boolean;
  onMarkAllAsRead: () => void;
  onRefresh: () => void;
}

export function NotificationsHeader({ 
  unreadCount, 
  signalRConnected, 
  onMarkAllAsRead, 
  onRefresh 
}: NotificationsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: ANIMATION_CONFIG.Y_OFFSET }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION_CONFIG.DURATION }}
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
  );
}

interface NotificationsActionsProps {
  totalCount: number;
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onRefresh: () => void;
}

export function NotificationsActions({ 
  totalCount, 
  unreadCount, 
  onMarkAllAsRead, 
  onRefresh 
}: NotificationsActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex justify-between items-center mb-8"
    >
      <div className="text-gray-400">
        {totalCount} إشعار {unreadCount > 0 && `(${unreadCount} غير مقروء)`}
      </div>

      <div className="flex gap-4">
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <Check className="w-4 h-4" />
            تحديد الكل كمقروء
          </button>
        )}

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
        >
          تحديث
        </button>
      </div>
    </motion.div>
  );
}
