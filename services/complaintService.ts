import api from './api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Complaint {
  id: number;
  user_id: number;
  title: string;
  description: string;
  image_path: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  user?: User;
}

// Statistics interface
interface ComplaintStats {
  total: number;
  pending: number;
  reviewed: number;
  resolved: number;
}

// Gamification interface
interface GamificationData {
  total_points: number;
  level: number;
  points_to_next_level: number;
}

// Combined stats interface
interface StatsResponse {
  stats: ComplaintStats;
  gamification: GamificationData;
}

// Get all complaints for the authenticated user
export const getComplaints = async (): Promise<Complaint[]> => {
  try {
    console.log('Fetching complaints...'); // Debug log
    const response = await api.get('/complaints');
    console.log('Complaints response:', response.data); // Debug log
    // The API returns { complaints: [...] }, so we need to extract the complaints array
    return response.data.complaints || [];
  } catch (error: any) {
    console.error('Error fetching complaints:', error.response?.data || error.message);
    throw error;
  }
};

// Get complaint statistics
export const getComplaintStats = async (): Promise<StatsResponse> => {
  try {
    console.log('Fetching complaint stats...'); // Debug log
    const response = await api.get('/complaints/stats');
    console.log('Complaint stats response:', response.data); // Debug log
    return response.data;
  } catch (error: any) {
    console.error('Error fetching complaint stats:', error.response?.data || error.message);
    throw error;
  }
};

// Get a specific complaint
export const getComplaint = async (id: number): Promise<Complaint> => {
  try {
    const response = await api.get(`/complaints/${id}`);
    // The API returns { complaint: {...} }, so we need to extract the complaint object
    return response.data.complaint;
  } catch (error: any) {
    console.error(`Error fetching complaint ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Create a new complaint
export const createComplaint = async (data: FormData | { title: string; description: string }): Promise<Complaint> => {
  try {
    let response;
    
    if (data instanceof FormData) {
      // Handle FormData (with image)
      response = await api.post('/complaints', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // Handle regular JSON data (without image)
      response = await api.post('/complaints', data);
    }
    
    // The API returns { complaint: {...} }, so we need to extract the complaint object
    return response.data.complaint;
  } catch (error: any) {
    console.error('Error creating complaint:', error.response?.data || error.message);
    // Throw a more descriptive error
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to create complaints.');
    } else if (error.response?.status === 422) {
      throw new Error('Validation failed. Please check your input.');
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to submit complaint. Please try again.');
    }
  }
};

// Delete a complaint
export const deleteComplaint = async (id: number): Promise<void> => {
  try {
    await api.delete(`/complaints/${id}`);
  } catch (error: any) {
    console.error(`Error deleting complaint ${id}:`, error.response?.data || error.message);
    throw error;
  }
};