"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import extracted modules and components
import { NotificationProvider, useNotifications } from './providers/NotificationProvider';
import { useNotificationInteractions } from './hooks/useNotificationInteractions';
import { 
  ErrorBoundary, 
  LoadingSkeleton, 
  EmptyState, 
  ErrorState, 
  NotificationItem, 
  NotificationsHeader, 
  NotificationsActions 
} from './components';
import { UI_CONFIG } from './constants';

// Main notifications content component
function NotificationsContentInner() {
  const {
    notifications,
    loading,
    error,
    signalRConnected,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
  } = useNotifications();

  const { handleNotificationClick } = useNotificationInteractions();

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refreshNotifications} />;
  }

  return (
    <div className={`${UI_CONFIG.MAX_WIDTH} mx-auto ${UI_CONFIG.PADDING}`}>
      
      {/* Header */}
      <NotificationsHeader
        unreadCount={unreadCount}
        signalRConnected={signalRConnected}
        onMarkAllAsRead={markAllAsRead}
        onRefresh={refreshNotifications}
      />

      {/* Actions */}
      {notifications.length > 0 && (
        <NotificationsActions
          totalCount={notifications.length}
          unreadCount={unreadCount}
          onMarkAllAsRead={markAllAsRead}
          onRefresh={refreshNotifications}
        />
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <EmptyState />
          ) : (
            notifications.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={handleNotificationClick}
                onMarkAsRead={markAsRead}
                index={index}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Main component with error boundary and provider
export default function NotificationsContent() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <NotificationsContentInner />
      </NotificationProvider>
    </ErrorBoundary>
  );
}
