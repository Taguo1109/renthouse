// utils/axiosInstance.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://oauth.zeabur.app',
  withCredentials: true, // 帶上跨網域 Cookie
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export default api;
