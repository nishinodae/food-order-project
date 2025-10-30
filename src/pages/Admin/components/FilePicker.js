import { Dialog, DialogTitle, Grid } from "@mui/material";
import { useFoodContext } from "../../../context/FoodMngrContext";

const FilePicker = ({ onClose }) => {
    const { setCurrentImage, foodImages } = useFoodContext();

    const renderImageList = foodImages.map((item, index) =>
    (<img key={index} loading='lazy' src={item.img} alt="" width='100px' height='100px'
        onClick={() => {
            onClose();
            setCurrentImage(item.img)
        }}
    />
    ));

    return (<Dialog open onClose={onClose}>
        <DialogTitle variant="body1" sx={{ pl: '16px' }}>Choose image:</DialogTitle>
        <Grid container spacing={3} sx={{ p: '10px 20px' }}>
            {foodImages.length === 0 ? 'No image available' : renderImageList}
        </Grid>
    </Dialog>)
}

export default FilePicker;