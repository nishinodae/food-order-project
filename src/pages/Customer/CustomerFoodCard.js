import FoodCard from "../../components/FoodCard";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useCartContext } from "../../context/CartContext";

const CustomerFoodCard = ({ item, currentCount }) => {
    const { addFoodToCart, removeFoodFromCart, } = useCartContext();
    const [count, setCount] = useState(currentCount);
    // let food = {
    //     id: item.id,
    //     price: item.price,
    //     qty: count
    // };

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
                    setCount(Math.max(count - 1, 0));
                    removeFoodFromCart(item.id)
                }}
            >
                <RemoveIcon sx={{ fontSize: '12px' }} />
            </IconButton>
            <Typography p='0 5px'>{count}</Typography>
            <IconButton
                color='primary'
                onClick={() => {
                    setCount(count + 1);
                    addFoodToCart(item.id)
                }}
            >
                <AddIcon sx={{ fontSize: '12px' }} />
            </IconButton></Paper>
    </FoodCard>
}

export default CustomerFoodCard;