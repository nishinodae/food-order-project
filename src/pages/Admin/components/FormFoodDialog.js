import { Box, Button, Dialog, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useReducer, useRef } from "react";
import { useFoodContext } from "../../../context/FoodMngrContext";
import AddImage from "./AddImage";

const FormFoodDialog = ({ onClose, foodItem }) => {
    // const [name, setName] = useState(foodItem ? foodItem.name : '');
    // const [desc, setDesc] = useState(foodItem ? foodItem.desc : '');
    // const [price, setPrice] = useState(foodItem ? foodItem.price : '');
    // const [error, setError] = useState('');
    // const [helperText, setHelperText] = useState('');
    const debounceRef = useRef();
    const { addFood, editFoodHandler, setCurrentImage, initialFormState, formReducer } = useFoodContext();
    const [form, dispatch] = useReducer(formReducer, initialFormState);
    const { id, foodname, desc, price, error, helperText, mode } = form;

    useEffect(() => {
        if (foodItem) {
            dispatch({
                type: 'EDITING',
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

    useEffect(() => {
        return () => {
            clearTimeout(debounceRef.current);
        }
    }, [])

    const handleChange = (e) => {
        dispatch({
            type: 'CHANGE_FIELD',
            field: e.target.name,
            value: e.target.value,
        });

        if (error !== '') {
            clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
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

    // useEffect(() => {
    //     //error and login button handler. Wait 300ms before handling
    //     handleError.current = debounce(() => {
    //         setHelperText('');
    //         setError('');
    //     }, 300);

    //     //cleanup on unmount
    //     return () => {
    //         handleError.current.cancel?.();
    //     };
    // }, [name, desc, price]);

    // useEffect(() => {
    //     handleError.current?.();
    // }, [name, desc, price]);

    // const submitFood = (e) => {
    //     e.preventDefault();
    //     if (!name || !desc || !price) {
    //         setHelperText('Please fill in all the details');
    //         setError('all');
    //         return;
    //     }
    //     if (isNaN(price)) {
    //         setHelperText('Please input number for price');
    //         setError('price');
    //         return;
    //     }
    //     let food = {
    //         'name': name,
    //         'desc': desc,
    //         'price': Number(price),
    //     };
    //     !foodItem ? addFood(food) : editFoodHandler({
    //         id: foodItem.id,
    //         ...food,
    //     });
    //     setName('');
    //     setDesc('');
    //     setPrice('');
    //     onClose();
    // };

    // const cancel = () => {
    //     setCurrentImage(null);
    //     onClose();
    // };

    return (<Dialog open fullWidth='true'>
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
                // error={error === 'name' || error === 'all'}
                // value={name}
                // onChange={(e) => setName(e.target.value)} />
                name='foodname'
                value={foodname}
                onChange={handleChange}
                error={error === 'all'}
            // helperText={helperText}
            />
            <TextField
                // required
                name="desc"
                // multiline
                label="Description"
                // error={error === 'desc' || error === 'all'}
                // value={desc}
                // onChange={(e) => setDesc(e.target.value)}
                value={desc}
                onChange={handleChange}
                error={error === 'all'}
            // helperText={helperText}
            />
            <TextField
                // required 
                label='Price'
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">RM</InputAdornment>
                    }
                }}
                // error={error === 'price' || error === 'all'}
                // value={price}
                // onChange={(e) => setPrice(e.target.value)}
                name='price'
                value={price}
                onChange={handleChange}
                error={error === 'price' || error === 'all'}
            // helperText={helperText}
            />
            {helperText && <Typography fontSize='14px' color='error'>{helperText}</Typography>}
            <AddImage />
            <Box display='flex'>
                <Button
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