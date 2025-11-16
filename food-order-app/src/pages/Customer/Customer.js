import { Badge, Grid, Stack, Tooltip, IconButton, Paper, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useState } from 'react';
import { useFoodState } from '../../context/FoodMngrContext';
import { useCartContext } from '../../context/CartContext';
import { useOrderContext } from '../../context/OrderContext';
import Headline from '../../components/Headline';
import MenuAppBar from '../../components/MenuAppBar';
import CartUI from './components/CartUI';
import CustomerOrder from './components/CustomerOrder';
import FoodCard from '../../components/FoodCard';

const Customer = () => {
    const [showCart, setShowCart] = useState(false);
    const { food } = useFoodState();
    const { cart, cartLength, addFoodToCart, removeFoodFromCart } = useCartContext();
    const { showOrder, setShowOrder } = useOrderContext();

    const renderFoodList = food.map((item) => {
        let currentCount = 0;
        for (const cartItem of cart) {
            if (cartItem.id === item.id) {
                currentCount = cartItem.qty;
                break;
            }
        }
        return <FoodCard foodItem={item} key={item.id}>
            <Paper
                elevation={0}
                sx={{
                    display: 'flex', borderRadius: '50px', alignItems: 'center',
                    border: 1,
                    color: 'primary.main'
                }}>
                <IconButton
                    aria-label='removefoodfromcart'
                    color='primary'
                    onClick={() => {
                        removeFoodFromCart(item.id);
                    }}
                >
                    <RemoveIcon sx={{ fontSize: '14px' }} />
                </IconButton>
                <Typography p='0 5px'>{currentCount}</Typography>
                <IconButton
                    aria-label='addfoodtocart'
                    color='primary'
                    onClick={() => {
                        addFoodToCart(item.id);
                    }}
                >
                    <AddIcon sx={{ fontSize: '14px' }} />
                </IconButton>
            </Paper>
        </FoodCard>;
    });

    return (
        <>
            {showCart && <CartUI onClose={() => setShowCart(false)} />}
            {showOrder && <CustomerOrder onClose={() => setShowOrder(false)} />}
            <MenuAppBar>
                <Tooltip title='My Orders'>
                    <IconButton color='inherit' onClick={() => setShowOrder(true)}>
                        <ReceiptLongIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='My Cart'>
                    <IconButton color='inherit' onClick={() => setShowCart(true)}>
                        <Badge sx={{
                            '& .MuiBadge-badge': {
                                bgcolor: 'secondary.main', color: 'primary.main'
                            }
                        }}
                            badgeContent={cartLength}>
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </IconButton>
                </Tooltip></MenuAppBar><Stack>
                <Headline firstLine='Save 25% on your first order' secondLine='Hurry! Limited time offer ⌛🍱🍛🍕🍜🍝' />
                <Grid container spacing={3} sx={{ p: '20px' }}>
                    {food.length === 0 ? 'No food available' : renderFoodList}
                </Grid>
            </Stack>
        </>
    );
};

export default Customer;