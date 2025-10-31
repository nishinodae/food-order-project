import { Box, Paper, Typography } from '@mui/material';
import { useOrderContext } from '../../../context/OrderContext';
import OrderUI from '../../../components/OrderUI';

const CustomerOrder = ({onClose}) => {
    const { orders } = useOrderContext();

    const renderOrderList = orders.map((item, index) => {
        return <Paper
            key={index}
            sx={{
                mt: '20px',
                p: '10px 20px',
                bgcolor: 'primary.light'
            }}>
            <Box className='custom-box'>
                <Typography fontWeight='bold' color={item.status==='Cancelled'?'error':'success'}>{item.status}</Typography>
                <Typography color='text.secondary'>{item.timestamp}</Typography>
            </Box>
            {item.food.map((foodItem, index) => {
                return (
                    <Box key={index} className='custom-box'>
                        <Typography>{foodItem.qty} x {foodItem.name}</Typography>
                        <Typography>RM{(foodItem.qty * foodItem.price).toFixed(2)}</Typography>
                    </Box>
                );
            })}
            <Box className='custom-box' color='primary.main'>
                <Typography fontWeight='bold'>Total</Typography>
                <Typography fontWeight='bold'>RM{item.totalPrice.toFixed(2)}</Typography>
            </Box>
        </Paper>;
    });

    return <OrderUI onClose={onClose}>
        {orders.length === 0 ? 'You have no orders yet' : renderOrderList}
    </OrderUI>;
};

export default CustomerOrder;