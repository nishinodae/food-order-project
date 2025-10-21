import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useState } from 'react';
import { Badge, Button, ButtonGroup } from '@mui/material';
import AddFoodDialog from '../pages/Admin/AddFoodDialog';

const MenuAppBar = () => {

  const [count, setCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0}>
        <Toolbar>
          <Typography fontFamily='Paytone One' variant="h6" component='div' sx={{flexGrow: 1 }}>
            cuisinemalaise
          </Typography>
          
          <div>
            <Button color='inherit' onClick={() => setIsOpen(true)}>Add Food</Button>
            <AddFoodDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>

          <IconButton color='inherit'>
            <Badge sx={{
              "& .MuiBadge-badge": {
                bgcolor: 'secondary.main', color: "primary.main"
              }
            }}
              badgeContent={count}>
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>

          <Button color='inherit'>
            User
          </Button>

          <div>

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
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuAppBar;