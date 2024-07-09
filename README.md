# Twitter Clone in React + Vite

A full-stack Twitter clone application built using Express, MongoDB, and Vite with React.
Furthermore, it includes:

## 📜 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing the Application](#testing-the-application)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- Authentication and authorisation with JSONWEBTOKENS (JWT)
- React Query for Data Fetching, Caching etc.
- Suggested Users to Follow
- Post-creation, editing, and deletion
- Commenting on Posts
- Liking Posts
- Edit Profile Info
- Edit Cover Image and Profile Image
- Image Uploads using Cloudinary
- Real-time notifications and reactions

## 🛠️ Technologies Used

- Backend:

  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT (JSON Web Tokens)
  - Cloudinary (for image uploads)

- Frontend:

  - React
  - React Router
  - React Query
  - Tailwind CSS
  - Vite

- Test:

  - Jest / Supertest

- Other:
  - daisyUI

## 🔰 Prerequisites

Make sure you have the following installed:

- Node.js (v16 or later)
- npm (v7 or later)
- MongoDB
- Cloudinary

## 📥 Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/hikaru028/Twitter-Clone.git
   cd twitter-clone

   ```

2. **Install backend dependencies:**

   ```sh
   npm install

   ```

3. **Clone the repository:**

   ```sh
   cd ../frontend
   npm install
   ```

## 🏃‍♂️ Running the Application

1. **Setup environment variables:**
   Create a `.env` file in the root directory and add your MongoDB connection string, JWT secret, and Cloudinary credentials.

   ```sh
    PORT=8000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret #used git bush from Terminal (+⌄) and run "openssl rand -base64 32"
    EXPIRE_DAYS=15
    NODE_ENV="development"
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   ```

2. **Start the backend server and the frontend development server:**
   It should run both servers simultaneously.

   ```sh
   npm run dev

   ```

3. **Access the application:**
   Open your browser and go to http://localhost:3000

## ✅ Testing the Application

Setup for Jest and Supertest

1. **Install Jest and Supertest:**

   ```sh
    npm install --save-dev jest supertest

   ```

2. **Run the tests:**
   Make sure you are in the `/root` directory
   ```sh
   npx jest --config jest.config.cjs
   ```
   or
   ```sh
   npm test
   ```

## 📝 License

This project is licensed under the MIT License. See the [LICENSE.txt](https://github.com/hikaru028/Twitter-Clone/blob/main/LICENSE.txt) file for details.
