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

// {
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761486151/nasi-lemak-illustration-compressed_yoqeub.jpg",
//       "id": "7368c556-f24a-4411-9375-94db61a88cf5",
//       "name": "pizza",
//       "desc": "this is pizza with shrimp and nanas",
//       "price": 10
//     },
//     {
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761373797/laksa.png-compressed_d3rutg.jpg",
//       "id": "47975292-62fb-4833-99a7-fea77835c84a",
//       "name": "laksa",
//       "desc": "laksa penang",
//       "price": 8
//     },
//     {
//       "id": "31226f3d-595f-4778-85c6-a6fcd92b054e",
//       "name": "pizza",
//       "desc": "hawaiian pizza with nanas",
//       "price": 10,
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761395058/pizza_wzr38a.jpg"
//     },
//     {
//       "id": "4dca16b2-4911-4517-98e4-0d68c280eaba",
//       "name": "laksa",
//       "desc": "laksa penang",
//       "price": 7,
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761373797/laksa.png-compressed_d3rutg.jpg"
//     },
//     {
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761402933/hold-burger_cobkzs.jpg",
//       "id": "9c2c0fc8-5b4b-4d66-91b5-6fb72bdca32a",
//       "name": "burger",
//       "desc": "burger daging",
//       "price": 4
//     },
//     {
//       "id": "2417f367-19ca-478c-b631-540e8ba00c49",
//       "name": "hawaiiii pizza",
//       "desc": "hehe",
//       "price": 7,
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761414350/pizza_wzr38a_yhaale.jpg"
//     },
//     {
//       "id": "f891564f-eaba-411c-ad78-d8a9db891f1c",
//       "name": "Laksa sarawak",
//       "desc": "eh takla..laksa penang rasanya",
//       "price": 7,
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761373797/laksa.png-compressed_d3rutg.jpg"
//     },
//     {
//       "id": "68bff6a6-d13e-45f2-a1ee-f894be93a7ce",
//       "name": "Nasi lemak",
//       "desc": "Nasi lemak biasa",
//       "price": 7,
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761459042/nasi-lemak_rnbc1v.png"
//     }


