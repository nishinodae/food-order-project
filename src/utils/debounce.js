import { useEffect, useRef } from 'react';

const useDebounceTimeout = () => {
    const debounceRef = useRef();
    useEffect(() => {
        return () => {
            clearTimeout(debounceRef.current);
        };
    }, []);
    const set = (callback, delay) => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(callback, delay);
    };

    return set;
};

export default useDebounceTimeout;