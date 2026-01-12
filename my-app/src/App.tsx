import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CartPage from './pages/user/CartPage/CartPage';
import ProfilePage from './pages/user/ProfilePage/ProfilePage';
import ProductsPage from './pages/user/ProductsPage/ProductsPage';
import ServicesPage from './pages/user/ServicesPage/ServicesPage';
import DetailedProductPage from './pages/user/DetailedProductPage/DetailedProductPage';
import DetailedServicePage from './pages/user/DetailedServicePage/DetailedServicePage';
import ListProductsPage from './pages/admin/ListProductsPage/ListProductsPage';
import ManageOrdersPage from './pages/admin/ManageOrdersPage/ManageOrdersPage';
import ManageProductCategoryPage from './pages/admin/ManageProductCategoryPage/ManageProductCategoryPage';
import ManageServicesPage from './pages/admin/ManageServicesPage/ManageServicesPage';
import StockPage from './pages/admin/StockPage/StockPage';
import UserLayout from './components/layouts/UserLayout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user/products" replace />} />
        
        {/* User routes with layout */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="detailedProduct/:id" element={<DetailedProductPage />} />
          <Route path="detailedService/:id" element={<DetailedServicePage />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/listProducts" element={<ListProductsPage />} />
        <Route path="/admin/manageOrders" element={<ManageOrdersPage />} />
        <Route path="/admin/manageProductCategory" element={<ManageProductCategoryPage />} />
        <Route path="/admin/manageServices" element={<ManageServicesPage />} />
        <Route path="/admin/stock" element={<StockPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
