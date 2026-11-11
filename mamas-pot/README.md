# 🍲 Mama's Pot – Nigerian Food Ordering (React)

A frontend-only restaurant ordering app: sign up, log in, browse Nigerian foods, snacks and drinks,
pick options (portion, protein, swallow, extras, spice), manage a cart, check out with **Paystack**
(or pay on delivery), view order history, edit your profile and log out.

Built with **HTML, CSS, JavaScript and React 18** (Vite + React Router). No backend: accounts,
carts and orders are saved in each visitor's browser (`localStorage`).

## Features
- Sign up / log in with validation (Nigerian phone format, strong password), session kept after refresh
- Protected pages (menu, checkout, orders, profile)
- 30 menu items across Foods, Snacks and Drinks, priced in naira (₦)
- Search, category filters and sorting
- Options modal with live price, quantity and kitchen notes
- Slide-in cart drawer with free-delivery progress (free from ₦20,000)
- Checkout with delivery form, Paystack popup (card, transfer, USSD) or pay on delivery
- Order confirmation, order history with simulated live status, one-tap reorder
- Profile editing, stats and logout
- Light/dark mode, toasts, mobile bottom navigation, keyboard and screen-reader friendly

## Run it on your computer
```bash
npm install
cp .env.example .env      # then paste your Paystack TEST public key (pk_test_...)
npm run dev               # open http://localhost:5173
```
Get a free test key at paystack.com → Settings → API Keys & Webhooks. Never put a secret key (`sk_...`) in this project.

## Put it on GitHub and get a live link
1. Create an empty repository on GitHub named `mamas-pot` (no README).
2. In this folder run:
   ```bash
   git init
   git add .
   git commit -m "Mama's Pot: Nigerian food ordering app"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/mamas-pot.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. (For online payments) **Settings → Secrets and variables → Actions → New repository secret**:
   name `VITE_PAYSTACK_PUBLIC_KEY`, value your `pk_test_...` key. Then open the **Actions** tab and re-run the workflow.
5. When the workflow finishes (about 1–2 minutes), your live link is:
   ```
   https://YOUR-USERNAME.github.io/mamas-pot/
   ```
   It is also shown in the **Actions** run and under **Settings → Pages**. Share it with your friends.

Every later `git push` to `main` redeploys the site automatically.

**Alternative (manual deploy):** `npm run deploy` publishes the built site to a `gh-pages` branch;
then set **Settings → Pages → Source: Deploy from a branch → gh-pages / (root)**.

## Notes
- `localhost` links only work on your own computer; share the `github.io` link instead.
- Each friend creates their own account – data is stored per browser, not on a server.
- For a real business, add a backend to store users/orders and verify Paystack payments with the secret key.

## Project structure
```
src/
  main.jsx, App.jsx        entry point and routes
  styles/global.css        design system and all styles
  data/menu.js             foods, snacks, drinks, options, prices
  utils/                   formatting and storage helpers
  context/                 Auth, Cart, Theme, Toast state
  components/              Navbar, FoodCard, OptionsModal, CartDrawer, ProtectedRoute
  pages/                   Signup, Login, Dashboard, Checkout, OrderSuccess, Orders, Profile, NotFound
```
