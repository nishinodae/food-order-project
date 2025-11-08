import { Box, Button, IconButton, Paper, Stack, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import imgplaceholder from '../../../assets/placeholder-image.png';
import { useCartContext } from '../../../context/CartContext';

const CartItem = ({ item, currentCount }) => {
    const { removeFoodFromCart, addFoodToCart } = useCartContext();

    return (<Box display='flex' alignItems='center' mb='10px'>
        <img loading='lazy' src={item.img || imgplaceholder} alt='' width='100px' height='100px' />
        <Stack flex='1' m='0 10px'>
            <Typography variant='body1'>{item.name}</Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>{item.desc}</Typography>
            <Box display='flex' mt='5px'>
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        borderRadius: '50px', alignItems: 'center',
                        border: 1,
                        color: 'primary.main'
                    }}>
                    <IconButton
                        color='primary'
                        onClick={() => {
                            removeFoodFromCart(item.id, false);
                        }}
                    >
                        <RemoveIcon sx={{ fontSize: '12px' }} />
                    </IconButton>
                    <Typography p='0 5px'>{currentCount}</Typography>
                    <IconButton
                        color='primary'
                        onClick={() => {
                            addFoodToCart(item.id);
                        }}
                    >
                        <AddIcon sx={{ fontSize: '12px' }} />
                    </IconButton>
                </Paper>
                <Button sx={{p:0}} onClick={() => { removeFoodFromCart(item.id, true);}}>
                {/* <DeleteIcon /> */}
                delete
            </Button>
            </Box>
        </Stack>
        <Typography>RM{(item.price * currentCount).toFixed(2)}</Typography>
    </Box>);
};

export default CartItem;