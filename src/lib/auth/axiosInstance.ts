import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000 ',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Smart interceptor
axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

export default axiosInstance;
