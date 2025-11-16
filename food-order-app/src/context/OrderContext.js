import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { editOrder, getAllOrder, getOrderByUserId, postOrder } from '../api/order';
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from './AuthContext';

const initialOrderState = {
    orders: [],
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
                orders: state.orders.map(order =>
                    order.id === action.payload.id
                        ? { ...order, status: action.payload.status, timestamp: action.payload.timestamp }
                        : order
                ).sort((a, b) => b.timestamp - a.timestamp)
            };
        default:
            return state;
    }
};

const orderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(orderReducer, initialOrderState);
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
        loadOrder();
    }, []);

    useEffect(() => {
        setnewOrderLength(state.orders.filter((item) => (item.status === 'Ordered' || item.status === 'Preparing')).length);
    }, [state.orders]);

    const createOrder = async (order) => {
        try {
            const data = await postOrder({
                ...order,
                id: uuidv4(),
                timestamp: Date.now(),
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

    const updateOrder = useCallback(async (order) => {
        const data = await editOrder({
            ...order,
            timestamp: Date.now()
        });
        if (data) {
            dispatch({
                type: 'UPDATE_STATUS',
                payload: data
            });
        }
    }, []);

    const value = {
        orders: state.orders,
        createOrder,
        updateOrder,
        showOrder,
        setShowOrder,
        newOrderLength,
        loadOrder
    };

    return <orderContext.Provider value={value}>
        {children}
    </orderContext.Provider>;
};

export const useOrderContext = () => useContext(orderContext);
