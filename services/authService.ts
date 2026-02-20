import api from './api';

interface LoginData {
  identifier: string; // Bisa email, NIS, atau NIP
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  points: number;
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// Login user
export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    // Backend expects 'identifier' (can be email, NIS, or NIP)
    const requestData = {
      identifier: data.identifier,
      password: data.password,
    };
    const response = await api.post<AuthResponse>('/login', requestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Register user
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logout = async (): Promise<void> => {
  try {
    await api.post('/logout');
  } catch (error) {
    throw error;
  }
};

// Get authenticated user
export const getAuthUser = async (): Promise<User> => {
  try {
    console.log('Fetching authenticated user...'); // Debug log
    const response = await api.get<{ user: User }>('/user');
    console.log('Authenticated user response:', response.data); // Debug log
    return response.data.user;
  } catch (error) {
    console.error('Error fetching authenticated user:', error); // Debug log
    throw error;
  }
};