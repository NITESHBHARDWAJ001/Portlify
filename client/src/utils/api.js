import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        // Unauthorized - logout user
        useAuthStore.getState().logout();
        window.location.href = '/login';
        toast.error('Session expired. Please login again.');
      } else if (status === 403) {
        toast.error(data.message || 'Permission denied');
      } else if (status === 404) {
        toast.error(data.message || 'Resource not found');
      } else if (status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('Request failed. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default api;

// API methods
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/password', data),
  getProfileData: () => api.get('/auth/profile-data'),
  updateProfileData: (data) => api.put('/auth/profile-data', data),
  generateAssets: (data) => api.post('/auth/generate-assets', data),
  atsCheck: (data) => api.post('/auth/ats-check', data),
  downloadResume: (template = 'modern') => api.get('/auth/download-resume', {
    params: { template },
    responseType: 'blob'
  }),
};

export const portfolioAPI = {
  create: (data) => api.post('/portfolios', data),
  getAll: () => api.get('/portfolios'),
  getById: (id) => api.get(`/portfolios/${id}`),
  update: (id, data) => api.put(`/portfolios/${id}`, data),
  delete: (id) => api.delete(`/portfolios/${id}`),
  togglePublish: (id) => api.put(`/portfolios/${id}/publish`),
  getPublished: (username) => api.get(`/portfolios/p/${username}`),
  discover: (params) => api.get('/portfolios/discover', { params }),
};

export const templateAPI = {
  getAll: (params) => api.get('/templates', { params }),
  getById: (id) => api.get(`/templates/${id}`),
  getMy: () => api.get('/templates/user/my'),
  getSaved: () => api.get('/templates/user/saved'),
  create: (data) => api.post('/templates', data),
  update: (id, data) => api.put(`/templates/${id}`, data),
  delete: (id) => api.delete(`/templates/${id}`),
  use: (id) => api.post(`/templates/${id}/use`),
  toggleLike: (id) => api.post(`/templates/${id}/like`),
};

export const resumeAPI = {
  parse: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    // Do NOT set Content-Type manually — axios will set multipart/form-data
    // with the correct boundary when it detects a FormData body.
    return api.post('/resume/parse', formData, {
      headers: { 'Content-Type': undefined },
    });
  },
};
