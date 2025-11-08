import { Badge, Grid, Stack, Tooltip, IconButton } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useState } from 'react';
import { useFoodContext } from '../../context/FoodMngrContext';
import { useCartContext } from '../../context/CartContext';
import { useOrderContext } from '../../context/OrderContext';
import Headline from '../../components/Headline';
import MenuAppBar from '../../components/MenuAppBar';
import CustomerFoodCard from './components/CustomerFoodCard';
import CartUI from './components/CartUI';
import CustomerOrder from './components/CustomerOrder';

const Customer = () => {
    const [showCart, setShowCart] = useState(false);
    const { food } = useFoodContext();
    const { cart, cartLength } = useCartContext();
    const { showOrder, setShowOrder } = useOrderContext();
    const renderFoodList = food.map((item) => {
        let currentCount = 0;
        for (const cartItem of cart) {
            if (cartItem.id === item.id) {
                currentCount = cartItem.qty;
                break;
            }
        }
        return <CustomerFoodCard key={item.id} item={item} currentCount={currentCount} />;
    });
    return (
        <>
            {showCart && <CartUI onClose={() => setShowCart(false)}/>}
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
                </Tooltip></MenuAppBar>
            {/* {showCart ? <CartUI onClose={() => setShowCart(false)} />
                :  */}
            <Stack>
                <Headline firstLine='Save 25% on your first order' secondLine='Hurry! Limited time offer ⌛🍱🍛🍕🍜' />
                <Grid container spacing={3} sx={{ p: '20px' }}>
                    {food.length === 0 ? 'No food available' : renderFoodList}
                </Grid>
            </Stack>
            {/* } */}

        </>
    );
};

export default Customer;