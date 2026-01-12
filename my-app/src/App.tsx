import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CartPage from './pages/user/CartPage/CartPage';
import ProfilePage from './pages/user/ProfilePage/ProfilePage';
import ProductsPage from './pages/user/ProductsPage/ProductsPage';
import ServicesPage from './pages/user/ServicesPage/ServicesPage';
import DetailedProductPage from './pages/user/DetailedProductPage/DetailedProductPage';
import DetailedServicePage from './pages/user/DetailedServicePage/DetailedServicePage';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
