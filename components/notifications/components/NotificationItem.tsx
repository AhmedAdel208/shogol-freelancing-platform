import React from 'react';
import { motion } from 'framer-motion';
import { Check, Bell } from 'lucide-react';
import { Notification } from '../types';
import { getNotificationIcon, formatDate } from '../utils/notificationUtils';
import { ANIMATION_CONFIG } from '../constants';

interface NotificationItemProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
  onMarkAsRead: (notificationId: string) => void;
  index: number;
}

export function NotificationItem({ 
  notification, 
  onClick, 
  onMarkAsRead, 
  index 
}: NotificationItemProps) {
  const handleClick = () => {
    onClick(notification);
  };

  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkAsRead(String(notification.id));
  };

  return (
    <motion.div
      key={notification.id}
      initial={{ opacity: 0, x: -ANIMATION_CONFIG.X_OFFSET }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: ANIMATION_CONFIG.X_OFFSET }}
      transition={{ delay: index * ANIMATION_CONFIG.STAGGER_DELAY }}
      className={`group relative bg-gradient-to-br rounded-2xl border p-6 cursor-pointer transition-all duration-300 ${
        notification.isRead 
          ? 'from-gray-800 to-gray-900 border-gray-700' 
          : 'from-blue-900/20 to-indigo-900/20 border-blue-700/50'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 space-x-reverse flex-1">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            notification.isRead ? 'bg-gray-700' : 'bg-blue-600'
          }`}>
            {getNotificationIcon(notification.type)}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`font-semibold ${
                notification.isRead ? 'text-gray-300' : 'text-white'
              }`}>
                {notification.title}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Bell className="w-4 h-4" />
                {formatDate(notification.createdAt)}
              </div>
            </div>

            <p className={`text-sm mb-3 ${
              notification.isRead ? 'text-gray-400' : 'text-gray-300'
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
              onClick={handleMarkAsRead}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              aria-label="Mark as read"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
