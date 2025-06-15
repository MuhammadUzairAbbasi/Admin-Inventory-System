# 🧠 Bluegen Admin Inventory & Order Dashboard

A full-stack **MERN** (MongoDB, Express, React, Node.js) Admin Dashboard developed for the Bluegen Studios technical assessment. This project demonstrates best practices in scalability, maintainability, and modern UI/UX design.

---

## ⚙️ Getting Started

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET=your_secret
```

Run the server:

```bash
npm start     # Production
npm run dev   # Development with nodemon
```

### 🌐 Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `/frontend` directory:

```env
VITE_API_BASE_URL=https://your-backend.up.railway.app/api
```

Run the frontend server:

```bash
npm run dev
```

---

## ✨ Features

### 🔐 Authentication

- Admin-only login with JWT
- Auto-redirect and route protection

### 📦 Product Management

- Add, edit, and delete products
- Upload images via Multer & Cloudinary
- Search by title with pagination

### 📬 Order Management

- View all orders with item details
- Update order status (Pending → Shipped → Delivered)
- Export orders to CSV
- Paginated order list

### 📊 Dashboard

- Display stats: total products, total orders, pending orders
- Responsive layout with animated UI cards

### 🔁 Reusable Components

- Global Loader and Toast notifications
- Form and Confirmation Modals
- Zustand-powered global state management

---

## 🛠 Tech Stack

### Frontend

- ⚛️ React (Vite)
- 🎨 TailwindCSS + DaisyUI
- 🔄 Zustand
- 🧭 React Router DOM
- 🔔 React Toastify

### Backend

- 🛠 Express.js
- 🗃 MongoDB + Mongoose
- 🔐 JWT + Cookie Auth
- 📏 Joi (validation)
- ☁️ Cloudinary + Multer (image upload)

### Deployment

- 🌐 **Frontend**: Vercel
- ☁️ **Backend**: Railway
- 🧮 **Database**: Railway MongoDB

---

## 📑 API Documentation

### 🔐 Authentication

| Method | Endpoint           | Description  |
| ------ | ------------------ | ------------ |
| POST   | `/api/auth/login`  | Admin login  |
| POST   | `/api/auth/logout` | Admin logout |

### 🛍 Products

| Method | Endpoint                          | Description             |
| ------ | --------------------------------- | ----------------------- |
| GET    | `/api/products`                   | List all products       |
| POST   | `/api/products/addProduct`        | Add a new product       |
| PUT    | `/api/products/updateProduct/:id` | Update product details  |
| DELETE | `/api/products/:id`               | Delete a product        |
| GET    | `/api/products/:title`            | Search by product title |

### 📦 Orders

| Method | Endpoint                  | Description         |
| ------ | ------------------------- | ------------------- |
| GET    | `/api/orders`             | List all orders     |
| POST   | `/api/orders/createOrder` | Create a new order  |
| PUT    | `/api/orders/:id/status`  | Update order status |

📥 You can test all endpoints using the included `postman_collection.json`.

---

## 📝 Final Notes

- 🧠 Codebase is modular, scalable, and maintainable
- 📐 Built with production-ready architecture and styling
- 🤖 AI tools used to speed up workflow, not replace development
- 📱 Fully responsive UI built with modern design principles

---

✅ **Project complete and ready for submission.**

> Created with 💙 by **Muhammad Uzair Abbasi**

