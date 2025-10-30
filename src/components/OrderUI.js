import { Box, Dialog, DialogContent, DialogTitle, IconButton, Paper, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const OrderUI = ({ onClose, children }) => {

    return (
        <Dialog open onClose={onClose} fullWidth>
            <Box className='custom-box' m='10px 12px 0 20px'>
                <DialogTitle sx={{ p: 0 }}>Orders</DialogTitle>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent sx={{ pt: '0' }}>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default OrderUI;