import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFoodContext } from '../../../context/FoodMngrContext';
import { useCartContext } from '../../../context/CartContext';
import { useOrderContext } from '../../../context/OrderContext';
import { useAuthContext } from '../../../context/AuthContext';
import CartItem from './CartItem';

const CartUI = ({ onClose }) => {
    const { cart, cartLength, totalPrice, clearCart } = useCartContext();
    const { food } = useFoodContext();
    const { createOrder, setShowOrder } = useOrderContext();
    const { customerID } = useAuthContext();

    const handleCheckout = () => {
        if (cartLength > 0) {
            let foodinCart = [];
            cart.forEach(cartItem => {
                for (const foodItem of food) {
                    if (foodItem.id === cartItem.id) {
                        foodinCart.push({
                            name: foodItem.name,
                            price: foodItem.price,
                            qty: cartItem.qty,
                        });
                        break;
                    }
                }
            });
            if (foodinCart.length > 0) {
                let order = {
                    userid: customerID,
                    food: foodinCart,
                    totalPrice,
                };
                if (createOrder(order)) {
                    clearCart();
                    onClose();
                    setShowOrder(true);
                }
            }
        }
    };

    const renderFoodList = cart.map((cartItem, index) => {
        let currentCount = 0;
        let info;
        for (const foodItem of food) {
            if (cartItem.id === foodItem.id) {
                currentCount = cartItem.qty;
                info = foodItem;
                break;
            }
        }
        return currentCount > 0 &&
            <CartItem key={index} item={info} currentCount={currentCount} />;
    });

    return (
        <Dialog open fullScreen>
            <Box className='custom-box' m='10px 30px 20px 38px'>
                <DialogTitle sx={{ p: 0 }}>Cart</DialogTitle>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent sx={{ p: '0 40px' }}>
                {cartLength === 0 ? 'Your cart is empty' : renderFoodList}
            </DialogContent>
            <Stack m='10px 40px'>
                <Box className='custom-box'><Typography>Subtotal ({cartLength} items)</Typography><Typography>RM{totalPrice.toFixed(2)}</Typography></Box>
                <Box className='custom-box'><Typography>Delivery</Typography><Typography color='success' fontWeight='bold'>FREE</Typography></Box>
                <Box className='custom-box'><Typography fontWeight='bold'>Total</Typography><Typography fontWeight='bold'>RM{totalPrice.toFixed(2)}</Typography></Box>
            </Stack>
            <DialogActions sx={{ mr: '24px' }}><Button onClick={handleCheckout} disabled={cartLength===0}>Checkout</Button></DialogActions>
        </Dialog>
    );
};

export default CartUI;