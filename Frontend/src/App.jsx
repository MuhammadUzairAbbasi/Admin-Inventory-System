import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Layout from "./layout/layout";
import Dashboard from "./pages/dashboard/DashboardPage";
import ProductPage from "./pages/dashboard/ProductPage";
import OrderPage from "./pages/dashboard/OrdersPage";
import LoginPage from "./pages/auth/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="orders" element={<OrderPage />} />
      </Route>

      <Route
        path="*"
        element={<div className="p-10 text-center">404 Not Found</div>}
      />
    </Routes>
  );
}
