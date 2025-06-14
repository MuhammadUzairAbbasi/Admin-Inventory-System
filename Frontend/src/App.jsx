import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { useAuthStore } from "./store/useAuthStore";
import OrdersPage from "./pages/dashboard/OrdersPage";
import ProductsPage from "./pages/dashboard/ProductPage";
import { Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";

function App() {
  const { isLoggedIn } = useAuthStore();
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/products"
          element={isLoggedIn ? <ProductsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders"
          element={isLoggedIn ? <OrdersPage /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
