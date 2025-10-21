import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import debounce from '../../utils/debounce';

const AddFoodDialog = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    // const [addDisable, setAddDisable] = useState(true);
    const handleButtonDisable = useRef();

    const submitFood = (e) => {
        e.preventDefault();
        if (name === '' || desc === '' || price === '') {
            setHelperText('Please fill in all the details');
            setError(true);
        }else if(isNaN(price)){
            setHelperText('Please input number for price');
            setError(true);
        }
    };

    useEffect(() => {
        //error and login button handler. Wait 300ms before handling
        handleButtonDisable.current = debounce((name, desc, price) => {
            setHelperText('');
            setError(false);
            // if (name !== '' && desc !== '' && price !== '') {
            //     setAddDisable(false);
            // } else {
            //     setAddDisable(true);
            // }
        }, 300);

        //cleanup on unmount
        return () => {
            handleButtonDisable.current.cancel?.();
        };
    }, [name, desc, price]);

    useEffect(() => {
        handleButtonDisable.current?.(name, desc, price);
    }, [name, desc, price]);

    if (!isOpen) return null;
    return createPortal(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Stack
                component='form' onSubmit={submitFood}
                sx={{
                    // background: "#fbdeedff",
                    background: 'background',
                    padding: '20px',
                    borderRadius: '8px',
                    width: '50%'
                }}
                spacing={2}
            >
                <TextField 
                // required 
                autoFocus
                    label='Food name'
                    error={error}
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <TextField 
                // required 
                    label="Description"
                    error={error}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)} />
                <TextField 
                // required 
                    label='Price'
                    error={error}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                <Box display='flex' alignItems='center'>
                    <button style={{ marginRight: '5px' }}>Choose file</button>
                    No file chosen
                </Box>
                <Typography fontSize='14px' color='error'>{helperText}</Typography>
                <Box display='flex'>
                    <Button 
                    // disabled={addDisable} 
                    type="submit" variant="contained" sx={{
                        flex: 1, mr: '8px'
                    }}>add</Button>
                    <Button onClick={onClose} variant="outlined" sx={{
                        '&:hover': { bgcolor: "primary.light" },
                        flex: 1, 
                        borderColor: "primary", color: "custom"
                    }}>cancel</Button>
                </Box>
            </Stack>
        </div>,
        document.body
    );
}

export default AddFoodDialog;