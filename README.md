# 🛡️ FOREnX — AI Digital Evidence & Case Management Platform

FOREnX is an enterprise-grade digital forensic evidence and case management platform designed for forensic investigators, law enforcement units, and security analysts. It features verified ISO/IEC 27037 chain-of-custody tracking, cryptographic SHA-256 integrity checks, automated forensic pattern matching, and Gemini AI-powered evidence analysis.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` (or use the pre-created `.env`):
```bash
cp .env.example .env
```
Open `.env` and optionally set your Gemini API key:
```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here   # Optional for basic forensics, required for AI OCR/summaries
JWT_SECRET=your_jwt_secret_key
```
> **Tip:** You can obtain a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser. Vite Hot-Module Replacement (HMR) is active.

---

## 📦 Production Build & Run

To build and run the optimized production bundle locally:

```bash
# 1. Build frontend and bundle backend
npm run build

# 2. Run the production server
npm start
```

To clean build artifacts:
```bash
npm run clean
```

---

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)
```bash
docker compose up --build -d
```
Access the application at `http://localhost:3000`. To stop:
```bash
docker compose down
```

### Using Plain Docker
```bash
# Build the image
docker build -t forenx-app .

# Run the container
docker run -d -p 3000:3000 \
  -e GEMINI_API_KEY="your_api_key" \
  -e JWT_SECRET="your_jwt_secret" \
  --name forenx_container forenx-app
```

---

## ☁️ Cloud Deployment Guides

### 1. Render (1-Click Deployment)
This repository includes a `render.yaml` blueprint.
1. Connect your repository to [Render](https://render.com/).
2. Select **New > Blueprint** and choose this repository.
3. Add the `GEMINI_API_KEY` in your environment variables dashboard.
4. Render will automatically build (`npm install && npm run build`) and start (`npm start`).

### 2. Railway
1. Create a new project on [Railway](https://railway.app/).
2. Deploy from GitHub repository.
3. In the Railway Variables tab, configure `PORT` (Railway provides this automatically), `GEMINI_API_KEY`, and `JWT_SECRET`.

### 3. Google Cloud Run
```bash
gcloud run deploy forenx-app \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="your_key",NODE_ENV="production"
```

### 4. Heroku / Dokku / CapRover
A `Procfile` is pre-configured:
```
web: npm start
```
Configure environment variables using `heroku config:set GEMINI_API_KEY="your_key"`.

---

## ⚙️ Environment Variables Reference

| Variable | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `PORT` | Optional | `3000` | Port on which the HTTP server listens (injected automatically by cloud hosts) |
| `NODE_ENV` | Optional | `development` | Environment mode (`development` or `production`) |
| `GEMINI_API_KEY` | Optional | `""` | Google Gemini API key for AI summaries and crime scene photo OCR |
| `JWT_SECRET` | Optional | *(random default)* | Secret key used to sign and verify operator session JWT tokens |
| `APP_URL` | Optional | `http://localhost:3000` | Public URL where the application is hosted |

---

## 🔍 Health Check & Monitoring

- **Endpoint**: `GET /api/health` or `GET /health`
- **Response**:
```json
{
  "status": "ok",
  "uptime": 124,
  "timestamp": "2026-10-15T08:52:06.819Z",
  "env": "production"
}
```
This endpoint is actively used by Docker's `HEALTHCHECK` probe and cloud load balancers.

---

## 👥 Default Operator Accounts (Pre-Seeded)

For testing and demonstration, pre-seeded accounts are readily available in the login modal:
- **Senior Forensic Director**: `r.miller@forenx.gov` (FRX-901, Role: `ADMIN`)
- **Lead Cybercrime Investigator**: `m.patel@forenx.gov` (FRX-412, Role: `INVESTIGATOR`)
- **Forensic AI Analyst**: `s.chen@forenx.gov` (FRX-605, Role: `INVESTIGATOR`)
- **Judicial Oversight Liaison**: `j.wilson@oversight.gov` (FRX-108, Role: `VIEWER`)
