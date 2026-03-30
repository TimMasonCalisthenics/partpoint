import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ProductsPage from './pages/Products';
import ComparePage from './pages/Compare';
import RegisterPage from './pages/Register';
import BrandsPage from './pages/Brands';
import AboutPage from './pages/About';
// import หน้าอื่นๆ เข้ามาตรงนี้...

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;