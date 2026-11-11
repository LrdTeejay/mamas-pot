import { useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { isNigerianPhone, naira, uid } from '../utils/format';

const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const AREAS = ['Ikeja', 'Lekki', 'Victoria Island', 'Yaba', 'Surulere', 'Ajah', 'Ikorodu', 'Festac', 'Gbagada', 'Maryland'];

export default function Checkout() {
  const { user, updateProfile } = useAuth();
  const { cart, totals, placeOrder } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const placed = useRef(false);

  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address || '',
    area: AREAS[0],
    instructions: '',
  });
  const [method, setMethod] = useState('paystack');
  const [saveAddress, setSaveAddress] = useState(true);
  const [errors, setErrors] = useState({});
  const [paying, setPaying] = useState(false);

  // Nothing to pay for? Send them back to the menu.
  if (cart.length === 0 && !placed.current) return <Navigate to="/menu" replace />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  function validate() {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Enter the receiver's name.";
    if (!isNigerianPhone(form.phone)) e.phone = 'Enter a Nigerian number, like 0803 123 4567.';
    if (form.address.trim().length < 8) e.address = 'Enter a full address with house number and street.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function finishOrder(reference) {
    placed.current = true;
    if (saveAddress) updateProfile({ address: form.address.trim(), phone: form.phone.trim() });
    const order = placeOrder({ details: { ...form, method }, reference });
    showToast('Order placed. The kitchen is on it 🔥', 'success');
    navigate(`/order-success/${order.id}`, { replace: true });
  }

  function payWithPaystack() {
    if (!window.PaystackPop) {
      showToast('Payment could not load. Check your internet connection and refresh.', 'error');
      return;
    }
    if (!PAYSTACK_KEY || !PAYSTACK_KEY.startsWith('pk_')) {
      showToast('Paystack key missing. Add VITE_PAYSTACK_PUBLIC_KEY to .env, or choose Pay on delivery.', 'error');
      return;
    }
    setPaying(true);
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: user.email,
      amount: totals.total * 100, // naira -> kobo
      currency: 'NGN',
      ref: uid('MPPAY-'),
      metadata: {
        custom_fields: [
          { display_name: 'Customer', variable_name: 'customer', value: form.name },
          { display_name: 'Phone', variable_name: 'phone', value: form.phone },
          { display_name: 'Area', variable_name: 'area', value: form.area },
        ],
      },
      // Plain functions here: Paystack expects regular (non-async) callbacks
      callback: function (response) {
        finishOrder(response.reference);
      },
      onClose: function () {
        setPaying(false);
        showToast('Payment cancelled. Your cart is still saved.');
      },
    });
    handler.openIframe();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    if (method === 'paystack') payWithPaystack();
    else finishOrder(uid('POD-')); // pay on delivery
  }

  return (
    <>
      <Link to="/menu" className="back-link">← Back to menu</Link>
      <h1 className="page-title">Checkout</h1>

      <form className="checkout-grid" onSubmit={handleSubmit} noValidate>
        <section className="panel">
          <h2>Delivery details</h2>
          <div className="form">
            <div className="row-2">
              <div className="field">
                <label htmlFor="name">Receiver's name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange}
                  className={errors.name ? 'invalid' : ''} autoComplete="name" />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                  className={errors.phone ? 'invalid' : ''} autoComplete="tel" />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="address">Delivery address</label>
              <input id="address" name="address" placeholder="House number, street, landmark"
                value={form.address} onChange={handleChange} className={errors.address ? 'invalid' : ''}
                autoComplete="street-address" />
              {errors.address && <span className="field-error">{errors.address}</span>}
            </div>

            <div className="row-2">
              <div className="field">
                <label htmlFor="area">Area</label>
                <select id="area" name="area" value={form.area} onChange={handleChange}>
                  {AREAS.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="instructions">Rider instructions</label>
                <input id="instructions" name="instructions" placeholder="e.g. Call at the gate"
                  value={form.instructions} onChange={handleChange} />
              </div>
            </div>

            <label className="checkbox-row">
              <input type="checkbox" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} />
              Save this address to my profile
            </label>

            <h2 style={{ marginTop: 10, marginBottom: 0 }}>Payment method</h2>
            <div className="pay-methods">
              <button type="button" className={`pay-method ${method === 'paystack' ? 'selected' : ''}`}
                onClick={() => setMethod('paystack')} aria-pressed={method === 'paystack'}>
                <strong>💳 Pay online</strong>
                <p>Card, bank transfer or USSD with Paystack</p>
              </button>
              <button type="button" className={`pay-method ${method === 'delivery' ? 'selected' : ''}`}
                onClick={() => setMethod('delivery')} aria-pressed={method === 'delivery'}>
                <strong>💵 Pay on delivery</strong>
                <p>Cash or transfer to the rider</p>
              </button>
            </div>
          </div>
        </section>

        <aside className="panel sticky">
          <h2>Order summary</h2>
          {cart.map((l) => (
            <div className="mini-item" key={l.lineId}>
              <span>{l.emoji} {l.qty} × {l.name}</span>
              <span>{naira(l.unitPrice * l.qty)}</span>
            </div>
          ))}
          <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
            <div className="summary-row"><span>Subtotal</span><span>{naira(totals.subtotal)}</span></div>
            <div className="summary-row">
              <span>Delivery</span><span>{totals.delivery ? naira(totals.delivery) : 'Free'}</span>
            </div>
            <div className="summary-row total"><span>Total</span><span>{naira(totals.total)}</span></div>
            <button className="btn btn-primary btn-block" disabled={paying} style={{ marginTop: 8 }}>
              {paying ? 'Waiting for payment…' : method === 'paystack' ? `Pay ${naira(totals.total)}` : 'Place order'}
            </button>
            <p className="pay-note">🔒 Paystack handles your card details. This app never sees them.</p>
          </div>
        </aside>
      </form>
    </>
  );
}
