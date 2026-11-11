import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { naira } from '../utils/format';
import { FREE_DELIVERY_FROM } from '../data/menu';

export default function CartDrawer() {
  const { cart, totals, drawerOpen, setDrawerOpen, changeQty, removeLine } = useCart();
  const navigate = useNavigate();
  const close = () => setDrawerOpen(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setDrawerOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setDrawerOpen]);

  const toFree = FREE_DELIVERY_FROM - totals.subtotal;

  return (
    <>
      {drawerOpen && <div className="drawer-overlay" onClick={close} />}
      <aside className={`drawer ${drawerOpen ? 'open' : ''}`} aria-label="Your cart" aria-hidden={!drawerOpen}>
        <div className="drawer-header">
          <h2 style={{ fontSize: '1.4rem' }}>Your cart</h2>
          <button className="icon-btn" onClick={close} aria-label="Close cart">✕</button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty">
              <div className="empty-emoji">🍽️</div>
              <p>Your cart is empty. Pick something from the menu to get started.</p>
              <button className="btn btn-outline btn-sm" style={{ marginTop: 14 }}
                onClick={() => { close(); navigate('/menu'); }}>
                Browse the menu
              </button>
            </div>
          ) : (
            cart.map((line) => (
              <div className="cart-item" key={line.lineId}>
                <div className="cart-item-emoji">{line.emoji}</div>
                <div>
                  <h4>{line.name}</h4>
                  {line.summary && <p className="cart-item-opts">{line.summary}</p>}
                  {line.note && <p className="cart-item-opts">📝 {line.note}</p>}
                  <div className="qty" style={{ marginTop: 6 }}>
                    <button onClick={() => changeQty(line.lineId, -1)} aria-label="Decrease quantity">−</button>
                    <span>{line.qty}</span>
                    <button onClick={() => changeQty(line.lineId, 1)} aria-label="Increase quantity">+</button>
                  </div>
                </div>
                <div className="cart-item-right">
                  <strong>{naira(line.unitPrice * line.qty)}</strong>
                  <button className="btn-ghost" style={{ fontSize: '0.8rem' }}
                    onClick={() => removeLine(line.lineId)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            {toFree > 0 && (
              <p className="demo-hint" style={{ margin: 0 }}>
                Add {naira(toFree)} more for <strong>free delivery</strong> 🛵
              </p>
            )}
            <div className="summary-row"><span>Subtotal</span><span>{naira(totals.subtotal)}</span></div>
            <div className="summary-row">
              <span>Delivery</span><span>{totals.delivery ? naira(totals.delivery) : 'Free'}</span>
            </div>
            <div className="summary-row total"><span>Total</span><span>{naira(totals.total)}</span></div>
            <button className="btn btn-primary btn-block" onClick={() => { close(); navigate('/checkout'); }}>
              Go to checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
