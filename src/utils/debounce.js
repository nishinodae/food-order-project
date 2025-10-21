//debounce the function so it is not executed repeatedly in quick succession
export default function debounce(func, delay) {
    let timer;
    const debounced = (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };

    //cancel on unmount
    debounced.cancel = () => clearTimeout(timer);
    return debounced;
}
