Bluegen Admin Inventory & Order Dashboard

A full-stack MERN (MongoDB, Express, React, Node.js) Admin Dashboard built to efficiently manage store products and customer orders. Designed and implemented for the Bluegen Studios technical assessment, following industry best practices for scalability, maintainability, and modern UI/UX.

🚀 Live Deployment

Frontend: https://admin-inventory-system.vercel.app/

Backend: https://admin-inventory-system-production.up.railway.app

⚙️ Getting Started

🔧 Backend Setup

cd Backend
npm install

Create a .env file from .env.example:

PORT=5000
MONGOURL=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret

Start the server:

npm run start || npm run dev

🌐 Frontend Setup

cd Frontend
npm install

Create a .env file:

VITE_API_BASE_URL=https://your-backend.up.railway.app/api

Start the development server:

npm run dev

✨ Features Overview

🔐 Authentication

Secure Admin-only JWT login

Auto-redirect and protected routes

📦 Product Management

Add / Edit / Delete Products

Upload images using Multer & Cloudinary

Search products by title

Pagination support

📬 Order Management

View all orders with related products

Update order status (Pending → Shipped → Delivered)

Export orders to CSV

Pagination for performance

📊 Dashboard

Real-time summary statistics:

Total Products

Total Orders

Pending Orders

Responsive cards with subtle animations

🔁 Reusable & Modern Components

Centralized Loader, Toasts, Modals

Clean and consistent layout

Zustand state management

🛠 Tech Stack

💻 Frontend

React (Vite)

TailwindCSS + DaisyUI

Zustand for global state

React Router DOM

React Toastify

🌐 Backend

Express.js

MongoDB + Mongoose

JWT Authentication + Cookies

Joi (Validation)

Multer + Cloudinary (Image Uploads)

☁️ Deployment

Frontend: Vercel

Backend: Railway
