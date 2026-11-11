import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="center container">
      <div style={{ fontSize: '4rem' }}>🍽️</div>
      <h1>This page doesn't exist</h1>
      <p className="muted">Check the address, or go back to the menu.</p>
      <Link to="/" className="btn btn-primary">Go to the menu</Link>
    </div>
  );
}
