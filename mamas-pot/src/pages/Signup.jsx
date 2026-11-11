import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { isNigerianPhone } from '../utils/format';
import { AuthHero } from './Login';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASS_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter a valid email address, like you@example.com.';
  if (!isNigerianPhone(f.phone)) e.phone = 'Enter a Nigerian number, like 0803 123 4567.';
  if (!PASS_RE.test(f.password)) e.password = 'Use 8 or more characters with letters and numbers.';
  if (f.confirm !== f.password) e.confirm = 'Passwords do not match.';
  return e;
}

export default function Signup() {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined }); // clear that field's error while typing
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      const user = await signup({ ...form, phone: form.phone.replace(/\s/g, '') });
      showToast(`Account created. Welcome, ${user.name.split(' ')[0]}! 🎉`, 'success');
      navigate('/menu', { replace: true });
    } catch (err) {
      setErrors({ email: err.message });
      setLoading(false);
    }
  }

  // Small helper so every field looks the same
  const field = (name, label, props = {}) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} value={form[name]} onChange={handleChange}
        className={errors[name] ? 'invalid' : ''} aria-invalid={!!errors[name]} {...props} />
      {errors[name] && <span className="field-error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="auth-page">
      <AuthHero />
      <section className="auth-side">
        <div className="auth-card">
          <h2 className="auth-title">Create your account</h2>
          <p className="auth-sub">It takes less than a minute.</p>

          <form className="form" onSubmit={handleSubmit} noValidate>
            {field('name', 'Full name', { placeholder: 'Adaeze Okafor', autoComplete: 'name' })}
            {field('email', 'Email', { type: 'email', placeholder: 'you@example.com', autoComplete: 'email' })}
            {field('phone', 'Phone number', { type: 'tel', placeholder: '0803 123 4567', autoComplete: 'tel' })}

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input id="password" name="password" type={showPass ? 'text' : 'password'}
                  placeholder="At least 8 characters" autoComplete="new-password"
                  value={form.password} onChange={handleChange}
                  className={errors.password ? 'invalid' : ''} aria-invalid={!!errors.password} />
                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            {field('confirm', 'Confirm password', {
              type: showPass ? 'text' : 'password', placeholder: 'Type it again', autoComplete: 'new-password',
            })}

            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
