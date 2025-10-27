import { useFoodContext } from "../../context/FoodMngrContext";
import { Badge, Grid, Stack, Tooltip, IconButton, Typography } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Headline from "../../components/Headline";
import MenuAppBar from "../../components/MenuAppBar";
import CustomerFoodCard from "./CustomerFoodCard";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext";

const Customer = () => {
    // const [count, setCount] = useState(1);
    const { food } = useFoodContext();
    const { cart, cartLength, totalPrice } = useCartContext();
    const renderFoodList = food.map((item) => {
        let currentCount=0;
        for(const cartItem of cart){
            if(cartItem.id === item.id){
                currentCount=cartItem.qty
                break;
            }
        }
        return <CustomerFoodCard key={item.id} item={item} currentCount={currentCount}/>
    });
    return (
        <><MenuAppBar>
            <Tooltip title='My Orders'>
                <IconButton color='inherit'>
                    <ReceiptLongIcon />
                </IconButton>
            </Tooltip>
            <Typography>Total fees: RM{totalPrice}</Typography>

            <Tooltip title='My Cart'>
                <IconButton color='inherit'>
                    <Badge sx={{
                        "& .MuiBadge-badge": {
                            bgcolor: 'secondary.main', color: "primary.main"
                        }
                    }}
                        badgeContent={cartLength}>
                        <ShoppingCartOutlinedIcon />
                    </Badge>
                </IconButton>
            </Tooltip></MenuAppBar>
            <Stack>
                <Headline firstLine='Save 25% on your first order' secondLine='Hurry! Limited time offer ⌛🍱🍛🍕🍜' />
                <Grid container spacing={3} sx={{ p: '10px 20px' }}>
                    {food.length === 0 ? 'No food available' : renderFoodList}
                </Grid>
            </Stack>
        </>
    );
}

export default Customer;