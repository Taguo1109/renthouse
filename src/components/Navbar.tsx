import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import LogoutSuccessDialog from './dialog/LogoutSuccessDialog';
import api from '../utils/axiosInstance';
import LoginDialog from './dialog/LoginDialog';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { OAUTH_BASE } from '../config/auth';

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  // 這邊偵測畫面大小, 限制在md以下(960px)會觸發
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // 開頁用 session 檢查登入狀態
useEffect(() => {
  (async () => {
    try {
      const res = await fetch(`${OAUTH_BASE}/api/user/me`, {
        credentials: 'include',
        redirect: 'manual', // 遇到 302 不跟隨，回傳 type=opaqueredirect
        headers: {
          'Accept': 'application/json',
        },
      });

      // 被導到 OAuth（302）時，fetch 會回傳 opaqueredirect / status 0
      if (res.type === 'opaqueredirect' || res.status === 0) {
        setIsLoggedIn(false);
      } else if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
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

  if (!authChecked) {
    return null;
  }

  // ======= 共用選單按鈕 =======
  const menuItems = [
    { text: '搜尋', icon: <SearchIcon />, link: '/search' },
    { text: '收藏', icon: <FavoriteBorderIcon />, link: '/favorites' },
    { text: '會員資料', icon: <PersonOutlineIcon />, link: '/userInfo' },
    isLoggedIn
      ? { text: '登出', icon: <LogoutIcon />, action: handleLogout }
      : { text: '登入', icon: <LoginIcon />, action: () => setLoginOpen(true) },
  ];

  return (
    <>
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

            {isMobile ? (
              // ======= 手機版：漢堡選單 =======
              <IconButton onClick={() => setMobileOpen(true)} color='primary'>
                <MenuIcon />
              </IconButton>
            ) : (
              // ======= 桌機版：橫向排版 =======
              <Box sx={{ display: 'flex', gap: 2 }}>
                {menuItems.map((item, idx) =>
                  item.link ? (
                    <Button
                      key={idx}
                      component={RouterLink}
                      to={item.link}
                      startIcon={item.icon}
                      color='primary'
                    >
                      {item.text}
                    </Button>
                  ) : (
                    <Button
                      key={idx}
                      startIcon={item.icon}
                      color='primary'
                      onClick={item.action}
                    >
                      {item.text}
                    </Button>
                  )
                )}
                <IconButton>
                  <ShoppingCartIcon fontSize='small' />
                  <CartBadge badgeContent={10} color='primary' overlap='circular' />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* ======= Drawer：手機版直行選單 ======= */}
      <Drawer
        anchor='right'
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map((item, idx) => (
              <ListItem key={idx} disablePadding>
                {item.link ? (
                  <ListItemButton
                    component={RouterLink}
                    to={item.link}
                    onClick={() => setMobileOpen(false)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    onClick={() => {
                      item.action?.();
                      setMobileOpen(false);
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem>
              <IconButton>
                <ShoppingCartIcon fontSize='small' />
                <CartBadge badgeContent={10} color='primary' overlap='circular' />
              </IconButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* 登入 Dialog */}
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
      <LogoutSuccessDialog
        open={logoutDialogOpen}
        onClose={() => {
          setLogoutDialogOpen(false);
          window.location.href = import.meta.env.BASE_URL;
        }}
      />
    </>
  );
};

export default Navbar;