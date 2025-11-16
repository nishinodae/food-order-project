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

    //add food
    const addFood = async (newFood) => {
        setLoading(true);
        if (currentImage) {
            let imgURL;

            //if image is already in json-server
            if (typeof (currentImage) === 'string' && currentImage.startsWith(process.env.REACT_APP_PREFIX_IMAGEURL)) {
                imgURL = currentImage;
            }
            else {
                imgURL = await uploadLocalImage(currentImage);

                //post image to json-server after uploading it to cloudinary
                const dataImg = await postImage({
                    id: uuidv4(),
                    imgURL: imgURL
                });
                setFoodImages([...foodImages, dataImg]);
            }
            if (imgURL) {
                const request = {
                    id: uuidv4(),
                    ...newFood,
                    imgURL: imgURL
                };
                const data = await postFood(request);
                setFood([...food, data]);
                setCurrentImage(null);
            }
        }
        else {
            const request = {
                id: uuidv4(),
                ...newFood,
                imgURL: ''
            };
            const data = await postFood(request);
            setFood([...food, data]);
        }
        setLoading(false);
    };

    //edit food
    const editFoodHandler = async (item) => {
        setLoading(true);
        if (currentImage) {
            let imgURL;
            if (typeof (currentImage) === 'string' && currentImage.startsWith(process.env.REACT_APP_PREFIX_IMAGEURL)) {
                imgURL = currentImage;
            }
            else {
                imgURL = await uploadLocalImage(currentImage);
                const dataImg = await postImage({
                    id: uuidv4(),
                    imgURL: imgURL
                });
                setFoodImages([...foodImages, dataImg]);
            }
            if (imgURL) {
                const data = await putFood({
                    imgURL: imgURL,
                    ...item,
                });
                const { id } = data;
                setFood(food.map(oldFood =>
                    oldFood.id === id ? { ...data } : oldFood
                ));
                setCurrentImage(null);
            }
        }
        else {
            const data = await putFood({
                imgURL: '',
                ...item,
            });
            const { id } = data;
            setFood(food.map(oldFood =>
                oldFood.id === id ? { ...data } : oldFood
            ));
        }
        setLoading(false);
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
        addFood,
        editFoodHandler,
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
    mode: 'create'
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