import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
  Stack,
} from '@mui/material';
import api from '../utils/axiosInstance';

// 後端回傳的 DTO（對應 /api/user/me）
interface UserProfileDto {
  userId: string; // UUID
  name: string | null;
  email: string | null;
  pictureUrl: string | null;
  locale: string | null;
  role: string;
}

interface JsonResult<T> {
  state: string;
  message: string;
  data: T;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 後端用 Session Cookie 判斷身分
        const res = await api.get<JsonResult<UserProfileDto>>('/api/user/me', {
          withCredentials: true,
        });
        setProfile(res.data.data);
      } catch (err) {
        const e = err as AxiosError;
        if (e.response?.status === 401) {
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

  if (!profile) return null;

  return (
    <Container maxWidth='sm'>
      <Paper elevation={3} sx={{ mt: 5, p: 4, borderRadius: 2 }}>
        <Stack direction='row' spacing={2} alignItems='center' mb={2}>
          <Avatar
            src={profile.pictureUrl ?? undefined}
            alt={profile.name ?? profile.email ?? 'user'}
            sx={{ width: 64, height: 64 }}
          />
          <Box>
            <Typography variant='h5' color='primary.main'>
              {profile.name || '未提供名稱'}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Email：</strong>
          {profile.email || '—'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>使用者 ID：</strong>
          {profile.userId}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>語系：</strong>
          {profile.locale || '—'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>角色：</strong>
          {profile.role || '—'}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Profile;
