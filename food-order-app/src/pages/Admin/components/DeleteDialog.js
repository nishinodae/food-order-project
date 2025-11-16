import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useFoodActions } from '../../../context/FoodMngrContext';

const DeleteDialog = ({ foodItem, onClose }) => {
    const { deleteFoodHandler } = useFoodActions();
    return (
        <Dialog open onClose={onClose}>
            <DialogTitle variant='body1' sx={{ pl: '16px' }}>Delete {foodItem.name}?</DialogTitle>
            <DialogActions>
                <Button onClick={() => {
                    deleteFoodHandler(foodItem.id);
                    onClose();
                }}>delete</Button>
                <Button onClick={onClose}>cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;