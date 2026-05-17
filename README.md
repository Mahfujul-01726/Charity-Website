# CHARITY MERN Web App

A full-stack Charity platform built with MongoDB, Express, React, and Node.js.

## Features

- JWT authentication (register, login, current user)
- Campaign listing and campaign details
- Create campaigns from dashboard
- Donate to campaigns and track personal donation history
- Search page with quick tags and campaign/category results
- Donation category modules (blood, food, clothes, medicine, fund, education, gifts, electronics, furniture, environment)
- NGO locator module (map placeholder + nearby organizations list)
- Multi-step request creation flow (Details, Items, Review)
- Profile modules: notifications, payment methods, security, help and support, contact support
- Responsive modern UI for desktop and mobile
- Flutter-matching color system (purple, blue, cyan, pink, orange, dark glass cards)

## Tech Stack

- Frontend: React + Vite + React Router
- Backend: Node.js + Express + MongoDB + Mongoose
- Auth: JWT + protected routes

## Project Structure

- client: React web app
- server: Express API and MongoDB models

## Prerequisites

- Node.js 18+
- MongoDB local instance or MongoDB Atlas connection

## Setup

1. Go to project folder:

```bash
cd charity
```

2. Install all dependencies:

```bash
npm install
npm run install:all
```

3. Configure environment variables:

- Copy server/.env.example to server/.env
- Copy client/.env.example to client/.env

Example server/.env:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/charity_db
JWT_SECRET=replace_with_strong_secret
FRONTEND_URL=http://localhost:5173
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@charity.com
ADMIN_PASSWORD=admin123
```

Example client/.env:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Seed admin user (optional):

```bash
npm run seed
```

5. Start frontend and backend together:

```bash
npm run dev
```

- Client: http://localhost:5173
- API: http://localhost:5000/api

## API Quick Check

Health endpoint:

- GET http://localhost:5000/api/health

## Default Admin (if seeded)

- Email: admin@charity.com
- Password: admin123

## Notes

- Donations in this starter are recorded as successful test transactions.
- You can later integrate Stripe, SSLCommerz, or any payment gateway.

## Development & CI

- **Run locally:**

```bash
npm install
npm run install:all
npm run dev
```

- **Build client for production:**

```bash
npm run build --prefix client
```

- **CI:** A simple GitHub Actions workflow (`.github/workflows/ci.yml`) installs dependencies and builds the client on push/PR to `main`.

## Repository Notes

- A backup of the original pre-clean history is preserved in the branch `backup/pre-clean-main`.
- The project was reorganized: `client/` and `server/` live at repository root for clarity.
- If you still see a leftover `mern-web/` wrapper folder, it can be safely removed; close any running Node/Vite/VSCode processes and delete the folder.

