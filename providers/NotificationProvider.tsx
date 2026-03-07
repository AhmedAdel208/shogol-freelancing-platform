import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Notification } from '@/components/notifications/types';
import { notificationsApi } from '@/components/notifications/api/notificationsApi';
import { signalRService } from '@/lib/signalr/signalrService';

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  signalRConnected: boolean;
  unreadCount: number;
}

type NotificationAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_AS_READ'; payload: string | number }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'SET_SIGNALR_CONNECTED'; payload: boolean }
  | { type: 'DELETE_NOTIFICATION'; payload: string | number };

const initialState: NotificationState = {
  notifications: [],
  loading: true,
  error: null,
  signalRConnected: false,
  unreadCount: 0,
};

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
        loading: false,
        error: null,
        unreadCount: action.payload.filter(n => !n.isRead).length,
      };
    
    case 'ADD_NOTIFICATION':
      const newNotifications = [action.payload, ...state.notifications];
      return {
        ...state,
        notifications: newNotifications,
        unreadCount: newNotifications.filter(n => !n.isRead).length,
      };
    
    case 'MARK_AS_READ':
      const updatedNotifications = state.notifications.map(notif =>
        notif.id === action.payload ? { ...notif, isRead: true } : notif
      );
      return {
        ...state,
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(n => !n.isRead).length,
      };
    
    case 'MARK_ALL_AS_READ':
      const allReadNotifications = state.notifications.map(notif => ({ ...notif, isRead: true }));
      return {
        ...state,
        notifications: allReadNotifications,
        unreadCount: 0,
      };
    
    case 'DELETE_NOTIFICATION':
      const filteredNotifications = state.notifications.filter(notif => notif.id !== action.payload);
      return {
        ...state,
        notifications: filteredNotifications,
        unreadCount: filteredNotifications.filter(n => !n.isRead).length,
      };
    
    case 'SET_SIGNALR_CONNECTED':
      return { ...state, signalRConnected: action.payload };
    
    default:
      return state;
  }
}

interface NotificationContextType extends NotificationState {
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // SignalR event handlers
  const handleReceiveNotification = (notification: Notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const handleNotificationRead = (notificationId: string) => {
    dispatch({ type: 'MARK_AS_READ', payload: notificationId });
  };

  const handleNotificationDeleted = (notificationId: string) => {
    dispatch({ type: 'DELETE_NOTIFICATION', payload: notificationId });
  };

  // Initialize SignalR
  useEffect(() => {
    const initializeSignalR = async () => {
      try {
        await signalRService.startConnection();
        dispatch({ type: 'SET_SIGNALR_CONNECTED', payload: true });

        signalRService.onReceiveNotification(handleReceiveNotification);
        signalRService.onNotificationRead(handleNotificationRead);
        signalRService.onNotificationDeleted(handleNotificationDeleted);

        console.log('SignalR initialized successfully');
      } catch (error) {
        console.error('Failed to initialize SignalR:', error);
        dispatch({ type: 'SET_SIGNALR_CONNECTED', payload: false });
      }
    };

    initializeSignalR();

    return () => {
      signalRService.offReceiveNotification(handleReceiveNotification);
      signalRService.offNotificationRead(handleNotificationRead);
      signalRService.offNotificationDeleted(handleNotificationDeleted);
      signalRService.stopConnection();
    };
  }, []);

  // API functions
  const fetchNotifications = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await notificationsApi.fetchNotifications();
      dispatch({ type: 'SET_NOTIFICATIONS', payload: data });
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load notifications' });
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      if (state.signalRConnected) {
        await signalRService.markAsRead(notificationId);
      } else {
        const success = await notificationsApi.markAsRead(notificationId);
        if (success) {
          dispatch({ type: 'MARK_AS_READ', payload: notificationId });
        }
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      if (state.signalRConnected) {
        await signalRService.markAllAsRead();
      } else {
        const success = await notificationsApi.markAllAsRead();
        if (success) {
          dispatch({ type: 'MARK_ALL_AS_READ' });
        }
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const refreshNotifications = async () => {
    await fetchNotifications();
  };

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, []);

  const value: NotificationContextType = {
    ...state,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
