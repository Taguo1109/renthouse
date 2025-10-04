// utils/axiosInstance.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://go-auth-system.zeabur.app', // 改成你的 API 網址
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔒 Token refresh flag
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach(cb => cb(newToken));
  refreshSubscribers = [];
};

// 1️⃣ Request interceptor：自動加上 access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2️⃣ Response interceptor：自動處理 401
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 如果是 401 且尚未重試過
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // 等待刷新完成後 retry
        return new Promise(resolve => {
          subscribeTokenRefresh((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            return Promise.reject({
                isAxiosError: true,
                response: {
                  status: 401,
                },
              });
          }
        const res = await api.post('/refresh', { refresh_token: refreshToken });
        const { access_token, refresh_token } = res.data.data;

        // 儲存新 token
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        // 通知所有等待中的請求
        onRefreshed(access_token);

        // retry 原請求
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshErr) {
        // 無法刷新，強制登出
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;