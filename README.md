
  <h1>
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mahfojulemridul/Charity-Website/main/client/public/logo.png">
      <img alt="Charity MERN" src="https://raw.githubusercontent.com/mahfojulemridul/Charity-Website/main/client/public/logo.png" height="48">
    </picture>
    Charity MERN · Bridge Hope & Impact
  </h1>

  <p>
    <strong>A full‑stack donation platform connecting donors with causes that matter.</strong>
    <br />
    Built with MongoDB, Express, React & Node.js — featuring campaign management,
    NGO geo‑locator, multi‑step requests, and a glass‑morphism dark‑first UI.
  </p>

  <p>
    <a href="#-features"><strong>Explore the docs »</strong></a>
    &nbsp;&nbsp;·&nbsp;&nbsp;
    <a href="https://mahfojulemridul.github.io/Charity-Website/" target="_blank"><strong>Live Demo »</strong></a>
    &nbsp;&nbsp;·&nbsp;&nbsp;
    <a href="#-quick-start"><strong>Get Started »</strong></a>
  </p>

  <p>
    <a href="https://github.com/mahfojulemridul/Charity-Website/actions/workflows/ci.yml">
      <img alt="CI" src="https://github.com/mahfojulemridul/Charity-Website/actions/workflows/ci.yml/badge.svg">
    </a>
    <a href="https://github.com/mahfojulemridul/Charity-Website/actions/workflows/deploy-frontend.yml">
      <img alt="Deploy Frontend" src="https://github.com/mahfojulemridul/Charity-Website/actions/workflows/deploy-frontend.yml/badge.svg">
    </a>
    <img alt="Node" src="https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white">
    <img alt="MIT" src="https://img.shields.io/badge/license-MIT-blue">
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen">
  </p>

