import axios from 'axios';
import {
  User,
  Habit,
  CreateHabitDto,
  UpdateHabitDto,
  CreateHabitEntryDto,
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  getProfile: (): Promise<User> =>
    api.get('/auth/profile').then(res => res.data),

  getGoogleAuthUrl: (): string => `${API_BASE_URL}/auth/google`,
};

export const habitsApi = {
  getAll: (): Promise<Habit[]> => api.get('/habits').then(res => res.data),

  getById: (id: string): Promise<Habit> =>
    api.get(`/habits/${id}`).then(res => res.data),

  create: (data: CreateHabitDto): Promise<Habit> =>
    api.post('/habits', data).then(res => res.data),

  update: (id: string, data: UpdateHabitDto): Promise<Habit> =>
    api.patch(`/habits/${id}`, data).then(res => res.data),

  delete: (id: string): Promise<void> => api.delete(`/habits/${id}`),

  createEntry: (habitId: string, data: CreateHabitEntryDto): Promise<any> =>
    api.post(`/habits/${habitId}/entries`, data).then(res => res.data),
};

export default api;
