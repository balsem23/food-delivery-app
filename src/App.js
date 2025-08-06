import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import PizzaScrollShowcase from './components/PizzaScrollShowcase';
import Featured from './components/Featured';
import MenuSection from './components/MenuSection';
import CartPage from './pages/CartPage';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminProtectedRoute from './admin/AdminProtectedRoute';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import DeliveryLogin from './pages/delivery/DeliveryLogin';
import './index.css';
import BookMenu from './components/BookMenu';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <Router>
      {/* Global dark theme wrapper */}
      <div className="bg-[#0c0c0c] text-white font-sans min-h-screen">
        <Toaster position="top-center" />
        <Header />

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <div className="space-y-20">
                <Hero />
                <PizzaScrollShowcase /> {/* <- Scroll-triggered animated 3D pizzas */}
                <Featured />
                <MenuSection />
              </div>
            }
          />

          {/* Cart */}
          <Route path="/cart" element={<CartPage />} />

          {/* Admin Routes */}
          <Route path="/panel-entry-882x" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
<Route path="/menu" element={<BookMenu />} />
 
          {/* Delivery Routes */}
          <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
          <Route path="/delivery/login" element={<DeliveryLogin />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
