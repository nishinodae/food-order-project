import imgplaceholder from '../assets/placeholder-image.png';
import { Box, Card, CardMedia, CardContent, CardActions, Grid, Typography } from '@mui/material';

const FoodCard = ({ foodItem, children }) => {
    return (
        <Grid size={{ sm: 6, md: 3 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="210"
                    loading='lazy'
                    src={!foodItem.img ? imgplaceholder : foodItem.img}
                    // src={foodItem.img || imgplaceholder}
                    alt={foodItem.img.split('/').pop() || 'not available'}
                    // onError={(e) => {
                    //     e.target.onerror = null;
                    //     e.target.src = imgplaceholder;
                    // }}
                    sx={{ objectFit: "contain", backgroundColor: "#ffff" }}
                />
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography fontSize='20px'>
                            {foodItem.name}
                        </Typography>
                        <Typography fontWeight='bold' variant='h6'>
                            RM{foodItem.price.toFixed(2)}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', flex: '1 0 auto' }}>
                        {foodItem.desc}
                    </Typography>
                </CardContent>
                <CardActions>
                    {children}
                </CardActions>
            </Card>
        </Grid>

    );
}

export default FoodCard;
