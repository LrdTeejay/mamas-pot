import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

// Left panel shared by the Login and Signup pages
export function AuthHero() {
  return (
    <section className="auth-hero">
      <div className="brand" style={{ color: '#fff' }}>
        <span className="brand-logo">🍲</span> Mama's Pot
      </div>
      <div>
        <div className="hero-plates" aria-hidden="true">
          <span>🍛</span><span>🍢</span><span>🍹</span><span>🥘</span>
        </div>
        <h1>Naija flavour, delivered hot.</h1>
        <p>Jollof, egusi, suya, puff-puff and chilled zobo. Order in minutes and pay securely.</p>
      </div>
      <small style={{ opacity: 0.8 }}>Open daily, 8am to 10pm</small>
    </section>
  );
}

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      const user = await login(form);
      showToast(`Welcome back, ${user.name.split(' ')[0]}! 👋`, 'success');
      // Send them back to the page they tried to open, or the menu
      navigate(location.state?.from || '/menu', { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <AuthHero />
      <section className="auth-side">
        <div className="auth-card">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-sub">Log in to continue your order.</p>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email"
                placeholder="you@example.com" value={form.email} onChange={handleChange} />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input id="password" name="password" type={showPass ? 'text' : 'password'}
                  autoComplete="current-password" placeholder="Your password"
                  value={form.password} onChange={handleChange} />
                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && <p className="field-error" role="alert">{error}</p>}

            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Logging in…' : 'Log in'}
            </button>
          </form>

          <p className="auth-switch">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
