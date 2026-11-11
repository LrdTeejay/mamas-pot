import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { initials } from '../utils/format';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totals, setDrawerOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleLogout() {
    if (!window.confirm("Log out of Mama's Pot?")) return;
    logout();
    showToast('Logged out. See you soon! 👋');
    navigate('/login', { replace: true });
  }

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/menu" className="brand">
          <span className="brand-logo">🍲</span> Mama's Pot
        </Link>

        <nav className="nav-links" aria-label="Main">
          <NavLink to="/menu" className="nav-link">Menu</NavLink>
          <NavLink to="/orders" className="nav-link">My orders</NavLink>
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button className="icon-btn cart-btn" onClick={() => setDrawerOpen(true)} aria-label="Open cart">
            🛒
            {totals.count > 0 && <span className="badge" key={totals.count}>{totals.count}</span>}
          </button>

          <Link to="/profile" className="avatar" title={user?.name}>{initials(user?.name)}</Link>

          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </header>
  );
}
