//Submitted (on customer page) => after customer click checkout
//Cancelled (on customer page) => when admin click 'reject order'
//Preparing (on customer page) => when admin click 'prepare order'
//Completed (on customer page) => when admin click 'order completed'

import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { editOrder, getAllOrder, getOrderByUserId, postOrder } from '../api/order';
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from './AuthContext';
import formatDateTime from '../utils/formatDateTime';

const initialOrderState = {
    orders: [],

    //   id: '',
    //   userid: "1",
    //   timestamp: "",
    //   food: [
    //     {
    //       name: "",
    //       qty: 0,
    //       price:0
    //     },
    //   ],
    //   totalPrice: 0,
    //   status: "Submitted"
};

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_ORDER':
            return {
                ...state, orders: action.payload
            };
        case 'CREATE_ORDER':
            return {
                ...state,
                orders: [action.payload, ...state.orders]
            };
        case 'UPDATE_STATUS':
            return {
                ...state,
                orders: state.orders.map(order => {
                    return order.id === action.payload.id ? {
                        ...order,
                        status: action.payload.status,
                        timestamp: action.payload.timestamp
                    } : order;
                })
            };
        default:
            return state;
    }
};

const orderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [{ orders }, dispatch] = useReducer(orderReducer, initialOrderState);
    const { user, customerID } = useAuthContext();
    const [showOrder, setShowOrder] = useState(false);
    const [newOrderLength, setnewOrderLength] = useState(0);

    const loadOrder = useCallback(async () => {
        let data;
        if (user === 'customer') {
            data = await getOrderByUserId(customerID);
        } else {
            data = await getAllOrder();
        }
        if (data) {
            dispatch({
                type: 'LOAD_ORDER',
                payload: data
            });
        }
    }, [user, customerID]);

    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'orderUpdated') {
                loadOrder();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        loadOrder();

        return () => window.removeEventListener('storage', handleStorageChange);
    }, [loadOrder]);

    useEffect(() => {
        setnewOrderLength(orders.filter((item) => item.status === 'Ordered').length);
    }, [orders]);

    const createOrder = async (order) => {
        try {
            const data = await postOrder({
                ...order,
                id: uuidv4(),
                timestamp: formatDateTime(),
                status: 'Ordered'
            });
            if (data) {
                dispatch({
                    type: 'CREATE_ORDER',
                    payload: data
                });
            }
            return true;
        }
        catch (e) {
            alert(e.message);
            return false;
        }
    };
    const updateOrder = async (order) => {
        const data = await editOrder({
            ...order,
            timestamp: formatDateTime(),
        });
        if (data) {
            dispatch({
                type: 'UPDATE_STATUS',
                payload: data
            });
        }
    };
    const value = {
        orders,
        createOrder,
        updateOrder,
        // filterOrder,
        showOrder,
        setShowOrder,
        newOrderLength
    };

    return <orderContext.Provider value={value}>
        {children}
    </orderContext.Provider>;
};

export const useOrderContext = () => useContext(orderContext);
