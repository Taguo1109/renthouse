// components/LoginDialog.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { GOOGLE_LOGIN_URL } from '../../config/auth'; // 路徑依你的專案調整
import GoogleIcon from '@mui/icons-material/Google';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        使用 Google 登入
      </DialogTitle>
      <DialogContent>
        <Box mt={1}>
          <Button
            fullWidth
            variant='contained'
            size='large'
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{ py: 1.2 }}
          >
            以 Google 帳號登入
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant='contained'
          sx={{
            backgroundColor: '#E0E0E0',
            color: '#000',
            '&:hover': {
              backgroundColor: '#D6D6D6',
            },
            py: 1.2, // 跟 Google 按鈕一樣高度
          }}
        >
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
