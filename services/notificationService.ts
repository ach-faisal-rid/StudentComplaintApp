import api from './api';

export interface Notification {
  id: number;
  user_id: number;
  complaint_id: number | null;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationsResponse {
  data: Notification[];
  current_page: number;
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

interface ApiResponse {
  notifications: NotificationsResponse;
}

// Get user notifications
export const getNotifications = async (): Promise<NotificationsResponse> => {
  try {
    const response = await api.get<ApiResponse>('/notifications');
    return response.data.notifications;
  } catch (error: any) {
    console.error('Error fetching notifications:', error.response?.data || error.message);
    throw error;
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (id: number): Promise<Notification> => {
  try {
    const response = await api.post(`/notifications/${id}/read`);
    return response.data.notification;
  } catch (error: any) {
    console.error('Error marking notification as read:', error.response?.data || error.message);
    throw error;
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (): Promise<void> => {
  try {
    await api.post('/notifications/read-all');
  } catch (error: any) {
    console.error('Error marking all notifications as read:', error.response?.data || error.message);
    throw error;
  }
};