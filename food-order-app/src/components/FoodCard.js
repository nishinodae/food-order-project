import { memo, useState } from 'react';
import imgplaceholder from '../assets/placeholder-image.png';
import { Box, Card, CardMedia, CardContent, CardActions, Grid, Typography, CardActionArea, Dialog } from '@mui/material';

const FoodCard = ({ foodItem, children }) => {
    const [showFoodFull, setshowFoodFull] = useState(false);

    const card = <Card>
        <CardActionArea onClick={() => setshowFoodFull(true)}>
            <CardMedia
                component='img'
                // loading='lazy'
                height='210'
                sx={{ objectFit: 'contain' }}
                src={foodItem.imgURL || imgplaceholder}
                alt={foodItem.imgURL?.split('/').pop() || 'not available'}
            />
            <CardContent sx={{ p: '10px 16px 0px 16px' }}>
                <Box className='custom-box' p={0}>
                    <Typography fontSize='20px' pr='8px' className={showFoodFull ? '' : 'hide-overflow'}>
                        {foodItem.name}
                    </Typography>
                    <Typography fontWeight='bold' variant='h6'>
                        RM{foodItem.price.toFixed(2)}
                    </Typography>
                </Box>
                <Typography variant='body2' sx={{ color: 'text.secondary' }} className={showFoodFull ? '' : 'hide-overflow'}>
                    {foodItem.desc}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            {children}
        </CardActions>
    </Card>;

    return (
        <Grid size={{ sm: 6, md: 3 }}>
            {showFoodFull && <Dialog open onClose={() => setshowFoodFull(false)} fullWidth>
                {card}
            </Dialog>}
            {card}
        </Grid>

    );
};

export default memo(FoodCard);
