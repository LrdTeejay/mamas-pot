import { useEffect } from 'react';
import { Navigate, NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function AppLayout() {
  const { totals, setDrawerOpen } = useCart();
  const { pathname } = useLocation();

  // Start every page at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main className="page">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <CartDrawer />
      <nav className="bottom-nav" aria-label="Mobile navigation">
        <NavLink to="/menu"><span>🍽️</span>Menu</NavLink>
        <button type="button" onClick={() => setDrawerOpen(true)}>
          <span>🛒</span>Cart ({totals.count})
        </button>
        <NavLink to="/orders"><span>🧾</span>Orders</NavLink>
        <NavLink to="/profile"><span>👤</span>Profile</NavLink>
      </nav>
    </>
  );
}

// Logged-in users who open /login or /signup go straight to the menu
function GuestOnly({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/menu" replace /> : children;
}

export default function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? '/menu' : '/login'} replace />} />
      <Route path="/signup" element={<GuestOnly><Signup /></GuestOnly>} />
      <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />

      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/menu" element={<Dashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
