# 🚀 SecureNet - Fullstack Security Tools App

## Features
- 🔐 User Auth (Register/Login JWT)
- 🔑 Password Strength Analyzer
- 🌐 Phishing URL Detector  
- 📊 Personal Scan History
- 🛡️ Prod-ready: Helmet, Rate-limit, CORS, MongoDB Atlas

## Quick Start (Local)

1. **Env Setup** (use `.env.example` as template)
   ```
   MONGO_URI=your_atlas_uri_from_task
   JWT_SECRET=supersecretkey123
   ```

2. **Install**
   ```
   npm install
   ```

3. **Dev (Parallel Backend+Frontend)**
   ```
   npm run dev
   ```
   - Backend API: http://localhost:5000/api/health
   - Frontend React: http://localhost:5173 (proxies /api to backend)

4. **Prod Build & Run**
   ```
   npm run build  # Builds React to client/dist
   npm start      # Serves React + API on 5000
   ```

## Project Structure
```
SecureNet/
├── server.js         # Express API + static serve
├── client/           # Vite + React UI
├── public/           # Fallback static page
├── controllers/      # API logic
├── models/           # Mongoose schemas
├── routes/           # Express routes
├── .env.example      # Template
└── vercel.json       # Vercel config
```

## Deployment

### Option 1: Single Vercel Deploy (Recommended - Fullstack)
```
vercel --prod
```
- Set env vars in Vercel dashboard: MONGO_URI, JWT_SECRET
- Auto-builds React, server.js serves dist + API

### Option 2: Backend Render + Frontend Vercel
- Backend: Render.com (Node), set env vars
- Frontend: Vercel root=client, VITE_API_URL=https://your-backend.onrender.com/api

### Option 3: Separate Frontend Vercel
```
cd client
vercel --prod
```
Set VITE_API_URL=your-backend-url/api

## API Endpoints (Swagger-like in public/index.html)
- POST /api/register {name,email,password}
- POST /api/login {email,password}
- POST /api/check-password {password} (auth)
- POST /api/check-url {url} (auth)  
- GET /api/history (auth)

## Tech Stack
- Backend: Express, Mongoose, MongoDB Atlas
- Frontend: React 18 + Vite + Tailwind CSS
- Deploy: Vercel Serverless / Render

✅ **All fixed! Backend crash-free, React UI, deployments ready.**

⭐ Star on GitHub: https://github.com/imayesshha/SecureNet

