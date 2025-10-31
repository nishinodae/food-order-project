import { createContext, useContext, useEffect, useState } from 'react';
import { useFoodContext } from './FoodMngrContext';

const cartContext = createContext();

export function CartContextProvider({ children }) {
    const LOCAL_STORAGE_CART_KEY = 'cart';
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || []);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartLength, setCartLength] = useState(0);
    const { food } = useFoodContext();

    useEffect(() => {
        if (food.length > 0 && cart.length > 0) {
            let currentTotal = 0;
            let qty = 0;
            const invalidItem = [];

            cart.forEach(cartItem => {
                let foodExist;
                for (const foodItem of food) {
                    if (foodItem.id === cartItem.id) {
                        foodExist = foodItem;
                        break;
                    }
                }
                if (foodExist) {
                    currentTotal += (cartItem.qty * foodExist.price);
                    qty += cartItem.qty;
                } else {
                    invalidItem.push(cartItem.id);
                }
            });
            if (invalidItem.length > 0) {
                setCart(cart.filter((item) => {
                    return !invalidItem.includes(item.id);
                }));
            }
            setTotalPrice(currentTotal);
            setCartLength(qty);
            // localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
        }
        else if (food.length === 0 && JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)).length === 0 && cart.length > 0) {
            clearCart();
        }
    }, [cart, food]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    }, [cart]);

    //clear cart
    const clearCart = () => {
        setCart([]);
        setTotalPrice(0);
        setCartLength(0);
    };

    //add food to cart
    const addFoodToCart = (id) => {
        let foodExistinCart = false;
        for (const item of cart) {
            if (item.id === id) {
                foodExistinCart = true;
                break;
            }
        }
        if (foodExistinCart) {
            setCart(cart.map(oldItem =>
                oldItem.id === id ? {
                    // ...food, //food contain id, original price, current qty
                    // price: oldItem.price + food.price,
                    id: id,
                    qty: oldItem.qty + 1,
                } : oldItem
            ));
        } else {
            setCart([...cart, {
                // ...food, //food contain id, original price, current qty
                id: id,
                qty: 1,
            }]);
        }
    };

    //remove food from cart
    const removeFoodFromCart = (id, all) => {
        let foodExistinCart;
        for (const item of cart) {
            if (item.id === id) {
                foodExistinCart = item;
                break;
            }
        }
        if (foodExistinCart) {
            let newCart;
            if (foodExistinCart.qty <= 1 || all) {
                newCart = cart.filter((item) => {
                    return item.id !== id;
                });

            } else {
                newCart = cart.map(oldItem =>
                    oldItem.id === id ? {
                        // ...food, //food contain id, original price, current qty
                        // price: oldItem.price - food.price,
                        id: id,
                        qty: oldItem.qty - 1
                    } : oldItem
                );
            }
            setCart(newCart);
            if (newCart.length === 0) {
                // localStorage.setItem(LOCAL_STORAGE_CART_KEY, '[]');
                setTotalPrice(0);
                setCartLength(0);
            }
        }
    };

    const value = {
        cart,
        clearCart,
        addFoodToCart,
        removeFoodFromCart,
        totalPrice,
        // cartInfo,
        cartLength
    };

    return <cartContext.Provider value={value}>
        {children}
    </cartContext.Provider>;
}

export function useCartContext() {
    return useContext(cartContext);
}