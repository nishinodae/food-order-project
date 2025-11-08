import { Box, Button, Paper, Typography } from '@mui/material';
import { useOrderContext } from '../../../context/OrderContext';
import OrderUI from '../../../components/OrderUI';
import formatDateTime from '../../../utils/formatDateTime';

const AdminOrder = ({ onClose }) => {
    const { orders, updateOrder } = useOrderContext();

    const handlePrepare = (currentOrder) => {
        updateOrder({
            ...currentOrder,
            status: 'Preparing'
        });
    };

    const handleReject = (currentOrder) => {
        updateOrder({
            ...currentOrder,
            status: 'Cancelled'
        });
    };

    const handleComplete = (currentOrder) => {
        updateOrder({
            ...currentOrder,
            status: 'Completed'
        });
    };

    const renderOrderList = orders.map((item, index) => {
        return <Paper
            key={index}
            sx={{
                mt: '20px',
                p: '10px 20px',
                bgcolor: 'primary.light'
            }}>

            <Box className='custom-box' color='text.secondary'>
                <Typography>{formatDateTime(item.timestamp)}</Typography>
                <Typography>Customer paid RM{item.totalPrice.toFixed(2)}</Typography>
            </Box>
            {item.food.map((foodItem, index) => {
                return (
                    <Box key={index} className='custom-box'>
                        <Typography>{foodItem.qty} x {foodItem.name}</Typography>
                        <Typography>RM{(foodItem.qty * foodItem.price).toFixed(2)}</Typography>
                    </Box>
                );
            })}
            {
                item.status === 'Ordered' ?
                    <Box display='flex' mt='10px'>
                        <Button onClick={() => handlePrepare(item)}
                            variant='contained' sx={{
                                flex: 1, mr: '8px'
                            }}>prepare</Button>
                        <Button onClick={() => handleReject(item)}
                            variant='outlined' sx={{
                                '&:hover': { bgcolor: 'primary.light' },
                                flex: 1,
                                borderColor: 'primary', color: 'custom'
                            }}>reject</Button>
                    </Box>
                    : item.status === 'Preparing' ?
                        <Box className='custom-box' justifyContent='flex-end'>
                            <Button onClick={() => handleComplete(item)} variant='contained'>completed</Button>
                        </Box>
                        : <Typography mt='10px' fontWeight='bold' color={item.status === 'Cancelled' ? 'error' : 'success'}>{item.status}</Typography>
            }
        </Paper>;
    });

    return <OrderUI onClose={onClose}>
        {orders.length === 0 ? 'No orders to manage' : renderOrderList}
    </OrderUI>;
};

export default AdminOrder;