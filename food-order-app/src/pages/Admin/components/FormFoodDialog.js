import { Box, Button, Dialog, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useFoodActions } from '../../../context/FoodMngrContext';
import AddImage from './AddImage';
import useDebounceTimeout from '../../../utils/debounce';
import { useEffect, useReducer, useState } from 'react';

const FormFoodDialog = ({ onClose, foodItem }) => {
    const [form, dispatch] = useReducer(formReducer, initialFormState);
    const { id, foodname, desc, price, error, helperText, mode } = form;
    const { saveFood, setCurrentImage } = useFoodActions();
    const debounce = useDebounceTimeout();
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        if (foodItem) {
            dispatch({
                type: 'EDITING_MODE',
                payload: {
                    id: foodItem.id,
                    foodname: foodItem.name,
                    desc: foodItem.desc,
                    price: foodItem.price,
                }
            });
        }
    }, [foodItem]);

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
            saveFood(food, mode);
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

const initialFormState = {
    id: null,
    foodname: '',
    desc: '',
    price: '',
    error: '',
    helperText: '',
    mode: 'add'
};

const formReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.value,
                helperText: action.helperText
            };
        case 'EDITING_MODE':
            return {
                ...state,
                ...action.payload,
                mode: 'edit'
            };
        case 'RESET':
            return initialFormState;

        default: return state;
    }
};