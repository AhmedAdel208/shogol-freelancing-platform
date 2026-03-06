import { useCallback } from 'react';
import { Notification } from '../types';
import { signalRService } from '@/lib/signalr/signalrService';

export const useSignalRHandlers = (
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
) => {
  const handleReceiveNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  }, [setNotifications]);

  const handleNotificationRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  }, [setNotifications]);

  const handleNotificationDeleted = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  }, [setNotifications]);

  return {
    handleReceiveNotification,
    handleNotificationRead,
    handleNotificationDeleted
  };
};
