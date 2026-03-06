import { useCallback } from 'react';
import { useNotifications } from '../providers/NotificationProvider';
import { useRouter } from 'next/navigation';
import { NOTIFICATION_TYPES, NOTIFICATION_ROUTES } from '../constants';
import { Notification } from '../types';

export const useNotificationInteractions = () => {
  const { markAsRead } = useNotifications();
  const router = useRouter();

  const handleNotificationClick = useCallback(async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(String(notification.id));
    }

    // Handle JobCompleted notifications
    if (notification.type === NOTIFICATION_TYPES.JOB_COMPLETED && 
        notification.relatedEntityType === "JobRequest" && 
        notification.relatedEntityId) {
      router.push(`${NOTIFICATION_ROUTES.JOB_REQUESTS}/${notification.relatedEntityId}`);
      return;
    }

    // Handle ProposalReceived notifications for clients
    if (notification.type === NOTIFICATION_TYPES.PROPOSAL_RECEIVED && notification.relatedEntityId) {
      router.push(`${NOTIFICATION_ROUTES.JOB_REQUESTS}/${notification.relatedEntityId}`);
      return;
    }

    // Handle JobRequestCreated notifications for clients
    if (notification.type === NOTIFICATION_TYPES.JOB_REQUEST_CREATED && notification.relatedEntityId) {
      router.push(`${NOTIFICATION_ROUTES.JOB_REQUESTS}/${notification.relatedEntityId}`);
      return;
    }

    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  }, [markAsRead, router]);

  return {
    handleNotificationClick
  };
};
