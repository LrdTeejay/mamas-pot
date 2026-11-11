import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { naira } from '../utils/format';

// Simulated status based on minutes since the order was placed
function liveStatus(order, now) {
  const minutes = (now - new Date(order.createdAt).getTime()) / 60000;
  if (minutes < 10) return '👩🏾‍🍳 Preparing';
  if (minutes < 30) return '🛵 On the way';
  return '✅ Delivered';
}

export default function Orders() {
  const { orders, addToCart, setDrawerOpen } = useCart();
  const { showToast } = useToast();
  const [now, setNow] = useState(Date.now());

  // Refresh statuses every 30 seconds
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  function reorder(order) {
    order.items.forEach((line) => addToCart(line));
    showToast('Added the order to your cart', 'success');
    setDrawerOpen(true);
  }

  if (orders.length === 0) {
    return (
      <div className="empty">
        <div className="empty-emoji">🧾</div>
        <h2>No orders yet</h2>
        <p style={{ margin: '8px 0 18px' }}>Your orders will show here after checkout.</p>
        <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="page-title">My orders</h1>
      <div className="order-list">
        {orders.map((order) => (
          <article className="order-card" key={order.id}>
            <div className="order-head">
              <div>
                <strong>{order.id}</strong>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })}
                  {', '}{order.details.method === 'paystack' ? 'paid online' : 'pay on delivery'}
                </p>
              </div>
              <span className="status">{liveStatus(order, now)}</span>
            </div>
            {order.items.map((l) => (
              <div className="mini-item" key={l.lineId}>
                <span>
                  {l.emoji} {l.qty} × {l.name}
                  {l.summary && <small className="muted"> ({l.summary})</small>}
                </span>
                <span>{naira(l.unitPrice * l.qty)}</span>
              </div>
            ))}
            <div className="order-foot">
              <strong>Total: {naira(order.total)}</strong>
              <button className="btn btn-outline btn-sm" onClick={() => reorder(order)}>Reorder</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
