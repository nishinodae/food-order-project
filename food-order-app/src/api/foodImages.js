const baseURL = 'http://localhost:3006/foodImages';

//upload local image file to cloudinary
export const uploadLocalImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'upload-unsigned-food-image');
        
        //process.env.REACT_APP_API_URL stored the Cloudinary REST API URL
        const url = process.env.REACT_APP_API_URL;
        
        const response = await fetch(url,
            {
                method: 'POST',
                body: formData
            }
        );
        if (response.ok) {
            const data = await response.json();
            return data.secure_url; //image url returned by cloudinary
        } else {
            alert('Failed to upload image');
        }
    }
    catch (e) {
        alert('Upload error: ', e.message);
    }
};

export const postImage = async (imgData) => {
    try {
        const response = await fetch(baseURL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(imgData),
            }
        );
        return response.json();
    }
    catch (e) {
        alert('Error adding imageURL to json-server:', e);
    }
};

export const deleteImage = async (id) => {
    try {
        await fetch(`${baseURL}/${id}`,
            {
                method: 'DELETE',
            }
        );
    }
    catch (e) {
        alert('Error deleting imageURL from json-server:', e);
    }
};

export const getImage = async () => {
    try {
        const response = await fetch(baseURL,
            {
                method: 'GET',
            }
        );
        return response.json();
    }
    catch (e) {
        alert('Error getting imageURL from json-server:', e);
    }
};