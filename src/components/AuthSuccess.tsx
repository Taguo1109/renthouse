import { useEffect } from 'react';
import axios from 'axios';

const AuthSuccess = () => {
  useEffect(() => {
    axios
      .get('https://oauth.zeabur.app/api/auth/token', { withCredentials: true })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        window.location.href = '/renthouse/';
      })
  }, []);

  return <div>登入中...</div>;
};

export default AuthSuccess;
