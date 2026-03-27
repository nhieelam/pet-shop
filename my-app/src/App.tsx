import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/user/RegisterPage/RegisterPage";


import CartPage from "./pages/user/CartPage/CartPage";
import ProfilePage from "./pages/user/ProfilePage/ProfilePage";
import ProductsPage from "./pages/user/ProductsPage/ProductsPage";
import DetailedProductPage from "./pages/user/DetailedProductPage/DetailedProductPage";
import ReviewPage from "./pages/user/ReviewPage/ReviewPage";

import PaidInvoicesPage from "./pages/user/PaidInvoicesPage/PaidInvoicesPage";
import InvoiceDetailPage from "./pages/user/PaidInvoicesPage/InvoiceDetailPage";

import PetsPage from "./pages/user/PetsPage/PetsPage";

import { AuthProvider } from "./context/authContext";

import "./App.css";

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
                path="/"
                element={<Navigate to="/user/products" replace />}
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/register" element={<RegisterPage />} />


            <Route path="/user" element={<UserLayout />}>
              <Route path="cart" element={<CartPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="pets" element={<PetsPage />} />
              <Route
                  path="detailedProduct/:id"
                  element={<DetailedProductPage />}
              />

              <Route path="invoices/:invoiceId" element={<InvoiceDetailPage />} />
              <Route path="invoices" element={<PaidInvoicesPage />} />
              <Route path="review" element={<ReviewPage />} />
            </Route>

          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
};

export default App;
