import { createContext, useContext, useState } from 'react';
import { load, save, remove } from '../utils/storage';
import { hashPassword } from '../utils/format';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => load('mp_users', []));
  const [user, setUser] = useState(() => {
    const email = load('mp_session', null);
    return load('mp_users', []).find((u) => u.email === email) || null;
  });

  const persistUsers = (next) => {
    setUsers(next);
    save('mp_users', next);
  };

  async function signup({ name, email, phone, password }) {
    const cleanEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email === cleanEmail)) {
      throw new Error('An account with this email already exists. Log in instead.');
    }
    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      address: '',
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString(),
    };
    persistUsers([...users, newUser]);
    save('mp_session', cleanEmail);
    setUser(newUser);
    return newUser;
  }

  async function login({ email, password }) {
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email === cleanEmail);
    const hash = await hashPassword(password);
    if (!found || found.passwordHash !== hash) {
      throw new Error('Incorrect email or password.');
    }
    save('mp_session', cleanEmail);
    setUser(found);
    return found;
  }

  function logout() {
    remove('mp_session');
    setUser(null);
  }

  function updateProfile(fields) {
    const updated = { ...user, ...fields };
    persistUsers(users.map((u) => (u.email === user.email ? updated : u)));
    setUser(updated);
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
