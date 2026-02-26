import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CartPage from "./pages/user/CartPage/CartPage";
import ProfilePage from "./pages/user/ProfilePage/ProfilePage";
import ProductsPage from "./pages/user/ProductsPage/ProductsPage";
import ServicesPage from "./pages/user/ServicesPage/ServicesPage";
import DetailedProductPage from "./pages/user/DetailedProductPage/DetailedProductPage";
import DetailedServicePage from "./pages/user/DetailedServicePage/DetailedServicePage";
import ListProductsPage from "./pages/admin/ListProductsPage/ListProductsPage";
import ManageOrdersPage from "./pages/admin/ManageOrdersPage/ManageOrdersPage";
import ManageProductCategoryPage from "./pages/admin/ManageProductCategoryPage/ManageProductCategoryPage";
import ManageServicesPage from "./pages/admin/ManageServicesPage/ManageServicesPage";
import StockPage from "./pages/admin/StockPage/StockPage";
import AdminDashBoard from "./pages/admin/DashBoardPage/AdminDashBoard";

import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import LoginPage from "./pages/user/LoginPage/LoginPage";


import "./App.css";
import RegisterPage from "./pages/user/RegisterPage/RegisterPage";

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <Routes>
            <Route
                path="/"
                element={<Navigate to="/user/products" replace />}
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/login" element={<LoginPage />} />

            <Route path="/user" element={<UserLayout />}>
              <Route path="cart" element={<CartPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route
                  path="detailedProduct/:id"
                  element={<DetailedProductPage />}
              />
              <Route
                  path="detailedService/:id"
                  element={<DetailedServicePage />}
              />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashBoard" element={<AdminDashBoard />} />
              <Route path="listProducts" element={<ListProductsPage />} />
              <Route path="manageOrders" element={<ManageOrdersPage />} />
              <Route
                  path="manageProductCategory"
                  element={<ManageProductCategoryPage />}
              />
              <Route
                  path="manageServices"
                  element={<ManageServicesPage />}
              />
              <Route path="stock" element={<StockPage />} />
            </Route>
          </Routes>
      </BrowserRouter>
  );
};

export default App;
