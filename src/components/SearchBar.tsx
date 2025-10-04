import { Box, TextField, Button, Stack, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const SearchBar = () => {
  return (
    <Container maxWidth='lg'>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems='center'
          sx={{ maxWidth: '800px', width: '100%' }}
        >
          <TextField
            fullWidth
            placeholder='搜尋地區、捷運站...'
            slotProps={{
              input: {
                startAdornment: (
                  <LocationOnIcon sx={{ color: 'primary.main', mr: 1 }} />
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.dark',
                },
              },
            }}
          />
          <TextField
            fullWidth
            placeholder='租金範圍'
            slotProps={{
              input: {
                startAdornment: (
                  <AttachMoneyIcon sx={{ color: 'primary.main', mr: 1 }} />
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.dark',
                },
              },
            }}
          />
          <Button
            fullWidth
            variant='contained'
            color='primary'
            size='large'
            startIcon={<SearchIcon />}
            sx={{
              height: '56px',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            搜尋
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default SearchBar;
