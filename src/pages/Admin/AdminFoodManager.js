import { Box, Grid, Stack, Typography } from "@mui/material";
import FoodCard from "../../components/FoodCard";

const foods = ['Pizza', 'Nasi lemak', 'Nasi goreng'];

const Admin = () => {
    return (
        <Stack sx={{}}>
            <Box sx={{ bgcolor: 'primary.main', p: '80px 20px 20px 20px', }}>
                <Typography sx={{ color: 'secondary.main' }} fontSize='20px'>Save 25% on your first order </Typography>
                <Typography sx={{ color: 'secondary.main' }} fontSize='12px'>Hurry! Limited time offer ⌛🍱🍛🍕🍜</Typography>
            </Box>

            <Grid container spacing={3} sx={{ p: '10PX 20px' }}>
                {foods.map((foodsItem, index) => <FoodCard key={index}></FoodCard>)}
            </Grid>
        </Stack>
    )

}

export default Admin;