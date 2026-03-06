import { Notification } from '../types';
import { API_ENDPOINTS } from '../constants';

export const notificationsApi = {
  // Fetch all notifications
  async fetchNotifications(): Promise<Notification[]> {
    const token = localStorage.getItem("token");
    
    const response = await fetch(API_ENDPOINTS.BASE, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
    
    return data || [];
  },

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<boolean> {
    const token = localStorage.getItem('token');
    
    const response = await fetch(
      API_ENDPOINTS.MARK_READ(notificationId),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    return response.ok;
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<boolean> {
    const token = localStorage.getItem('token');
    
    const response = await fetch(
      API_ENDPOINTS.MARK_ALL_READ,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    return response.ok;
  }
};
