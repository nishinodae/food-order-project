import { Badge, Button, Grid, IconButton, Stack, Tooltip } from "@mui/material";
import { useFoodContext } from "../../context/FoodMngrContext";
import { useState } from "react";
import AssignmentIcon from '@mui/icons-material/Assignment';
import FoodCard from "../../components/FoodCard";
import MenuAppBar from "../../components/MenuAppBar";
import FormFoodDialog from '../../components/FormFoodDialog';
import Headline from "../../components/Headline";
import DeleteDialog from "../../components/DeleteDialog";

const Admin = () => {
    const [showFormFood, setShowFormFood] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [count, setCount] = useState(1);
    const { food, setCurrentImage } = useFoodContext();

    const renderFoodList = food.map((item) =>
    (<FoodCard key={item.id} foodItem={item}>
        <Button onClick={() => {
            setEditingItem(item);
            setCurrentImage(item.img);
        }}>EDIT</Button>
        {/* <Button onClick={() => deleteFoodHandler(item.id)}>DELETE</Button> */}
        <Button onClick={() => setDeletingItem(item)}>DELETE</Button>
    </FoodCard>));

    return (
        <>
            {showFormFood && <FormFoodDialog onClose={() => { setShowFormFood(false); }} />}
            {editingItem && <FormFoodDialog onClose={() => { setEditingItem(null); }} foodItem={editingItem} />}
            {deletingItem && <DeleteDialog onClose={() => { setDeletingItem(null); }} foodItem={deletingItem} />}
            <MenuAppBar>
                <Button color='inherit' onClick={() => setShowFormFood(true)}>Add Food</Button>
                <Tooltip title='Orders'>
                    <IconButton color='inherit'>
                        <Badge sx={{
                            "& .MuiBadge-badge": {
                                bgcolor: 'secondary.main', color: "primary.main"
                            }
                        }}
                            badgeContent={count}>
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

    )

}

export default Admin;