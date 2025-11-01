import { Box, Button, Dialog, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useReducer } from 'react';
import { useFoodContext } from '../../../context/FoodMngrContext';
import AddImage from './AddImage';
import useDebounceTimeout from '../../../utils/debounce';

const FormFoodDialog = ({ onClose, foodItem }) => {
    const { addFood, editFoodHandler, setCurrentImage, initialFormState, formReducer } = useFoodContext();
    const [form, dispatch] = useReducer(formReducer, initialFormState);
    const { id, foodname, desc, price, error, helperText, mode } = form;
    const debounce = useDebounceTimeout();

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
        } else {
            dispatch({ type: 'RESET' });
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

        let food = {
            'name': foodname,
            'desc': desc,
            'price': Number(price),
        };

        if (mode === 'edit') {
            editFoodHandler({
                id: id,
                ...food,
            });
        } else {
            addFood(food);
        }

        dispatch({ type: 'RESET' });
        onClose();
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