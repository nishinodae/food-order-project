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

// [
//     {
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761486151/nasi-lemak-illustration-compressed_yoqeub.jpg",
//       "id": "7368c556-f24a-4411-9375-94db61a88cf5",
//       "name": "pizza",
//       "desc": "this is pizza with shrimp and nanas",
//       "price": 10
//     },
//     {
//       "img": "",
//       "id": "47975292-62fb-4833-99a7-fea77835c84a",
//       "name": "Laksa",
//       "desc": "laksa penang",
//       "price": 8
//     },
//     {
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761395058/pizza_wzr38a.jpg",
//       "id": "31226f3d-595f-4778-85c6-a6fcd92b054e",
//       "name": "pizza",
//       "desc": "hawaian pizza with pineapple",
//       "price": 10
//     },
//     {
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761402933/hold-burger_cobkzs.jpg",
//       "id": "9c2c0fc8-5b4b-4d66-91b5-6fb72bdca32a",
//       "name": "burger",
//       "desc": "burger daging",
//       "price": 4
//     },
//     {
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761459042/nasi-lemak_rnbc1v.png",
//       "id": "68bff6a6-d13e-45f2-a1ee-f894be93a7ce",
//       "name": "Nasi lemak",
//       "desc": "Nasi lemak ayam",
//       "price": 8.5
//     },
//     {
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761459042/nasi-lemak_rnbc1v.png",
//       "id": "f936abd8-1a38-4ef2-bf1a-9f61f0fd932c",
//       "name": "eh",
//       "desc": "hello",
//       "price": 2
//     },
//     {
//       "id": "f0214cf5-405c-49a3-8360-92a36e5968c5",
//       "name": "try",
//       "desc": "try",
//       "price": 5,
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761395058/pizza_wzr38a.jpg"
//     },
//     {
//       "id": "dcec105b-41e9-4a27-9b32-9797decee785",
//       "name": "nasi goreng",
//       "desc": "nasi goreng kosong",
//       "price": 7,
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761662836/nasigoreng-compressed_ozfc0m.jpg"
//     },
//     {
//       "id": "45c9a285-a2e5-4db2-b97b-323376c60934",
//       "name": "laksa",
//       "desc": "laksa",
//       "price": 11,
//       "img": "https://res.cloudinary.com/dwaumozv9/image/upload/v1761664038/laksa-compressed_vdddny.jpg"
//     }
//   ]


