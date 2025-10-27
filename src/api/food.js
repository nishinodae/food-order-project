const baseURL = "http://localhost:3006/foods";

export const postFood = async (food) => {
    try {
        const response = await fetch(baseURL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(food),
            }
        );
        localStorage.setItem("itemsUpdated", Date.now());
        return response.json();
    }
    catch (e) {
        console.error('Error:', e);
    }
}

export const putFood = async (food) => {
    try {
        const response = await fetch(`${baseURL}/${food.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(food),
            }
        );
        localStorage.setItem("itemsUpdated", Date.now());
        return response.json();
    }
    catch (e) {
        console.error('Error:', e);
    }
}

export const deleteFood = async (id) => {
    try {
        await fetch(`${baseURL}/${id}`,
            {
                method: "DELETE",
            }
        );
        localStorage.setItem("itemsUpdated", Date.now());
    }
    catch (e) {
        console.error('Error:', e);
    }
}

export const getFood = async () => {
    try {
        const response = await fetch(baseURL,
            {
                method: "GET",
            }
        );
        return response.json();
    }
    catch (e) {
        console.error('Error:', e);
    }
}

// export const getFoodByID = async (id) => {
//     try {
//         const response = await fetch(`${baseURL}/${id}`,
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


