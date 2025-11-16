import { Box, Button, Dialog, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useFoodActions, useFoodState } from '../../../context/FoodMngrContext';
import AddImage from './AddImage';
import useDebounceTimeout from '../../../utils/debounce';
import { useState } from 'react';

const FormFoodDialog = ({ onClose, foodItem }) => {
    const { saveFood, setCurrentImage, dispatch } = useFoodActions();
    const { form } = useFoodState();
    const { id, foodname, desc, price, error, helperText } = form;
    const debounce = useDebounceTimeout();
    const [disable, setDisable] = useState(false);

    const handleChange = (e) => {
        dispatch({
            type: 'CHANGE_FIELD',
            field: e.target.name,
            value: e.target.value,
        });

        if (error !== '') {
            debounce(() => {
                dispatch({
                    type: 'SET_ERROR',
                    value: '',
                    helperText: '',
                });
            }, 300);
        }
    };

    const submitFood = (e) => {
        e.preventDefault();
        if (!foodname || !desc || !price) {
            dispatch({
                type: 'SET_ERROR',
                value: 'all',
                helperText: 'Please fill in all the details',
            });
            return;
        }
        if (isNaN(price)) {
            dispatch({
                type: 'SET_ERROR',
                value: 'price',
                helperText: 'Please input number for price',
            });
            return;
        }

        const food = {
            'id': id,
            'name': foodname,
            'desc': desc,
            'price': Number(price),
        };

        try {
            setDisable(true);
            saveFood(food);
        }
        finally {
            dispatch({ type: 'RESET' });
            onClose();
        }

    };

    const cancel = () => {
        dispatch({ type: 'RESET' });
        setCurrentImage(null);
        onClose();
    };

    return (<Dialog open fullWidth='true'>
        <Stack
            component='form' onSubmit={submitFood}
            sx={{
                bgcolor: 'secondary.main',
                padding: '20px',
                borderRadius: '8px',
            }}
            spacing={2}
        >
            <TextField
                autoFocus
                label='Food name'
                name='foodname'
                value={foodname}
                onChange={handleChange}
                error={error === 'all'}
            />
            <TextField
                name='desc'
                label='Description'
                value={desc}
                onChange={handleChange}
                error={error === 'all'}
            />
            <TextField
                label='Price'
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position='start'>RM</InputAdornment>
                    }
                }}
                name='price'
                value={price}
                onChange={handleChange}
                error={error === 'price' || error === 'all'}
            />
            {helperText && <Typography fontSize='14px' color='error'>{helperText}</Typography>}
            <AddImage />
            <Box display='flex'>
                <Button
                    disabled={disable}
                    type='submit' variant='contained' sx={{
                        flex: 1, mr: '8px'
                    }}>{!foodItem ? 'add' : 'update'}</Button>
                <Button onClick={cancel} variant='outlined' sx={{
                    '&:hover': { bgcolor: 'primary.light' },
                    flex: 1,
                    borderColor: 'primary', color: 'custom'
                }}>cancel</Button>
            </Box>
        </Stack>
    </Dialog>
    );
};

export default FormFoodDialog;