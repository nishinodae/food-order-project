import { Dialog, DialogTitle, Grid } from '@mui/material';
import { useFoodContext } from '../../../context/FoodMngrContext';
import { useCallback } from 'react';

const FilePicker = ({ onClose }) => {
    const { setCurrentImage, foodImages } = useFoodContext();

    const handleChoose = useCallback((url) => {
        onClose();
        setCurrentImage(url);
    }, []);

    const renderImageList = foodImages.map((item, index) =>
        <img key={index}
            loading='lazy'
            src={item.imgURL}
            alt={item.imgURL?.split('/').pop() || 'not available'}
            width='100px' height='100px'
            onClick={() => { handleChoose(item.imgURL); }}
        />
    );

    return (<Dialog open onClose={onClose}>
        <DialogTitle variant='body1' sx={{ pl: '16px' }}>Choose image:</DialogTitle>
        <Grid container spacing={3} sx={{ p: '10px 20px' }}>
            {foodImages.length === 0 ? 'No image available' : renderImageList}
        </Grid>
    </Dialog>);
};

export default FilePicker;