---

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Directory Structure](#-directory-structure)
- [Quick Start](#-quick-start)
- [Environment Configuration](#-environment-configuration)
- [API Reference](#-api-reference)
- [Project Roadmap](#-project-roadmap)
- [Deployment](#-deployment)
- [CI/CD](#-cicd)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Users
| Feature | Details |
|---|---|
| JWT-based auth | Register, login, auto‑renew; 7‑day token expiry |
| Role management | `donor` (default) & `admin` roles with protected routes |
| Profile management | Edit avatar, name, phone, address; sub‑pages for security, payments, notifications |

### 💰 Campaigns & Donations
| Feature | Details |
|---|---|
| Campaign CRUD | Create, list, view, close campaigns with goal tracking |
| Progress bars | Real‑time `raised / goal` visualisation with percentage |
| Donation history | Per‑user record of all past donations with campaign context |
| Category browser | 11 categories (Blood, Food, Clothes, Medicine, Fund, Education, Gifts, Electronics, Furniture, Environment, NGOs) |

### 🗺️ NGO Locator
- Interactive **Leaflet** map with OpenStreetMap tiles
- Search & filter NGOs by name or service category
- Geo‑location (“Locate Me”) with automatic map centering
- Marker popups with contact & navigation links

### 📝 Multi‑Step Request Flow
- 3‑step wizard: **Details → Items → Review**
- Urgency classification (Low / Medium / High)
- Status tracking (open → in_progress → resolved)

### 🎨 UI / UX
- **Dark‑first** theme with full light‑mode toggle, persisted in `localStorage`
- **Glass‑morphism** design: `backdrop-filter: blur()`, semi‑transparent cards, gradient accents
- **Responsive** — optimised for desktop, tablet, and mobile (breakpoints at 900 px, 500 px, 480 px)
- **Animated background** — cycling radial gradients + keyframe animations (shimmer, pulse, riseUp, heartbeat)
- Phosphor icons throughout; Outfit + Plus Jakarta Sans typography

### 🌐 Footer & Community
- Live impact stats ticker (hearts ❤, funds raised, NGOs supported)
- Newsletter subscription (simulated)
- Social links: Twitter, Instagram, Facebook, LinkedIn
- “Blockchain Tracing Verified” badge

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite 5, React Router DOM 6 (HashRouter) |
| **Backend** | Node.js, Express 4, Mongoose 8 |
| **Database** | MongoDB (local or Atlas) |
| **Auth** | JSON Web Tokens (`jsonwebtoken` + `bcryptjs`) |
| **Maps** | Leaflet (`react-leaflet`) |
| **Icons** | Phosphor Icons (`@phosphor-icons/web`) |
| **Styling** | Pure CSS (global `styles.css` + `responsive.css`) |
| **File Uploads** | Multer |
| **HTTP Logger** | Morgan |
| **Dev Tooling** | Nodemon, Concurrently |
| **CI / CD** | GitHub Actions (CI + GitHub Pages deploy) |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Browser (SPA)                         │
│  ┌───────────────┐   ┌──────────────┐   ┌────────────┐ │
│  │  HashRouter    │──▶│  AuthContext │──▶│  Protected │ │
│  │  (React DOM)   │   │  (JWT)      │   │  Routes    │ │
│  └───────┬───────┘   └──────┬───────┘   └─────┬──────┘ │
│          │                  │                  │        │
│  ┌───────▼──────────────────▼──────────────────▼──────┐ │
│  │  API Layer (client/src/api/)                       │ │
│  │  http.js (fetch + Bearer token)                    │ │
│  └───────┬────────────────────────────────────────────┘ │
└──────────┼──────────────────────────────────────────────┘
           │  HTTP (REST JSON)
┌──────────▼──────────────────────────────────────────────┐
│  Express Server (:5000)                                 │
│  ┌────────────┐  ┌────────────┐  ┌───────────────────┐ │
│  │  Routes    │──▶│Controllers │──▶│ Mongoose Models  │ │
│  │  (REST)    │   │  (logic)   │   │  (schema/ODM)   │ │
│  └────────────┘  └────────────┘  └────────┬──────────┘ │
│  ┌─────────────────────────────────────────┼──────────┐ │
│  │  Middleware: CORS · Morgan · JWT · Error│          │ │
│  └─────────────────────────────────────────┼──────────┘ │
└──────────────────────────────────────────────┼──────────┘
                                               │
                                    ┌──────────▼──────────┐
                                    │    MongoDB Atlas     │
                                    │  (or local instance) │
                                    └─────────────────────┘
```

### Design Decisions

| Decision | Rationale |
|---|---|
| **HashRouter** over BrowserRouter | Enables seamless GitHub Pages deployment without a custom 404 handler on the static host |
| **Mock API layer** (client‑side) | Currently simulates server responses with `setTimeout` — server routes exist and are ready for connection; this decouples frontend development from backend availability |
| **Pure CSS** over Tailwind / CSS‑in‑JS | Keeps dependencies minimal; CSS custom properties provide a full design‑system foundation |
| **Monorepo** with `concurrently` | One `npm run dev` starts both client (Vite) and server (Nodemon) — fast local iteration |
| **LocalStorage JWT** | Simple, stateless, and widely supported; suits the SPA model |

---

## 📁 Directory Structure

```
charity-website/
├── .eslintrc.json              # ESLint rules
├── .gitignore
├── package.json                # Root orchestrator (concurrently)
├── assets/                     # Brand images (splash, onboarding, icon)
│   ├── icons/
│   └── images/
├── client/                     # React frontend
│   ├── .env.example
│   ├── vite.config.js          # GH Pages‑aware base path
│   ├── public/
│   │   └── logo.png
│   └── src/
│       ├── main.jsx            # Entry — HashRouter + AuthProvider
│       ├── App.jsx             # Route declarations
│       ├── styles.css          # Global styles (1,658 lines)
│       ├── responsive.css      # Responsive overrides (252 lines)
│       ├── api/                # HTTP client + domain modules
│       │   ├── http.js         # fetch() wrapper + auth header
│       │   ├── client.js       # Barrel export
│       │   ├── auth.js         # register, login, me, updateProfile
│       │   ├── campaigns.js    # list, getById, create
│       │   ├── donations.js    # create, mine
│       │   ├── requests.js     # list, mine, create
│       │   └── uploads.js      # uploadImage
│       ├── components/         # Shared components
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   └── AuthContext.jsx # Auth state + localStorage JWT
│       ├── data/               # Mock data & fixtures
│       │   ├── mockData.js
│       │   └── mockCampaigns.js
│       ├── layouts/
│       │   └── AppLayout.jsx   # Nav + Routes + Footer
│       ├── pages/              # 19 page components
│       │   ├── HomePage.jsx
│       │   ├── SearchPage.jsx
│       │   ├── AllCategoriesPage.jsx
│       │   ├── CategoryDonationPage.jsx
│       │   ├── CampaignsPage.jsx
│       │   ├── CampaignDetailsPage.jsx
│       │   ├── NgoLocatorPage.jsx
│       │   ├── LoginPage.jsx / RegisterPage.jsx
│       │   ├── DashboardPage.jsx
│       │   ├── ProfilePage.jsx
│       │   ├── CreateRequestPage.jsx
│       │   ├── DonationHistoryPage.jsx
│       │   ├── NotificationsPage.jsx
│       │   ├── PaymentMethodsPage.jsx
│       │   ├── SecurityPage.jsx
│       │   ├── HelpSupportPage.jsx / ContactSupportPage.jsx
│       │   └── NotFoundPage.jsx
│       └── routes/
│           └── appRoutes.jsx
├── server/                     # Express backend
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── server.js           # Bootstrap (connect DB + listen)
│       ├── app.js              # Express app (middleware + routes)
│       ├── seed.js             # Seed admin + mock campaigns
│       ├── config/
│       │   └── db.js           # Mongoose connection
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── campaignController.js
│       │   ├── donationController.js
│       │   └── requestController.js
│       ├── middleware/
│       │   ├── auth.js         # JWT protect + role authorisation
│       │   └── error.js        # 404 handler + error handler
│       ├── models/
│       │   ├── User.js
│       │   ├── Campaign.js
│       │   ├── Donation.js
│       │   └── Request.js
│       └── routes/
│           ├── healthRoutes.js
│           ├── authRoutes.js
│           ├── campaignRoutes.js
│           ├── donationRoutes.js
│           ├── requestRoutes.js
│           └── uploadRoutes.js
└── .github/workflows/
    ├── ci.yml                  # Install + build on push/PR
    └── deploy-frontend.yml     # Deploy client to GitHub Pages
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or later
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1. Clone & Install

```bash
git clone https://github.com/mahfojulemridul/Charity-Website.git
cd charity-website
npm install
npm run install:all
```

### 2. Configure Environment

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Edit `server/.env` with your MongoDB URI and a strong JWT secret:

| Variable | Example | Purpose |
|---|---|---|
| `PORT` | `5000` | Server listening port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/charity_db` | MongoDB connection string |
| `JWT_SECRET` | `your-strong-secret-here` | Token signing key |
| `FRONTEND_URL` | `http://localhost:5173` | CORS origin |
| `ADMIN_NAME` | `Admin` | Seed admin name |
| `ADMIN_EMAIL` | `admin@charity.com` | Seed admin email |
| `ADMIN_PASSWORD` | `admin123` | Seed admin password |

### 3. Seed Database (Optional)

```bash
npm run seed
```

Creates an admin user and sample campaigns.

### 4. Start Development

```bash
npm run dev
```

| Service | URL |
|---|---|
| Client (Vite dev server) | `http://localhost:5173` |
| API (Express) | `http://localhost:5000/api` |

### 5. Verify

```bash
curl http://localhost:5000/api/health
# → {"status":"ok","timestamp":"..."}
```

### Default Admin Credentials

| Field | Value |
|---|---|
| Email | `admin@charity.com` |
| Password | `admin123` |

---

## 🌱 Environment Configuration

### Server (`server/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/charity_db
JWT_SECRET=replace_with_strong_secret
FRONTEND_URL=http://localhost:5173
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@charity.com
ADMIN_PASSWORD=admin123
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

> **⚠️ Security Note:** The server `.env` is gitignored. Never commit secrets. The example files (`.env.example`) are safe to commit.

---

## 📖 API Reference

All endpoints are prefixed with `/api`.

### Health

```
GET  /api/health         → { status: "ok", timestamp }
```

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | — | Register new user |
| `POST` | `/api/auth/login` | — | Login, returns JWT |
| `GET` | `/api/auth/me` | ✔ | Get current user |
| `PUT` | `/api/auth/profile` | ✔ | Update profile |

### Campaigns

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/campaigns` | — | List all campaigns |
| `POST` | `/api/campaigns` | ✔ | Create campaign |
| `GET` | `/api/campaigns/:id` | — | Get campaign by ID |
| `PUT` | `/api/campaigns/:id` | ✔ | Update campaign |
| `DELETE` | `/api/campaigns/:id` | ✔ | Delete campaign |

### Donations

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/donations` | ✔ | Record a donation |
| `GET` | `/api/donations/mine` | ✔ | My donation history |

### Requests

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/requests` | — | List all requests |
| `POST` | `/api/requests` | ✔ | Create request |
| `GET` | `/api/requests/mine` | ✔ | My requests |

### Uploads

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/upload` | ✔ | Upload image (Multer) |

---

## 🗺 Project Roadmap

- [x] JWT authentication & protected routes
- [x] Campaign CRUD & donation flow
- [x] NGO locator with Leaflet
- [x] Multi‑step request creation
- [x] Dark / light theme toggle
- [x] Responsive mobile layout
- [x] GitHub Pages deployment
- [ ] Connect client API layer to real server endpoints (currently mocked)
- [ ] Payment gateway integration (Stripe / SSLCommerz)
- [ ] Real‑time notifications (Socket.IO)
- [ ] Image upload to cloud (Cloudinary / S3)
- [ ] Admin dashboard with analytics
- [ ] Unit & integration tests (Vitest + Supertest)
- [ ] PWA support (service worker + offline)
- [ ] i18n / multi‑language support

---

## 🚢 Deployment

### GitHub Pages (Frontend)

The client is automatically deployed to GitHub Pages on every push to `main` via `.github/workflows/deploy-frontend.yml`.

Manual trigger:

```bash
gh workflow run deploy-frontend.yml
```

### Production Server

For the backend, deploy to any Node‑capable host (Render, Railway, Fly.io, DigitalOcean, etc.):

```bash
cd server
npm install
npm start
```

Ensure `MONGODB_URI` and `JWT_SECRET` are set as environment variables on the host.

---

## 🔄 CI/CD

Two GitHub Actions workflows:

### CI (`ci.yml`)
- **Trigger:** Push / PR to `main`
- **Steps:** Checkout → Node 20 → Install server deps → Install client deps → Build client → Server import smoke test

### Deploy Frontend (`deploy-frontend.yml`)
- **Trigger:** Push to `main` (manual dispatch also supported)
- **Steps:** Checkout → Node 20 → Install client deps → Build client → Configure Pages → Upload artifact → Deploy to Pages

---

## 🤝 Contributing

Contributions make the open‑source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:   new feature
fix:    bug fix
chore:  tooling, config, dependencies
docs:   documentation
refactor: code change that neither fixes a bug nor adds a feature
style:  formatting, missing semi-colons, etc.
test:   adding or updating tests
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

---

<p align="center">
  Built with ❤ by <a href="mailto:mahfojulemridul@gmail.com">flutter_project</a>
  <br />
  <sub>If this project helped you, consider giving it a ⭐!</sub>
</p>
