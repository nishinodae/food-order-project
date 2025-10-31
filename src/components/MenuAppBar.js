import { AppBar, Typography, Toolbar, Box, Button, LinearProgress, Stack } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useAuthContext } from '../context/AuthContext';

const MenuAppBar = ({ children }) => {
  const { user, toggleUser, loading } = useAuthContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0}>
        <Stack>
          {loading && <LinearProgress />}
          <Toolbar>
            <Typography fontFamily='Paytone One' variant='h6' component='div' sx={{ flexGrow: 1 }}>
              cuisinemalaise
            </Typography>
            <Button color='inherit' onClick={toggleUser}>
              <ChangeCircleIcon sx={{ mb: '1px', mr: '2px' }} />
              {user === 'customer' ? 'admin' : 'customer'}
            </Button>
            {children}
          </Toolbar>
        </Stack>

      </AppBar>
    </Box>
  );
};

export default MenuAppBar;