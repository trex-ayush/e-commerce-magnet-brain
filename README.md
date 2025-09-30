# Ayush MERN E‑Commerce

A simple MERN e‑commerce app using DummyJSON products, JWT auth, cart + orders, and Stripe Checkout.

## Tech Stack
- Client: React + Vite + TailwindCSS
- Server: Node.js + Express + MongoDB (Mongoose)
- Payments: Stripe Checkout

## Prerequisites
- Node.js 18+ (or LTS)
- npm
- A MongoDB connection string
- Stripe account with test secret key

## Project Setup

### 1) Install dependencies
```bash
cd ../server && npm install
cd ../client && npm install
```

### 2) Environment variables (server/.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://USER:PASSWORD@CLUSTER/DBNAME?retryWrites=true&w=majority
JWT_SECRET=replace_with_strong_secret
ADMIN_KEY=replace_with_admin_key
STRIPE_SECRET_KEY=sk_test_xxx
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

### 3) Run
```bash
# Terminal 1
cd ../server
npm run dev

# Terminal 2
cd ../client
npm run dev
```

- Server: http://localhost:5000
- Client: http://localhost:5173

## Usage
1. Register or Login
2. Browse DummyJSON products
3. Add to cart, adjust quantities
4. Checkout via COD or Stripe
5. After Stripe, order is saved; view under Orders

## Notes
- If you see Not authorized on payments, ensure cookies are sent (credentials: include) and CORS origin matches.
- Restart the server after changing `.env`.
