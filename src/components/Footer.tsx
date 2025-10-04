import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: 'secondary.main',
      }}
    >
      <Container maxWidth='lg'>
        <Grid container spacing={4} justifyContent='center'>
          <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: 'center' }}>
            <Typography variant='h6' color='primary' gutterBottom>
              Viberent
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              提供最優質的租屋體驗
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: 'center' }}>
            <Typography variant='h6' color='primary' gutterBottom>
              快速連結
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Link
                component={RouterLink}
                to='/'
                color='inherit'
                sx={{ mb: 1 }}
              >
                首頁
              </Link>
              <Link
                component={RouterLink}
                to='/search'
                color='inherit'
                sx={{ mb: 1 }}
              >
                搜尋
              </Link>
              <Link component={RouterLink} to='/about' color='inherit'>
                關於我們
              </Link>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: 'center' }}>
            <Typography variant='h6' color='primary' gutterBottom>
              聯絡我們
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                Email: contact@viberent.com
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Phone: (02) 1234-5678
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant='body2' color='text.secondary'>
            © {new Date().getFullYear()} Viberent. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
