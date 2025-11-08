import { Button, CircularProgress, Menu, MenuItem, Stack, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HistoryIcon from '@mui/icons-material/History';
import LaptopIcon from '@mui/icons-material/Laptop';
import { useEffect, useRef, useState } from 'react';
import { useFoodContext } from '../../../context/FoodMngrContext';
import FilePicker from './FilePicker';

const AddImage = () => {
    const { currentImage, setCurrentImage } = useFoodContext();
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

    const compress = async (file) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            // Fill the background with white before drawing
            ctx.fillStyle = '#FFFFFF'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                if (blob.size > 10 * 1024 * 1024) {
                    compress(new File([blob]));
                } else {
                    let newfile = new File([blob], `${file.name.replace(/\.[^/.]+$/, '')}-compressed.jpg`, {
                        type: 'image/jpeg',
                        lastModified: new Date().getTime()
                    });
                    setCurrentImage(newfile);
                }

            },
                'image/jpeg', 0.7
            );

        };
    };

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
            //file size should not be larger than 10MB
            if (file.size > 10 * 1024 * 1024) {
                await compress(file);
            }
            else if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                setLoading(false);
                return;
            } else {
                setCurrentImage(file);
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
                {loading && <CircularProgress size='12px' />}

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
                    <Typography fontSize='12px'>{imgDisplay[0]}</Typography>
                    <img loading='lazy' src={imgDisplay[1]} alt='' width='100px' height='100px' />
                </div>
            }
        </Stack>

    );
};

export default AddImage;