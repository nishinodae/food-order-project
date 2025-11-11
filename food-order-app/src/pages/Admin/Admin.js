import { Badge, Button, Grid, IconButton, Stack, Tooltip } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useCallback, useState } from 'react';
import { useFoodContext } from '../../context/FoodMngrContext';
import { useOrderContext } from '../../context/OrderContext';
import FoodCard from '../../components/FoodCard';
import MenuAppBar from '../../components/MenuAppBar';
import Headline from '../../components/Headline';
import FormFoodDialog from './components/FormFoodDialog';
import DeleteDialog from './components/DeleteDialog';
import AdminOrder from './components/AdminOrder';

const Admin = () => {
    const [showFormFood, setShowFormFood] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const { food, setCurrentImage } = useFoodContext();
    const { showOrder, setShowOrder, newOrderLength } = useOrderContext();

    const handleEdit = useCallback((item) => {
        setEditingItem(item);
        setCurrentImage(item.imgURL);
    }, []);

    const handleDelete = useCallback((item) => {
        setDeletingItem(item);
    }, []);

    const renderFoodList = food.map((item) =>
    (<FoodCard key={item.id} foodItem={item}>
        <Button onClick={() => { handleEdit(item); }}>EDIT</Button>
        <Button onClick={() => { handleDelete(item); }}>DELETE</Button>
    </FoodCard>));

    return (
        <>
            {showOrder && <AdminOrder onClose={() => setShowOrder(false)} />}
            {showFormFood && <FormFoodDialog onClose={() => { setShowFormFood(false); }} />}
            {editingItem && <FormFoodDialog onClose={() => { setEditingItem(null); }} foodItem={editingItem} />}
            {deletingItem && <DeleteDialog onClose={() => { setDeletingItem(null); }} foodItem={deletingItem} />}
            <MenuAppBar>
                <Button color='inherit' onClick={() => setShowFormFood(true)}>Add Food</Button>
                <Tooltip title='Orders'>
                    <IconButton color='inherit' onClick={() => setShowOrder(true)}>
                        <Badge sx={{
                            '& .MuiBadge-badge': {
                                bgcolor: 'secondary.main', color: 'primary.main'
                            }
                        }}
                            badgeContent={newOrderLength}>
                            <AssignmentIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>
            </MenuAppBar>
            <Stack>
                <Headline firstLine='Welcome back, Admin!' secondLine="Let's update the menu and check new orders" />
                <Grid container spacing={3} sx={{ p: '20px' }}>
                    {food.length === 0 ? 'No food available' : renderFoodList}
                </Grid>
            </Stack>
        </>

    );

};

export default Admin;
