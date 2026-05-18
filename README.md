<div align="center">

<br />

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./client/public/logo.png">
  <img alt="Charity MERN" src="./client/public/logo.png" width="100" height="100">
</picture>

# Charity MERN

### *Where Technology Meets Compassion — A Full‑Stack Donation Platform*

<br />

[![CI](https://img.shields.io/github/actions/workflow/status/mahfojulemridul/Charity-Website/ci.yml?label=CI&logo=githubactions&logoColor=white)](https://github.com/mahfojulemridul/Charity-Website/actions/workflows/ci.yml)
[![Deploy Frontend](https://img.shields.io/github/actions/workflow/status/mahfojulemridul/Charity-Website/deploy-frontend.yml?label=Deploy&logo=githubpages&logoColor=white)](https://github.com/mahfojulemridul/Charity-Website/actions/workflows/deploy-frontend.yml)
[![GitHub release](https://img.shields.io/github/v/release/mahfojulemridul/Charity-Website?logo=github)](https://github.com/mahfojulemridul/Charity-Website/releases)
[![Stars](https://img.shields.io/github/stars/mahfojulemridul/Charity-Website?style=flat&logo=github&color=yellow)](https://github.com/mahfojulemridul/Charity-Website/stargazers)
[![Forks](https://img.shields.io/github/forks/mahfojulemridul/Charity-Website?style=flat&logo=github)](https://github.com/mahfojulemridul/Charity-Website/forks)
<br />
[![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![JWT](https://img.shields.io/badge/JWT-auth-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white)](https://leafletjs.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat)](https://github.com/mahfojulemridul/Charity-Website/pulls)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

<br />

<a href="#-live-demo">🚀 Live Demo</a>
•
<a href="#-features-at-a-glance">✨ Features</a>
•
<a href="#-tech-stack">🛠 Stack</a>
•
<a href="#-quick-start-30-seconds">⚡ Quick Start</a>
•
<a href="#-api-reference">📖 API</a>
•
<a href="#-screenshots">📸 Gallery</a>
•
<a href="#-project-roadmap">🗺 Roadmap</a>

<br />

<blockquote>
  <strong>🌍 Every donation starts with a click. Every click changes a life.</strong><br />
  <sub>Campaign management · NGO geo‑locator · Multi‑step requests · Glass‑morphism UI</sub>
</blockquote>

<br />

</div>

---

## 📊 By the Numbers

<div align="center">

| 🏷️ Categories | 📦 Campaigns | 🗺️ NGOs Mapped | 👥 User Roles | 🌙 Dark / Light |
|:---:|:---:|:---:|:---:|:---:|
| **11** | **Unlimited** | **20+** | **Donor · Admin** | **Toggle** |
| Blood · Food · Clothes · Medicine · Fund · Education · Gifts · Electronics · Furniture · Environment · NGOs | Create & manage fundraising goals | Interactive Leaflet map with search & geolocation | JWT-protected routes & role-based access | Persisted in localStorage |

</div>

---

## 🎯 Why Charity MERN?

Because **building a donation platform should never be the barrier to making a difference.**

| Problem | Our Solution |
|---------|-------------|
| 😤 Too complex to set up | **One command: `npm run dev`** starts everything |
| 🎨 Looks outdated | **Glass‑morphism, dark‑first, fluid animations** — a UI people actually enjoy using |
| 🗺️ Hard to find local NGOs | **Built‑in Leaflet map** with geolocation & category filters |
| 📋 Requesting help is tedious | **3‑step wizard** — Details → Items → Review — under 2 minutes |
| 🔒 Security is an afterthought | **JWT auth, bcrypt, protected routes, role‑based access** from day one |
| 🚢 Deploying is a maze | **GitHub Actions CI/CD** → automatic deploy to GitHub Pages |

> **Whether you're a non‑profit looking for a digital presence, a developer wanting to contribute to open‑source social impact, or a team building the next great giving platform — Charity MERN is your launchpad.**

---

## ✨ Features at a Glance

<details>

<summary><strong>🔐 Authentication & User Management</strong> — <em>click to expand</em></summary>
<br />

| Feature | What it does |
|---------|-------------|
| **JWT Registration & Login** | Secure sign‑up/sign‑in with bcrypt‑hashed passwords |
| **7‑Day Auto‑Session** | Token persists in localStorage — no repeated logins |
| **Role‑Based Access** | `donor` (default) or `admin` — protected routes guard sensitive pages |
| **Full Profile Management** | Edit avatar, name, phone, address, security prefs, payment methods |
| **Sub‑Pages** | Notifications, Security (toggles), Help & Support, Contact Support |

</details>

<details>

<summary><strong>💰 Campaigns & Donations Engine</strong> — <em>click to expand</em></summary>
<br />

| Feature | What it does |
|---------|-------------|
| **Full CRUD Campaigns** | Create, list, view, update, close — with title, description, goal, image |
| **Live Progress Bars** | Real‑time `raised / goal` with percentage and animated fill |
| **Donation Recording** | Track donor, amount, message, campaign — full history per user |
| **11 Categories** | Blood · Food · Clothes · Medicine · Fund · Education · Gifts · Electronics · Furniture · Environment · NGOs |
| **Category Donation Page** | Offer items with name, description, quantity, address, image |

</details>

<details>

<summary><strong>🗺️ NGO Locator (Interactive Map)</strong> — <em>click to expand</em></summary>
<br />

| Feature | What it does |
|---------|-------------|
| **Leaflet + OpenStreetMap** | Interactive, zoomable, drag‑able — no API key required |
| **Search & Filter** | Find NGOs by name or service category |
| **Geo‑Location** | "Locate Me" button — auto‑centers on your position |
| **Marker Popups** | Contact details, category, "Navigate to NGO" link |

</details>

<details>

<summary><strong>📝 Multi‑Step Request Wizard</strong> — <em>click to expand</em></summary>
<br />

| Step | What you do |
|:----:|------------|
| **1. Details** | Title, description, category, urgency (Low / Medium / High) |
| **2. Items** | List what you need — quantities, descriptions |
| **3. Review** | Confirm everything, then submit |
| **Status** | Track progress: `open` → `in_progress` → `resolved` |

</details>

<details>

<summary><strong>🎨 UI / UX Design System</strong> — <em>click to expand</em></summary>
<br />

| Element | Detail |
|---------|--------|
| **Theme** | Dark‑first with full light mode — CSS variables across the board |
| **Glass‑morphism** | `backdrop-filter: blur(20px)`, semi‑transparent cards, gradient borders |
| **Animations** | Shimmer, pulse, riseUp, heartbeat, gradient flow — all CSS keyframes |
| **Typography** | Outfit (headings) + Plus Jakarta Sans (body) — loaded from Google Fonts |
| **Icons** | Phosphor Icons — every button, card, and nav item |
| **Responsive** | 3 breakpoints (900px, 500px, 480px) — mobile, tablet, desktop |
| **Background** | Cycling radial gradients that never feel static |

</details>

<details>

<summary><strong>🌐 Footer & Community Hub</strong> — <em>click to expand</em></summary>
<br />

- **Live Impact Stats** — animated ticker: hearts ❤, funds raised, NGOs supported
- **Newsletter Signup** — simulated subscription form
- **Social Links** — Twitter, Instagram, Facebook, LinkedIn
- **Blockchain Badge** — "Blockchain Tracing Verified" for trust signaling

</details>

---

## 🛠 Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![Phosphor Icons](https://img.shields.io/badge/Phosphor_Icons-FD366E?style=for-the-badge)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose_ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT_Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-003A70?style=for-the-badge)
![Multer](https://img.shields.io/badge/Multer-FF6600?style=for-the-badge)

### DevOps
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)
![Concurrently](https://img.shields.io/badge/Concurrently-2D72D9?style=for-the-badge)

</div>

---

## ⚡ Quick Start (30 Seconds)

```bash
# 1. Grab the code
git clone https://github.com/mahfojulemridul/Charity-Website.git
cd Charity-Website

# 2. Install everything
npm install && npm run install:all

# 3. Configure (copy & edit)
cp server/.env.example server/.env
cp client/.env.example client/.env

# 4. Seed some data
npm run seed

# 5. Launch!
npm run dev
```

<div align="center">

| 🔗 **Client** | 🔗 **API** |
|:---:|:---:|
| http://localhost:5173 | http://localhost:5000/api |

</div>

### Default Admin Login

```
Email:    admin@charity.com
Password: admin123
```

### Verify It Works

```bash
curl http://localhost:5000/api/health
# → {"status":"ok","timestamp":"2026-05-18T..."}
```

---

## 🌱 Environment Variables

### Server (`server/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | ✅ | `5000` | Server port |
| `MONGODB_URI` | ✅ | `mongodb://127.0.0.1:27017/charity_db` | MongoDB connection string |
| `JWT_SECRET` | ✅ | *(must set)* | Token signing secret — **use a strong random value in production** |
| `FRONTEND_URL` | ✅ | `http://localhost:5173` | CORS allowed origin |
| `ADMIN_NAME` | — | `Admin` | Seed admin name |
| `ADMIN_EMAIL` | — | `admin@charity.com` | Seed admin email |
| `ADMIN_PASSWORD` | — | `admin123` | Seed admin password |

### Client (`client/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:5000/api` | Backend API base URL |

---

## 📖 API Reference

All endpoints live under **`/api`**.

### 🩺 Health

```
GET /api/health  →  200 { status: "ok", timestamp }
```

### 🔐 Auth

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/api/auth/register` | — | Create a new account |
| `POST` | `/api/auth/login` | — | Sign in → returns JWT |
| `GET` | `/api/auth/me` | ✔ | Get current user profile |
| `PUT` | `/api/auth/profile` | ✔ | Update name, phone, address, avatar |

### 📢 Campaigns

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET` | `/api/campaigns` | — | List all campaigns |
| `POST` | `/api/campaigns` | ✔ | Create a new campaign |
| `GET` | `/api/campaigns/:id` | — | Get single campaign details |
| `PUT` | `/api/campaigns/:id` | ✔ | Update campaign |
| `DELETE` | `/api/campaigns/:id` | ✔ | Delete campaign |

### 💳 Donations

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/api/donations` | ✔ | Record a donation |
| `GET` | `/api/donations/mine` | ✔ | View personal donation history |

### 📋 Requests

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET` | `/api/requests` | — | List help requests |
| `POST` | `/api/requests` | ✔ | Submit a help request |
| `GET` | `/api/requests/mine` | ✔ | View my requests |

### 📤 Uploads

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/api/upload` | ✔ | Upload campaign/avatar image |

---

## 📸 Screenshots

<div align="center">

### 🏠 Home Page — Dark Theme

| | | |
|:---:|:---:|:---:|
| *Splash hero with animated gradient background* | *Category cards with dynamic colors* | *Featured campaigns with progress bars* |

### 🗺️ NGO Locator

| | |
|:---:|:---:|
| *Interactive Leaflet map with tagged markers* | *Search & filter sidebar + geolocation* |

### 📝 Multi‑Step Request Wizard

| | |
|:---:|:---:|
| *Step 1: Details* | *Step 2: Items* |

### 🌙 / ☀️ Theme Toggle

| Dark theme | Light theme |
|:---:|:---:|
| *Rich purples, blues, and glass cards* | *Clean whites with vibrant accents* |

</div>

> **💡 Tip:** Boot up the project locally to see the full experience — animations, map interactions, and theme transitions are best seen live.

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      🌐 BROWSER                          │
│  ┌──────────────┐  ┌───────────┐  ┌───────────────────┐  │
│  │  HashRouter   │  │  AuthCtx  │  │  ProtectedRoute   │  │
│  │  (React DOM)  │  │  (JWT)    │  │  (auth guard)     │  │
│  └──────┬───────┘  └─────┬─────┘  └────────┬──────────┘  │
│         │                │                 │              │
│  ┌──────▼────────────────▼─────────────────▼──────────┐  │
│  │           📡 API Layer (client/src/api/)            │  │
│  │   http.js (fetch + Authorization: Bearer <token>)   │  │
│  └──────────────────────┬──────────────────────────────┘  │
└─────────────────────────┼─────────────────────────────────┘
                          │  HTTPS / REST JSON
┌─────────────────────────▼─────────────────────────────────┐
│                      🖥️ SERVER                            │
│  ┌──────────┐   ┌────────────┐   ┌────────────────────┐   │
│  │  Routes   │──▶│Controllers │──▶│  Mongoose Models    │   │
│  │  (REST)   │   │  (logic)   │   │  (User, Campaign,  │   │
│  │           │   │            │   │   Donation, Request)│   │
│  └──────────┘   └────────────┘   └────────┬───────────┘   │
│  ┌─────────────────────────────────────────┼────────────┐  │
│  │  Middleware: CORS · Morgan · JWT · Error│            │  │
│  └─────────────────────────────────────────┼────────────┘  │
└────────────────────────────────────────────┼───────────────┘
                                             │
                              ┌──────────────▼──────────────┐
                              │        🗄️ MONGODB            │
                              │   (Atlas or local instance)  │
                              └─────────────────────────────┘
```

### Key Design Decisions

| Decision | Why |
|----------|-----|
| **HashRouter** | GitHub Pages deploy — no custom 404 fallback needed |
| **Mock API layer** | Frontend devs work independently; server routes are ready to connect |
| **Pure CSS** | Zero dependency weight; CSS custom properties = full design system |
| **Monorepo + concurrently** | `npm run dev` → both Vite + Nodemon in one terminal |
| **localStorage JWT** | Simple, stateless, no cookie dependency |

---

## 🔄 CI/CD

### Continuous Integration

```yaml
# .github/workflows/ci.yml
on: [push, pull_request] → main
steps: Install → Build client → Server smoke test
```

### Automatic Deploy

```yaml
# .github/workflows/deploy-frontend.yml
on: push → main
steps: Install → Build → GitHub Pages deploy
```

**Frontend:** Auto‑deployed to GitHub Pages on every `main` push.  
**Backend:** Deploy manually to Railway / Render / Fly.io / DigitalOcean.

```bash
# Manual frontend deploy trigger
gh workflow run deploy-frontend.yml
```

---

## 🗺 Project Roadmap

### ✅ Completed

- [x] JWT authentication (register, login, protected routes)
- [x] Campaign CRUD with progress bars
- [x] Donation recording & history
- [x] NGO locator with Leaflet + geolocation
- [x] Multi‑step request wizard
- [x] Dark / light theme toggle (persisted)
- [x] Responsive mobile layout (3 breakpoints)
- [x] GitHub Pages CI/CD pipeline
- [x] Glass‑morphism design system

### 🚧 In Progress

- [ ] Connect client API layer to live server (currently mocked)
- [ ] Payment gateway integration (Stripe / SSLCommerz)
- [ ] Real‑time notifications via Socket.IO

### 🔮 Planned

- [ ] Admin analytics dashboard
- [ ] Image upload to cloud (Cloudinary / S3)
- [ ] Unit & integration tests (Vitest + Supertest)
- [ ] PWA support (service worker, offline, add‑to‑home)
- [ ] Internationalisation (i18n) — English + Bengali
- [ ] Email notifications (Nodemailer)
- [ ] Docker support (`Dockerfile` + `docker-compose.yml`)

---

## 🤝 Contributing

**We ❤️ contributors.** Whether you're fixing a typo, adding a feature, or improving docs — you're welcome.

### Quick Start for Contributors

1. **Fork** the repo
2. **Create** a branch: `git checkout -b feat/your-idea`
3. **Commit** with [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add stripe payment integration
   fix: resolve NGO marker duplication
   docs: update API reference
   ```
4. **Push** & open a Pull Request

### What We Need Help With

| Area | Description |
|------|-------------|
| 💳 Payments | Stripe / SSLCommerz checkout integration |
| 📸 Cloud Uploads | Replace Multer local storage with Cloudinary / S3 |
| 🧪 Tests | Unit tests (Vitest) + API integration tests (Supertest) |
| 🌍 i18n | Translation files for English + Bengali |
| ⚡ PWA | Service worker, manifest, offline support |
| 🐳 Docker | Production Dockerfile + docker-compose |

---

## 🌟 Acknowledgements

- **Icons** — [Phosphor Icons](https://phosphoricons.com/)
- **Maps** — [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/)
- **Fonts** — [Outfit](https://fonts.google.com/specimen/Outfit) + [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts
- **Framework** — Built with [React](https://react.dev), bootstrapped by [Vite](https://vitejs.dev)

---

## 📄 License

**MIT** — Free to use, modify, and distribute. See [`LICENSE`](./LICENSE) for details.

---

<div align="center">

<br />

### ⭐ **If this project inspired you, give it a star — it means the world to us!**

<br />

```
 _____ _   _   _   _  __    __  _   _   _____  _____  _   _ 
|  ___| | | | | \ | | \ \  / / | \ | | |  __ \|_   _|| \ | |
| |__ | |_| | |  \| |  \ \/ /  |  \| | | |__) | | |  |  \| |
|  __|| _  | | . ` |   \  /   | . ` | |  ___/  | |  | . ` |
| |__ | | | | | |\  |   / /    | |\  | | |     _| |_ | |\  |
|____||_| |_| |_| \_|  /_/     |_| \_| |_|    |_____||_| \_|
                                                              
```

**Built with ❤ by [MD.MAHFUJUL KARIM SHEIKH](mailto:mahfojulemridul@gmail.com)**  
*Every line of code is a chance to change a life.*

<br />

</div>
