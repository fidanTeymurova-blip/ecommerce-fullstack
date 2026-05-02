import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import type { Order } from '../types';
import { useAuth } from '../context/AuthContext';

const statusLabel: Record<string, string> = {
  '0': '⏳ Gözləyir', '1': '✅ Təsdiqləndi',
  '2': '🚚 Yolda', '3': '📦 Çatdırıldı', '4': '❌ Ləğv edildi',
  Pending: '⏳ Gözləyir', Confirmed: '✅ Təsdiqləndi',
  Shipped: '🚚 Yolda', Delivered: '📦 Çatdırıldı', Cancelled: '❌ Ləğv edildi'
};

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.get('/orders')
      .then(r => setOrders(r.data))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>Sifarişlərim</h1>
      </div>

      {loading ? <div className="loading">Yüklənir...</div>
        : orders.length === 0 ? (
          <div className="empty-state">📭 Hələ sifarişiniz yoxdur</div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">Sifariş #{order.id}</span>
                  <span className="order-status">{statusLabel[order.status] ?? order.status}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('az-AZ')}
                  </span>
                </div>
                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item-row">
                      <span>{item.productName}</span>
                      <span>{item.quantity} × {item.unitPrice} ₼</span>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  Cəmi: <strong>{order.totalAmount.toFixed(2)} ₼</strong>
                  {order.address && <span className="order-addr"> · 📍 {order.address}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};