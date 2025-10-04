// components/Navbar.tsx
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import LogoutSuccessDialog from './dialog/LogoutSuccessDialog';
import api from '../utils/axiosInstance';
import { GOOGLE_LOGIN_URL } from '../config/auth';

const Navbar = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // 開頁用 session 檢查登入狀態
  useEffect(() => {
    (async () => {
      try {
        await api.get('/api/user/me', { withCredentials: true });
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setAuthChecked(true);
      }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
      setLogoutDialogOpen(true);
    } catch (e) {
      console.error('登出失敗', e);
    }
  };

  const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
      top: -12px;
      right: -6px;
    }
  `;

  // 尚未確認狀態前，避免按鈕閃爍
  if (!authChecked) {
    return null;
  }

  return (
    <AppBar position='sticky' color='secondary' elevation={0}>
      <Container maxWidth='lg'>
        <Toolbar>
          <Typography
            variant='h6'
            component={RouterLink}
            to='/'
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 'bold',
            }}
          >
            Viberent
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={RouterLink}
              to='/search'
              startIcon={<SearchIcon />}
              color='primary'
            >
              搜尋
            </Button>

            <IconButton>
              <ShoppingCartIcon fontSize='small' />
              <CartBadge badgeContent={10} color='primary' overlap='circular' />
            </IconButton>

            <IconButton>
              <FavoriteBorderIcon fontSize='small' />
              <CartBadge badgeContent={10} color='primary' overlap='circular' />
            </IconButton>

            <Button
              component={RouterLink}
              to='/favorites'
              startIcon={<FavoriteBorderIcon />}
              color='primary'
            >
              收藏
            </Button>

            <Button
              component={RouterLink}
              to='/profile'
              startIcon={<PersonOutlineIcon />}
              color='primary'
            >
              會員資料
            </Button>

            {isLoggedIn ? (
              <Button
                startIcon={<LogoutIcon />}
                color='primary'
                onClick={handleLogout}
              >
                登出
              </Button>
            ) : (
              <Button
                startIcon={<LoginIcon />}
                color='primary'
                onClick={() => (window.location.href = GOOGLE_LOGIN_URL)}
              >
                登入
              </Button>
            )}

            <LogoutSuccessDialog
              open={logoutDialogOpen}
              onClose={() => {
                setLogoutDialogOpen(false);
                // 回首頁或刷新，二選一
                window.location.href = import.meta.env.BASE_URL;
                // 或者：window.location.reload();
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;