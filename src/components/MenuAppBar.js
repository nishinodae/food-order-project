import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, LinearProgress, Stack } from '@mui/material';
import { useAuthContext } from '../context/AuthContext';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const MenuAppBar = ({ children }) => {
  const { user, toggleUser, loading } = useAuthContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0}>
        <Stack>
          {loading && <LinearProgress />}
          <Toolbar>
            <Typography fontFamily='Paytone One' variant="h6" component='div' sx={{ flexGrow: 1 }}>
              cuisinemalaise
            </Typography>
            <Button color='inherit' onClick={toggleUser}>
              <ChangeCircleIcon sx={{ mb: '1px', mr: '2px' }} /> {user === 'customer' ? 'admin' : 'customer'}
            </Button>
            {children}

            {/* <div>
            <ButtonGroup color='secondary'>
              <Button
                aria-label="reduce"
                onClick={() => {
                  setCount(Math.max(count - 1, 0));
                }}
              >
                -
              </Button>
              <Button
                aria-label="increase"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </div> */}
          </Toolbar>
        </Stack>

      </AppBar>
    </Box>
  );
}

export default MenuAppBar;