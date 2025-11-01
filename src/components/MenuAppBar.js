import { AppBar, Typography, Toolbar, Button, LinearProgress, Stack } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useAuthContext } from '../context/AuthContext';

const MenuAppBar = ({ children }) => {
  const { user, toggleUser, loading } = useAuthContext();

  return (
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
  );
};

export default MenuAppBar;