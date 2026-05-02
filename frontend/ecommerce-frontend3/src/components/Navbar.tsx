import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CartDrawer } from './CartDrawer';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-brand">🛍 ShopAZ</Link>
        <div className="nav-links">
          <Link to="/">Məhsullar</Link>
          {user && <Link to="/orders">Sifarişlər</Link>}
        </div>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-user">👋 {user.fullName.split(' ')[0]}</span>
              <button className="btn-ghost" onClick={handleLogout}>Çıxış</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Giriş</Link>
              <Link to="/register" className="btn-primary">Qeydiyyat</Link>
            </>
          )}
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            🛒 <span className="cart-count">{count}</span>
          </button>
        </div>
      </nav>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};