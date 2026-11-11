import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { load, save } from '../utils/storage';
import { uid } from '../utils/format';
import { DELIVERY_FEE, FREE_DELIVERY_FROM } from '../data/menu';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const cartKey = user ? `mp_cart_${user.email}` : null;
  const ordersKey = user ? `mp_orders_${user.email}` : null;

  const [cart, setCart] = useState(() => (cartKey ? load(cartKey, []) : []));
  const [orders, setOrders] = useState(() => (ordersKey ? load(ordersKey, []) : []));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Load this user's cart and orders whenever the logged-in user changes
  useEffect(() => {
    setCart(cartKey ? load(cartKey, []) : []);
    setOrders(ordersKey ? load(ordersKey, []) : []);
    setDrawerOpen(false);
  }, [cartKey, ordersKey]);

  // Change the cart AND save it in one step, so one user's cart
  // can never be written into another user's storage key
  function updateCart(fn) {
    setCart((prev) => {
      const next = fn(prev);
      if (cartKey) save(cartKey, next);
      return next;
    });
  }

  function addToCart(line) {
    updateCart((prev) => {
      const existing = prev.find((l) => l.lineId === line.lineId);
      if (existing) {
        return prev.map((l) => (l.lineId === line.lineId ? { ...l, qty: l.qty + line.qty } : l));
      }
      return [...prev, line];
    });
  }

  function changeQty(lineId, delta) {
    updateCart((prev) =>
      prev
        .map((l) => (l.lineId === lineId ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    );
  }

  const removeLine = (lineId) => updateCart((prev) => prev.filter((l) => l.lineId !== lineId));
  const clearCart = () => updateCart(() => []);

  const totals = useMemo(() => {
    const count = cart.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = cart.reduce((sum, l) => sum + l.unitPrice * l.qty, 0);
    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
    return { count, subtotal, delivery, total: subtotal + delivery };
  }, [cart]);

  // Called after a successful payment (or a pay-on-delivery order)
  function placeOrder({ details, reference }) {
    const order = {
      id: uid('MP-'),
      reference,
      items: cart,
      ...totals,
      details,
      createdAt: new Date().toISOString(),
    };
    const next = [order, ...orders];
    setOrders(next);
    if (ordersKey) save(ordersKey, next);
    clearCart();
    return order;
  }

  return (
    <CartContext.Provider
      value={{ cart, orders, totals, drawerOpen, setDrawerOpen, addToCart, changeQty, removeLine, clearCart, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
