// Format a number as Nigerian naira, e.g. 3500 -> ₦3,500
export const naira = (amount) => '₦' + Number(amount || 0).toLocaleString('en-NG');

// Short unique id, e.g. for order numbers
export const uid = (prefix = '') =>
  prefix + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();

// "Ada Obi" -> "AO"
export const initials = (name = '') =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || '').join('') || '🙂';

// Turn a password into a SHA-256 hash so the plain password is never stored.
// (Demo-level security: real apps hash passwords on a server.)
export async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Nigerian phone numbers: 080..., 070..., 081..., 090..., 091... or +234...
export const isNigerianPhone = (phone) => /^(\+234|0)[789][01]\d{8}$/.test(phone.replace(/\s/g, ''));
