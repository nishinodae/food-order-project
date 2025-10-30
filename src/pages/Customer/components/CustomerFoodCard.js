import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Paper, Typography } from '@mui/material';
import { useCartContext } from '../../../context/CartContext';
import FoodCard from '../../../components/FoodCard';

const CustomerFoodCard = ({ item, currentCount }) => {
    const { addFoodToCart, removeFoodFromCart, } = useCartContext();

    return <FoodCard foodItem={item}>
        <Paper
            elevation={0}
            sx={{
                display: 'flex', borderRadius: '50px', alignItems: 'center',
                border: 1,
                color: "primary.main"
            }}>
            <IconButton
                color='primary'
                onClick={() => {
                    removeFoodFromCart(item.id)
                }}
            >
                <RemoveIcon sx={{ fontSize: '12px' }} />
            </IconButton>
            <Typography p='0 5px'>{currentCount}</Typography>
            <IconButton
                color='primary'
                onClick={() => {
                    addFoodToCart(item.id)
                }}
            >
                <AddIcon sx={{ fontSize: '12px' }} />
            </IconButton></Paper>
    </FoodCard>
}

export default CustomerFoodCard;