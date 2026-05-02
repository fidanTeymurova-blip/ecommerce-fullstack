import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

interface Props { isOpen: boolean; onClose: () => void; }

export const CartDrawer = ({ isOpen, onClose }: Props) => {
  const { items, removeFromCart, updateQty, clearCart, total } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState('');
  const [ordering, setOrdering] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOrder = async () => {
    if (!user) { alert('Sifariş vermək üçün giriş edin.'); return; }
    if (items.length === 0) return;
    setOrdering(true);
    try {
      await api.post('/orders', {
        items: items.map(i => ({ productId: i.product.id, quantity: i.quantity })),
        address
      });
      clearCart();
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onClose(); }, 2000);
    } catch {
      alert('Sifariş zamanı xəta baş verdi.');
    } finally {
      setOrdering(false);
    }
  };

  return (
    <>
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>🛒 Səbət</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {success ? (
          <div className="order-success">✅ Sifarişiniz qəbul edildi!</div>
        ) : items.length === 0 ? (
          <div className="cart-empty">Səbət boşdur</div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.product.id} className="cart-item">
                  <img src={item.product.imageUrl || 'https://placehold.co/60x60'} alt={item.product.name} />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.product.name}</p>
                    <p className="cart-item-price">{item.product.price} ₼</p>
                  </div>
                  <div className="cart-item-qty">
                    <button onClick={() => updateQty(item.product.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.product.id)}>🗑</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <input
                className="address-input"
                placeholder="Çatdırılma ünvanı..."
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <div className="cart-total">Cəmi: <strong>{total.toFixed(2)} ₼</strong></div>
              <button className="btn-order" onClick={handleOrder} disabled={ordering}>
                {ordering ? 'Göndərilir...' : '✓ Sifariş Ver'}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};