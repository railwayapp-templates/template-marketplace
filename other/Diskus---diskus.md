# Deploy Diskus on Railway

An ultra-lightweight, privacy-first, and self-hosted Disqus alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/diskus)

## About

Diskus is a lightweight, self-hosted commenting platform featuring a ~2KB embed script, native Shadow DOM CSS isolation, multi-site management, spam protection, and complete data ownership. Built with Bun, Hono, and Preact, Diskus offers a modern alternative to Disqus without ads, trackers, or performance overhead.

Hosting Diskus on Railway gives you a complete commenting platform that you fully control. The deployment includes a backend API, an administrative dashboard, and a lightweight embeddable widget that can be integrated into blogs, documentation sites, portfolios, company websites, and web applications.

Unlike traditional commenting services that rely on heavy client-side scripts and third-party tracking, Diskus focuses on privacy, performance, and simplicity. The widget runs inside a native Shadow DOM for complete CSS isolation while maintaining a tiny footprint that minimizes impact on Core Web Vitals. Railway handles the infrastructure, allowing you to deploy, scale, and manage Diskus without worrying about server administration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | [fadhilbarkah/diskus](https://github.com/fadhilbarkah/diskus) | Web service |
| frontend | [fadhilbarkah/diskus](https://github.com/fadhilbarkah/diskus) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JWT_SECRET` | backend | (secret) | A long, random secret string used to securely sign authentication tokens. |
| `DATABASE_PATH` | backend | /app/data/sqlite.db | The file path to the database file |
| `DASHBOARD_ORIGIN` | backend | - | (Optional) The allowed origin for the dashboard CORS policy. Leave empty to allow all origins, or set to your frontend URL (e.g., https://diskus.up.railway.app) |
| `PORT` | frontend | - | The port on which the Nginx server listens. Railway requires this to be set to 80 for Dockerfile deployments. |
| `VITE_API_URL` | frontend | - | The absolute URL of your backend API service (e.g., https://diskus-backend.up.railway.app/api/v1). This is required for the dashboard to communicate with the server. |

## Configuration

- **Start command:** `cd backend && bun run db:migrate && bun run src/index.ts`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** TypeScript, CSS, Shell, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/diskus)
