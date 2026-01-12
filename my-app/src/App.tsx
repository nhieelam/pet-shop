import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CartPage from './pages/user/CartPage/CartPage';
import ProfilePage from './pages/user/ProfilePage/ProfilePage';
import ProductsPage from './pages/user/ProductsPage/ProductsPage';
import ServicesPage from './pages/user/ServicesPage/ServicesPage';
import DetailedProductPage from './pages/user/DetailedProductPage/DetailedProductPage';
import DetailedServicePage from './pages/user/DetailedServicePage/DetailedServicePage';
import ListProductsPage from './pages/admin/ListProductsPage/ListProductsPage';
import ListServicesPage from './pages/admin/ListServicesPage/ListServicesPage';
import ManageOrdersPage from './pages/admin/ManageOrdersPage/ManageOrdersPage';
import ManageProductCategoryPage from './pages/admin/ManageProductCategoryPage/ManageProductCategoryPage';
import ManageServicesPage from './pages/admin/ManageServicesPage/ManageServicesPage';
import StockPage from './pages/admin/StockPage/StockPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user/products" replace />} />
        <Route path="/user/cart" element={<CartPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
        <Route path="/user/products" element={<ProductsPage />} />
        <Route path="/user/services" element={<ServicesPage />} />
        <Route path="/user/detailedProduct/:id" element={<DetailedProductPage />} />
        <Route path="/user/detailedService/:id" element={<DetailedServicePage />} />
        <Route path="/admin/listProducts" element={<ListProductsPage />} />
        <Route path="/admin/listServices" element={<ListServicesPage />} />
        <Route path="/admin/manageOrders" element={<ManageOrdersPage />} />
        <Route path="/admin/manageProductCategory" element={<ManageProductCategoryPage />} />
        <Route path="/admin/manageServices" element={<ManageServicesPage />} />
        <Route path="/admin/stock" element={<StockPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
