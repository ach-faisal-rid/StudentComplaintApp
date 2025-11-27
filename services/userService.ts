import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  points: number;
  rank?: number;
}

interface NotificationPreferences {
  id: number;
  user_id: number;
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  created_at: string;
  updated_at: string;
}

interface LeaderboardData {
  leaderboard: User[];
  currentUser: User;
}

// Get user profile
export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get('/user');
    return response.data.user;
  } catch (error: any) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (data: { name: string; email: string }): Promise<User> => {
  try {
    const response = await api.put('/user/profile', data);
    return response.data.user;
  } catch (error: any) {
    console.error('Error updating user profile:', error.response?.data || error.message);
    throw error;
  }
};

// Change password
export const changePassword = async (data: { current_password: string; new_password: string; new_password_confirmation: string }): Promise<void> => {
  try {
    await api.post('/user/change-password', data);
  } catch (error: any) {
    console.error('Error changing password:', error.response?.data || error.message);
    throw error;
  }
};

// Get notification preferences
export const getNotificationPreferences = async (): Promise<NotificationPreferences> => {
  try {
    const response = await api.get('/user/notifications');
    return response.data.preferences;
  } catch (error: any) {
    console.error('Error fetching notification preferences:', error.response?.data || error.message);
    throw error;
  }
};

// Update notification settings
export const updateNotifications = async (data: { email: boolean; push: boolean; sms: boolean }): Promise<void> => {
  try {
    await api.post('/user/notifications', data);
  } catch (error: any) {
    console.error('Error updating notifications:', error.response?.data || error.message);
    throw error;
  }
};

// Get leaderboard data
export const getLeaderboard = async (): Promise<LeaderboardData> => {
  try {
    const response = await api.get('/leaderboard');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error.response?.data || error.message);
    throw error;
  }
};