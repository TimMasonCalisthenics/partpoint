import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ProductsPage from './pages/Products';
import ComparePage from './pages/Compare';
import RegisterPage from './pages/Register';
import BrandsPage from './pages/Brands';
import AboutPage from './pages/About';
import ProductDetailsPage from './pages/ProductDetails';
import UserDashboardPage from './pages/UserDashboard';
import AdminProductsPage from './pages/admin/AdminProducts';
import AdminDashboardPage from './pages/admin/Dashboard';
import AdminUserManagementPage from './pages/admin/UserManagement';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';
import ProtectedRoute from './components/ProtectedRoute';
import CompareBar from './components/CompareBar';

function App() {
  return (
    <AuthProvider>
      <CompareProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <UserDashboardPage />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
               <ProtectedRoute adminOnly={true}>
                   <AdminDashboardPage />
               </ProtectedRoute>
            } />
            <Route path="/admin/products" element={
               <ProtectedRoute adminOnly={true}>
                   <AdminProductsPage />
               </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
               <ProtectedRoute adminOnly={true}>
                   <AdminUserManagementPage />
               </ProtectedRoute>
            } />
          </Routes>
          <CompareBar />
        </BrowserRouter>
      </CompareProvider>
    </AuthProvider>
  );
}

export default App;