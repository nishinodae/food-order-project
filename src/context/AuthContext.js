import { createContext, useContext, useState } from 'react';

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState('customer');
    const customerID = 1;
    const [loading, setLoading] = useState(false);

    const toggleUser = () => {
        user === 'customer' ? setUser('admin') : setUser('customer');
    };
    const value = {
        user,
        customerID,
        toggleUser,
        loading,
        setLoading
    };

    return <authContext.Provider value={value}>
        {children}
    </authContext.Provider>;
};

export const useAuthContext = () => {
    return useContext(authContext);
};