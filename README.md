# Food Order App

## Overview

A food order app that has two types of users: customer and admin. Built with React, Context API, [Material UI](https://mui.com/), [cloudinary](https://cloudinary.com/), localStorage, and json-server.

## Features

For admin:
- Add, edit, and delete food
- View food details
- Compress and upload food image to cloudinary
- Reuse uploaded image files
- View orders
- Change status of orders: Prepare/Reject/Completed

For customer:
- View food details
- Add food to cart
- Remove food from cart
- View cart, checkout
- View orders history

## Running the Demo

This project includes:
- Frontend: `food-order-app/`
- Backend (mock API): `server-api/`

### Backend Setup

1. Copy the example database:

    ```bash
    cp server-api/db.example.json server-api/db.json
    ```
2. Install dependencies and start the server:

    ```bash
    cd server-api
    npm install
    npm start
    ```

> The backend runs on [http://localhost:3006](http://localhost:3006) by default.

### Frontend Setup

1. Install dependencies and start the frontend:

    ```bash
    cd food-order-app
    npm install
    npm start
    ```

> The app runs on [http://localhost:3000](http://localhost:3000) by default.

### Cloudinary setup

There are [many ways to upload image to cloudinary](https://cloudinary.com/documentation/upload_images#unsigned_upload), but we are going to upload it programmatically, without a signature.

> Cloudinary REST API URL: https://api.cloudinary.com/v1_1/<your_cloud_name>/<resource_type>/upload

1. [Sign up for free on cloudinary](https://cloudinary.com/users/register_free) and get your cloud name.
2. Using cloudinary console, add upload preset and name it as 'upload-unsigned-food-image'. Please ensure the signing mode is set to Unsigned.
   
    ![Add upload preset at Cloudinary console](upload-preset-cloudinary.jpg)
   
3. Create .env file at your project's root.
4. Store your Cloudinary REST API URL in .env as REACT_APP_API_URL:
   
    ```bash
    REACT_APP_API_URL=https://api.cloudinary.com/v1_1/<your cloud name>/image/upload
    ```
    
5. Store cloudinary's imageURL prefix in .env as REACT_APP_PREFIX_IMAGEURL:
   
    ```bash
    REACT_APP_PREFIX_IMAGEURL=https://res.cloudinary.com/<your cloud name>/image/upload/
    ```
    
