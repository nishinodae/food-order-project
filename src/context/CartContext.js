import { createContext, useContext, useEffect, useState } from "react";
import { useFoodContext } from "./FoodMngrContext";

const cartContext = createContext();

export function CartContextProvider({ children }) {
    const LOCAL_STORAGE_CART_KEY = 'cart';
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || []);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartInfo, setCartInfo] = useState([]);
    const [cartLength, setCartLength] = useState(0);
    const { food } = useFoodContext();

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));

        //get cart info
        if (cart) {
            let currentTotal = 0;
            let qty = 0;
            const info = cart.forEach(cartItem => {
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
                    return foodExist;
                } else {
                    setCart(cart.filter((item) => {
                        return item.id !== cartItem.id;
                    }));
                }
            });
            setCartInfo(info);
            setTotalPrice(currentTotal);
            setCartLength(qty);
        }
    }, [cart, food]);

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
    const removeFoodFromCart = (id) => {
        let foodExistinCart;
        for (const item of cart) {
            if (item.id === id) {
                foodExistinCart = item;
                break;
            }
        }
        if (foodExistinCart.qty === 1) {
            let newCart = cart.filter((item) => {
                return item.id !== id;
            });
            setCart(newCart);
        } else {
            setCart(cart.map(oldItem =>
                oldItem.id === id ? {
                    // ...food, //food contain id, original price, current qty
                    // price: oldItem.price - food.price,
                    id: id,
                    qty: oldItem.qty--
                } : oldItem
            ));
        }

    };

    const value = {
        cart,
        addFoodToCart,
        removeFoodFromCart,
        totalPrice,
        cartInfo,
        cartLength
    }

    return <cartContext.Provider value={value}>
        {children}
    </cartContext.Provider>
}

export function useCartContext() {
    return useContext(cartContext);
}