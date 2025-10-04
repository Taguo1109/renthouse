import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

const LogoutSuccessDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: '500px',
            maxWidth: '90vw',
            borderRadius: 3,
            p: 2,
          },
        },
      }}
    >
      <DialogTitle>成功登出</DialogTitle>
      <DialogContent>
        <Typography>歡迎再次回來！</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus variant='contained'>
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutSuccessDialog;
