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
import { useState } from 'react';
import LoginDialog from './dialog/LoginDialog';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import LogoutSuccessDialog from './dialog/LogoutSuccessDialog';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { styled } from '@mui/material/styles';

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    try {
      await axios.post('https://go-auth-system.zeabur.app/logout', {
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setLogoutDialogOpen(true);
    } catch (error) {
      console.error('登出失敗', error);
    }
  };

  const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
      top: -12px;
      right: -6px;
    }
  `;

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
                onClick={() => setLoginOpen(true)}
              >
                登入
              </Button>
            )}
            {/* 登入 Dialog */}
            <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
            <LogoutSuccessDialog
              open={logoutDialogOpen}
              onClose={() => {
                setLogoutDialogOpen(false);
                window.location.href = import.meta.env.BASE_URL;
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
