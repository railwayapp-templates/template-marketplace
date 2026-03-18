# Deploy Restapify on Railway

Mock REST API powered by Restapify, perfect for testing and development.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/HK3yyB)

## About

# 🚀 Restapify Template

Easily deploy a [Restapify](https://restapify.vercel.app) mock API to [Railway](https://railway.app/) — perfect for testing and frontend development when your backend isn't ready yet.

---

## ⚙️ Getting Started

### 🔧 Local Development

1. Install dependencies:

```bash
npm install
yarn install
```

2. Start the mock server:

```bash
npm run start
yarn start
```

3. Open your browser:

- API base URL: [`http://localhost:6767/api/`](http://localhost:6767/api/)
- Dashboard: [`http://localhost:6767/restapify`](http://localhost:6767/restapify)

> The dashboard provides a UI to explore and test your mock endpoints.

---

## 📦 Environment Variables

You can configure the mock server behavior using environment variables via a `.env` file:

| Variable              | Default                 | Description                                               |
|-----------------------|-------------------------|-----------------------------------------------------------|
| `PORT`                | `6767`                  | Port where the server runs locally                        |
| `PUBLIC_PATH`         | `api/`                  | Base path for all mock routes                             |
| `PUBLIC_URL`          | `http://localhost:6767` | Full URL used in logs and dashboard links                 |
| `OPEN_DASHBOARD_PATH` | `true` (only if local)  | Open dashboard in browser when server starts (local only) |

### Example `.env` file:

```env
PORT=6767
PUBLIC_PATH=api/
PUBLIC_URL=http://localhost:6767
OPEN_DASHBOARD_PATH=true
```

> In Railway, `PUBLIC_URL` is set automatically via `RAILWAY_PUBLIC_DOMAIN` in most setups.

---

## 🌐 Example Routes Served

This template includes the following mocked endpoints:

```
GET    /api/me
GET    /api/posts
GET    /api/users
GET    /api/users/[userid]
POST   /api/users/[userid]
DELETE /api/users/[userid]
GET    /api/users/[userid]/comments
```

You can modify or extend these by editing the files in the `api/` directory.

---

## 🚀 Deploy to Railway

Once deployed:

- API: `https://your-subdomain.up.railway.app/api/`
- Dashboard: `https://your-subdomain.up.railway.app/restapify`

---

## 📚 Documentation

📖 [https://restapify.vercel.app/docs](https://restapify.vercel.app/docs)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Restapify | [rudemex/railway-restapify-template](https://github.com/rudemex/railway-restapify-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 6767 |
| `PUBLIC_PATH` | api/ |

## Configuration

- **Start command:** `npm run start`
- **Healthcheck:** `/api/me`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript

[View on Railway →](https://railway.com/template/HK3yyB)
