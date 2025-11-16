import { Button, CircularProgress, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HistoryIcon from '@mui/icons-material/History';
import LaptopIcon from '@mui/icons-material/Laptop';
import { useEffect, useRef, useState } from 'react';
import { useFoodActions, useFoodState } from '../../../context/FoodMngrContext';
import FilePicker from './FilePicker';
import compressImage from '../../../utils/compressImage';
import DeleteIcon from '@mui/icons-material/Delete';

const AddImage = () => {
    const { currentImage } = useFoodState();
    const { setCurrentImage } = useFoodActions();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openFilePicker, setOpenFilePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imgDisplay, setImgDisplay] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (currentImage) {
            if (typeof (currentImage) !== 'string') {
                //current image is a File
                setImgDisplay([currentImage.name, URL.createObjectURL(currentImage)]);
            }
            else {
                //current image source is url from cloudinary
                setImgDisplay([currentImage.split('/').pop(), currentImage]);
            }

        }
        setLoading(false);

    }, [currentImage]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => setAnchorEl(null);

    const handleLocalFile = () => {
        handleMenuClose();
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                setLoading(false);
                return;
            } else {
                try {
                    const newFile = await compressImage(file);
                    setCurrentImage(newFile);
                }
                catch (e) {
                    alert('Something went wrong while compressing the image.');
                }
            }
        }
    };

    const handleFromUploaded = () => {
        setLoading(true);
        handleMenuClose();
        setOpenFilePicker(true);
    };

    return (
        <Stack>
            <div>
                <Button
                    endIcon={<ArrowDropDownIcon />}
                    onClick={handleMenuOpen}
                >
                    add image
                </Button>
                {loading && <CircularProgress size='14px' />}
                <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleLocalFile}><LaptopIcon sx={{ mr: '5px' }} />My File</MenuItem>
                    <MenuItem onClick={handleFromUploaded}><HistoryIcon sx={{ mr: '5px' }} />Uploaded Files</MenuItem>
                </Menu>
                <input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                {openFilePicker && <FilePicker onClose={() => {
                    setOpenFilePicker(false);
                    setLoading(false);
                }} />}

            </div>
            {currentImage &&
                <div>
                    <Typography fontSize='14px'>
                        {imgDisplay[0]}
                        <IconButton onClick={() => setCurrentImage(null)}><DeleteIcon sx={{ fontSize: '16px' }}/></IconButton>
                    </Typography>
                    <img loading='lazy' src={imgDisplay[1]} alt='' width='100px' height='100px' />
                </div>
            }
        </Stack>

    );
};

export default AddImage;