import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import imgplaceholder from '../../../assets/placeholder-image.png';
import { useFoodContext } from "../../../context/FoodMngrContext";
import { useCartContext } from "../../../context/CartContext";

const CartUI = ({ onClose }) => {
    const { cart, cartLength, totalPrice } = useCartContext();
    const { food } = useFoodContext();
    const renderFoodList = cart.map((cartItem, index) => {
        let currentCount = 0;
        let info;
        for (const foodItem of food) {
            if (cartItem.id === foodItem.id) {
                currentCount = cartItem.qty
                info = foodItem
                break;
            }
        }
        return currentCount > 0 &&
            <CartItem key={index} item={info} currentCount={currentCount} />
    });
    return (
        <Dialog open onClose={onClose} fullScreen>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <DialogTitle>Cart</DialogTitle>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent>
                {cartLength === 0 ? 'Your cart is empty' : renderFoodList}
            </DialogContent>
            <Stack m='10px 40px'>
                <Box mt='10px' display='flex' alignItems='center' justifyContent='space-between'><Typography>Subtotal</Typography><Typography>RM{totalPrice.toFixed(2)}</Typography></Box>
                <Box mt='10px' display='flex' alignItems='center' justifyContent='space-between'><Typography>Delivery</Typography><Typography color="success" fontWeight='bold'>FREE</Typography></Box>
                <Box mt='10px' display='flex' alignItems='center' justifyContent='space-between'><Typography fontWeight='bold'>Total</Typography><Typography fontWeight='bold'>RM{totalPrice.toFixed(2)}</Typography></Box>
            </Stack>
            <DialogActions sx={{ mr: '24px' }}><Button>Checkout</Button></DialogActions>
        </Dialog>
    );
}

export default CartUI;

const CartItem = ({ item, currentCount }) => {
    const { removeFoodFromCart, addFoodToCart } = useCartContext();
    // const [count, setCount] = useState(currentCount);
    console.log(item.name, ' :', currentCount)

    return (<Box display='flex' alignItems='center' mb='10px'>
        <img src={item.img || imgplaceholder} alt="" width='100px' height='100px' />
        <Stack flex='1' m='0 10px'>
            <Typography variant="body1">{item.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.desc}</Typography>
            <Box display='flex'>
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        borderRadius: '50px', alignItems: 'center',
                        border: 1,
                        color: "primary.main"
                    }}>
                    <IconButton
                        color='primary'
                        onClick={() => {
                            // setCount(Math.max(count - 1, 0));
                            removeFoodFromCart(item.id)
                        }}
                    >
                        <RemoveIcon sx={{ fontSize: '12px' }} />
                    </IconButton>
                    <Typography p='0 5px'>{currentCount}</Typography>
                    <IconButton
                        color='primary'
                        onClick={() => {
                            // setCount(count + 1);
                            addFoodToCart(item.id)
                        }}
                    >
                        <AddIcon sx={{ fontSize: '12px' }} />
                    </IconButton></Paper>
            </Box>
        </Stack>
        <Typography>RM{(item.price * currentCount).toFixed(2)}</Typography>
    </Box>);
}