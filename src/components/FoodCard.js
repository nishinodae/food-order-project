import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import pizza from '../assets/pizza.jpg';
import { Box, Button, Grid, IconButton, Paper } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const FoodCard = () => {
    const [count, setCount] = useState(1);

    return (
        <Grid size={{ sm: 6, md: 3 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="194"
                    image={pizza}
                    alt="pizza"
                />
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography fontSize='20px'>
                            Pizza
                        </Typography>
                        <Typography fontWeight='bold' variant='h6'>
                            RM14
                        </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ color: 'text.secondary', flex: '1 0 auto' }}>
                        This pizza is a perfect party dish.ghyjvtkutvutkubukiutbutuytuybtv
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button>DELETE</Button>
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
                            }}
                        >
                            <RemoveIcon sx={{ fontSize: '12px' }} />
                        </IconButton>
                        <Typography p='0 5px'>{count}</Typography>
                        <IconButton
                        color='primary'
                            onClick={() => {
                                setCount(count + 1);
                            }}
                        >
                            <AddIcon sx={{ fontSize: '12px' }} />
                        </IconButton></Paper>

                </CardActions>
            </Card>
        </Grid>

    );
}

export default FoodCard;
