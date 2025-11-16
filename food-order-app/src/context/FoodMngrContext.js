import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { deleteFood, getFood, postFood, putFood } from '../api/food';
import { useAuthContext } from './AuthContext';
import { getImage, postImage, uploadLocalImage } from '../api/foodImages';
import { useOrderContext } from './OrderContext';

// const foodMngrContext = createContext();
const FoodStateContext = createContext();
const FoodActionsContext = createContext();

export const FoodMngrProvider = ({ children }) => {
    const { setLoading } = useAuthContext();
    const { loadOrder } = useOrderContext();
    const [food, setFood] = useState([]);
    const [foodImages, setFoodImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);

    //reducer
    const [form, dispatch] = useReducer(formReducer, initialFormState);

    //retrieve food
    const retrieveFoods = async () => {
        const data = await getFood();
        if (data) setFood(data);
    };

    //retrieve available food images
    const retrieveFoodImages = async () => {
        const data = await getImage();
        if (data) setFoodImages(data);
    };

    //re-fetch and update across tabs using localStorage
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'itemsUpdated') {
                retrieveFoods();
            } else if (e.key === 'orderUpdated') {
                loadOrder();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        retrieveFoods();
        retrieveFoodImages();
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    //food image for the food to be saved
    const getFoodImg = async () => {
        if (!currentImage) return ''; //no image used

        //if image is already in json-server
        if (typeof (currentImage) === 'string' && currentImage.startsWith(process.env.REACT_APP_PREFIX_IMAGEURL)) {
            return currentImage;
        }

        //else, upload to cloudinary
        const imgURL = await uploadLocalImage(currentImage);

        //post image to json-server after uploading it to cloudinary        
        const dataImg = await postImage({
            id: uuidv4(),
            imgURL: imgURL
        });

        setFoodImages(prev => [...prev, dataImg]);

        return imgURL;
    };

    //save food
    const saveFood = async (item) => {
        setLoading(true);
        try {
            const imgURL = await getFoodImg(currentImage);
            const request = {
                ...item,
                imgURL: imgURL
            };

            let data;

            if (form.mode === 'add') {
                data = await postFood({ ...request, id: uuidv4() });
                setFood(prev => [...prev, data]);
            } else {
                data = await putFood(request);
                setFood(prev =>
                    prev.map(oldFood =>
                        oldFood.id === data.id ? { ...data } : oldFood
                    )
                );
            }
            setCurrentImage(null);

        } finally {
            setLoading(false);
        }
    };

    //delete food
    const deleteFoodHandler = async (id) => {
        await deleteFood(id);
        let newFoodList = food.filter((item) => {
            return item.id !== id;
        });
        if (newFoodList.length === 0) { localStorage.setItem('cart', '[]'); }
        setFood(newFoodList);
    };

    const state = {
        food,
        currentImage,
        foodImages,
        form
    };

    const actions = {
        retrieveFoods,
        saveFood,
        deleteFoodHandler,
        setCurrentImage,
        retrieveFoodImages,
        dispatch
    };

    return <FoodStateContext.Provider value={state}>
        <FoodActionsContext.Provider value={actions}>
            {children}
        </FoodActionsContext.Provider>
    </FoodStateContext.Provider>;
};

export const useFoodState = () => {
    return useContext(FoodStateContext);
};

export const useFoodActions = () => {
    return useContext(FoodActionsContext);
};

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