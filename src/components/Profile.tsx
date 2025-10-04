import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import api from '../utils/axiosInstance';

// 這邊改成對應你的 data 內容
interface UserProfile {
  id: number;
  email: string;
  username: string;
  role: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/user/profile'); // 不用手動加 token，會自動附上 Bearer access_token

        if (res.data.status_code === '0000') {
          setProfile(res.data.data); // 取出 data 欄位
        } else {
          setError('取得會員資料失敗：' + res.data.msg_detail);
        }
      } catch (err) {
        const error = err as AxiosError;
        console.error('取得會員資料失敗', error.response?.status, error.message);
        if (error.response?.status === 401) {
          setError('請先登入才能查看會員資料');
        } else {
          setError('無法取得會員資料');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box mt={5} textAlign='center'>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth='sm'>
        <Box mt={5}>
          <Alert severity='error'>{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth='sm'>
      <Paper elevation={3} sx={{ mt: 5, p: 4, borderRadius: 2 }}>
        <Typography variant='h5' gutterBottom color='primary.main'>
          會員資料
        </Typography>
        <Typography variant='body1'>
          <strong>使用者名稱：</strong>
          {profile?.username}
        </Typography>
        <Typography variant='body1'>
          <strong>Email：</strong>
          {profile?.email}
        </Typography>
        <Typography variant='body1'>
          <strong>使用者ID：</strong>
          {profile?.id}
        </Typography>
        <Typography variant='body1'>
          <strong>角色：</strong>
          {profile?.role}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Profile;
