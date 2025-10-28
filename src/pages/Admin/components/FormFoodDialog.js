import { Box, Button, Dialog, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import UploadButton from './UploadButton';
import debounce from '../../../utils/debounce';
import { useFoodContext } from "../../../context/FoodMngrContext";

const FormFoodDialog = ({ onClose, foodItem }) => {
    const [name, setName] = useState(foodItem ? foodItem.name : '');
    const [desc, setDesc] = useState(foodItem ? foodItem.desc : '');
    const [price, setPrice] = useState(foodItem ? foodItem.price : '');
    // const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [helperText, setHelperText] = useState('');
    const handleButtonDisable = useRef();
    const { addFood, editFoodHandler, setCurrentImage, retrieveFoodImages } = useFoodContext();
    // const [openCompressDialog, setOpenCompressDialog] = useState(false);

    // const handleInputImage = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         //file size should not be larger than 10MB
    //         if (file.size > 10 * 1024 * 1024) {
    //             // alert('File size exceeds 10MB. Please choose a smaller image.');
    //             setCurrentImage(file);
    //             setOpenCompressDialog(true);
    //             e.target.value = '';
    //             // return;
    //         }
    //         else if (!file.type.startsWith('image/')) {
    //             alert('Please select an image file');
    //             e.target.value = '';
    //             return;
    //         } else {
    //             setCurrentImage(file);
    //         }
    //     } else { setCurrentImage(null) }
    // }

    useEffect(() => { retrieveFoodImages() })

    const cancel = () => {
        // setError('');
        // setHelperText('');
        // setName('');
        // setDesc('');
        // setPrice('');
        setCurrentImage(null);
        onClose();
    };

    const submitFood = (e) => {
        e.preventDefault();
        if (!name || !desc || !price) {
            setHelperText('Please fill in all the details');
            setError('all');
            return;
        } 
        // if (name === '' && desc === '' && price === '') {
        //     setHelperText('Please fill in all the details');
        //     setError('all');
        // } else if (name === '') {
        //     setHelperText('Please name the food');
        //     setError('name');
        // } else if (desc === '') {
        //     setHelperText('Please describe the food');
        //     setError('desc');
        // } else if (price === '') {
        //     setHelperText('Please provide a price for the food');
        //     setError('price');
        // }
        // else 
            if (isNaN(price)) {
            setHelperText('Please input number for price');
            setError('price');
            return;
        } 
        // else {
            let food = {
                'name': name,
                'desc': desc,
                'price': Number(price),
            };
            !foodItem ? addFood(food) : editFoodHandler({
                id: foodItem.id,
                ...food,
            });
            setName('');
            setDesc('');
            setPrice('');
            onClose();
        // }
    };

    useEffect(() => {
        //error and login button handler. Wait 300ms before handling
        handleButtonDisable.current = debounce(() => {
            setHelperText('');
            setError('');
        }, 300);

        //cleanup on unmount
        return () => {
            handleButtonDisable.current.cancel?.();
        };
    }, [name, desc, price]);

    useEffect(() => {
        handleButtonDisable.current?.();
    }, [name, desc, price]);

    return (<Dialog open fullWidth='true'>

        {/* {openCompressDialog && <CompressImageDialog onClose={() => setOpenCompressDialog(false)} />} */}
        <Stack
            component='form' onSubmit={submitFood}
            sx={{
                bgcolor: 'secondary.main',
                padding: '20px',
                borderRadius: '8px',
                // width: '50%'
            }}
            spacing={2}
        >
            <TextField
                // required 
                autoFocus
                label='Food name'
                error={error === 'name' || error === 'all'}
                value={name}
                onChange={(e) => setName(e.target.value)} />
            <TextField
                // required
                name="desc"
                multiline
                label="Description"
                error={error === 'desc' || error === 'all'}
                value={desc}
                onChange={(e) => setDesc(e.target.value)} />
            <TextField
                // required 
                label='Price'
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">RM</InputAdornment>
                    }
                }}
                error={error === 'price' || error === 'all'}
                value={price}
                onChange={(e) => setPrice(e.target.value)} />
            {helperText && <Typography fontSize='14px' color='error'>{helperText}</Typography>}
            {/* <input type="file" accept="image/*" onChange={(e) => handleInputImage(e)}></input>
            {currentImage && <img src={URL.createObjectURL(currentImage)} alt="" width='100px' height='100px' />} */}
            <UploadButton />
            <Box display='flex'>
                <Button
                    // disabled={addDisable} 
                    type="submit" variant="contained" sx={{
                        flex: 1, mr: '8px'
                    }}>{!foodItem ? 'add' : 'update'}</Button>
                <Button onClick={cancel} variant="outlined" sx={{
                    '&:hover': { bgcolor: "primary.light" },
                    flex: 1,
                    borderColor: "primary", color: "custom"
                }}>cancel</Button>
            </Box>
        </Stack>
    </Dialog>
    );
}

export default FormFoodDialog;