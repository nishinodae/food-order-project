const baseURL = 'http://localhost:3006/orders';

export const postOrder = async (order) => {
    try {
        const response = await fetch(baseURL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            }
        );
        localStorage.setItem('orderUpdated', Date.now());
        return response.json();
    }
    catch (e) {
        alert('Error:', e);
    }
};

export const editOrder = async (order) => {
    try {
        const response = await fetch(`${baseURL}/${order.id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            }
        );
        localStorage.setItem('orderUpdated', Date.now());
        return response.json();
    }
    catch (e) {
        alert('Error:', e);
    }
};

export const getAllOrder = async () => {
    try {
        const response = await fetch(`${baseURL}?_sort=-timestamp`,
            {
                method: 'GET',
            }
        );
        return response.json();
    }
    catch (e) {
        alert('Error:', e);
    }
};

// export const getAllOrderByStatus = async (status) => {
//     try {
//         const response = await fetch(`${baseURL}?status=${status}`,
//             {
//                 method: "GET",
//             }
//         );
//         return response.json();
//     }
//     catch (e) {
//         alert('Error:', e);
//     }
// }

export const getOrderByUserId = async (id) => {
    try {
        const response = await fetch(`${baseURL}?userid=${id}&_sort=-timestamp`,
            {
                method: 'GET',
            }
        );
        return response.json();
    }
    catch (e) {
        alert('Error:', e);
    }
};

// export const getOrderByUserIdStatus = async (id, status) => {
//     try {
//         const response = await fetch(`${baseURL}?userid=${id}&status=${status}`,
//             {
//                 method: "GET",
//             }
//         );
//         return response.json();
//     }
//     catch (e) {
//         console.error('Error:', e);
//     }
// }
