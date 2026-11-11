import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { initials, isNigerianPhone, naira } from '../utils/format';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { orders } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user.name, phone: user.phone, address: user.address || '' });

  const spent = orders.reduce((sum, o) => sum + o.total, 0);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function handleSave(e) {
    e.preventDefault();
    if (form.name.trim().length < 2) return showToast('Enter your full name.', 'error');
    if (!isNigerianPhone(form.phone)) return showToast('Enter a Nigerian number, like 0803 123 4567.', 'error');
    updateProfile({ name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() });
    showToast('Changes saved', 'success');
  }

  function handleLogout() {
    logout();
    showToast('Logged out. See you soon! 👋');
    navigate('/login', { replace: true });
  }

  return (
    <div className="profile-wrap">
      <section className="panel">
        <div className="profile-head">
          <div className="avatar">{initials(user.name)}</div>
          <div>
            <h1>{user.name}</h1>
            <p className="muted">{user.email}</p>
          </div>
        </div>
        <div className="row-2">
          <div className="stat"><span className="muted">Orders</span><strong>{orders.length}</strong></div>
          <div className="stat"><span className="muted">Total spent</span><strong>{naira(spent)}</strong></div>
        </div>
      </section>

      <form className="panel form" onSubmit={handleSave}>
        <h2 style={{ marginBottom: 0 }}>Personal details</h2>
        <div className="field">
          <label htmlFor="p-name">Full name</label>
          <input id="p-name" name="name" value={form.name} onChange={handleChange} autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="p-phone">Phone</label>
          <input id="p-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="p-address">Default delivery address</label>
          <input id="p-address" name="address" value={form.address} onChange={handleChange}
            placeholder="House number, street, landmark" autoComplete="street-address" />
        </div>
        <button className="btn btn-primary" style={{ justifySelf: 'start' }}>Save changes</button>
      </form>

      <section className="panel">
        <h2>Log out</h2>
        <p className="muted" style={{ marginBottom: 16 }}>
          Your cart and orders stay saved on this device for your next visit.
        </p>
        <button className="btn btn-outline" onClick={handleLogout}>🚪 Log out</button>
      </section>
    </div>
  );
}
