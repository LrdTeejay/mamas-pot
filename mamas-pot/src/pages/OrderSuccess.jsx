import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { naira } from '../utils/format';

export default function OrderSuccess() {
  const { id } = useParams();
  const { orders } = useCart();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="center">
        <p>We can't find that order. It may belong to another account.</p>
        <Link className="btn btn-primary" to="/orders">See my orders</Link>
      </div>
    );
  }

  const paidOnline = order.details.method === 'paystack';

  return (
    <div className="success panel">
      <div className="success-icon">✅</div>
      <h1>Thank you, {order.details.name.split(' ')[0]}!</h1>
      <p className="muted" style={{ margin: '8px 0 20px' }}>
        {paidOnline ? 'Payment received.' : 'Pay the rider when your food arrives.'} Delivery takes about 30 to 45 minutes.
      </p>

      <div className="success-details">
        <div className="summary-row"><span>Order number</span><strong>{order.id}</strong></div>
        <div className="summary-row"><span>{paidOnline ? 'Payment reference' : 'Reference'}</span><span>{order.reference}</span></div>
        <div className="summary-row"><span>Deliver to</span><span>{order.details.area}</span></div>
        <div className="summary-row total"><span>Total</span><span>{naira(order.total)}</span></div>
      </div>

      <div className="success-actions">
        <Link className="btn btn-primary" to="/orders">Track order</Link>
        <Link className="btn btn-outline" to="/menu">Order more</Link>
      </div>
    </div>
  );
}
