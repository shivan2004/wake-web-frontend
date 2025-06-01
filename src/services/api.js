import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., token expired)
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

const apiService = {
  // Authentication
  googleLogin: (credential) => {
    return api.post('/api/auth/google-login', { credential });
  },

  githubLogin: (code) => {
    return api.post('/api/auth/github-login', { code });
  },

  // Helper methods for token management
  setAuthToken: (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  removeAuthToken: () => {
    delete api.defaults.headers.common['Authorization'];
  },

  // URL Management
  getAllUrls: () => {
    return api.get('/api/url/getAllUrls');
  },

  addUrl: (urlData) => {
    return api.post('/api/url/addUrl', urlData);
  },

  deleteUrl: (id) => {
    return api.delete(`/api/url/delete/${id}`);
  },

  pauseUrl: (id) => {
    return api.put(`/api/url/pause/${id}`);
  },

  retryUrl: (id) => {
    return api.put(`/api/url/retry/${id}`);
  },
};

export default apiService;