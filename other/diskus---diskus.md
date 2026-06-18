# Deploy diskus on Railway

An ultra-lightweight, privacy-first, and self-hosted Disqus alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/diskus)

## About

Diskus is a lightweight, open-source, self-hosted comments system and privacy-respecting Disqus alternative for modern websites, blogs, documentation sites, and web applications. With a small embeddable widget, Shadow DOM CSS isolation, multi-tenant site management, Markdown support, moderation tools, social login, and a centralized admin dashboard, Diskus helps you add fast and modern comments to any website.

Deploying Diskus on Railway gives you a simple way to host your own open-source comment platform without managing server configuration manually. This Railway template deploys the Diskus Backend API and Dashboard Frontend with pre-configured environment variables, start commands, and persistent storage for SQLite data. After deployment, you can create your first admin account, register a website, generate an App ID, and embed the lightweight Diskus comment widget into your blog, documentation site, or web application. Diskus is built with Bun, Hono, Preact, Drizzle ORM, and SQLite for a fast, minimal, and self-hosted commenting experience.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | [fadhilbarkah/diskus](https://github.com/fadhilbarkah/diskus) | Web service |
| frontend | [fadhilbarkah/diskus](https://github.com/fadhilbarkah/diskus) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_URL` | backend | - | REQUIRED for OAuth. The public root URL of your backend API (e.g., https://api.yourdomain.com). This is used to construct the correct redirect callback URLs for Google and GitHub. |
| `DEMO_MODE` | backend | - | Set to true to enable “Read-Only” mode for the admin dashboard. Useful for public live demos. Visitors can still post comments, but dashboard users cannot delete or modify data. |
| `SMTP_FROM` | backend | - | The sender address (e.g., "Diskus <noreply@yourdomain.com>"). |
| `SMTP_HOST` | backend | - | The SMTP server host (e.g., smtp.gmail.com). |
| `SMTP_PASS` | backend | - | Your SMTP password or App Password. |
| `SMTP_PORT` | backend | - | The port for your SMTP server. |
| `SMTP_USER` | backend | (secret) | Your SMTP username or email. |
| `JWT_SECRET` | backend | (secret) | A secure, random string used to sign authentication tokens. In production, using a weak default secret will cause the server to refuse to start. |
| `API_BASE_URL` | backend | - | The public URL of your backend API. Used to construct verification links in emails. |
| `DATABASE_PATH` | backend | - | The absolute or relative path to the SQLite database file. |
| `DASHBOARD_ORIGIN` | backend | - | A comma-separated list of allowed origins that can access the Admin API (e.g., https://admin.yourdomain.com). Prevents unauthorized cross-origin requests. |
| `GITHUB_CLIENT_ID` | backend | - | Your GitHub OAuth App Client ID. |
| `GOOGLE_CLIENT_ID` | backend | - | Your Google OAuth 2.0 Client ID. |
| `GITHUB_CLIENT_SECRET` | backend | (secret) | Your Google OAuth 2.0 Client Secret. |
| `GOOGLE_CLIENT_SECRET` | backend | (secret) | Your GitHub OAuth App Client Secret. |
| `PORT` | frontend | - | 	The port the backend API listens on. |
| `VITE_API_URL` | frontend | - | 	The base API route the frontend should use. Required during the build step. |

## Configuration

- **Start command:** `bun run start:backend`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** TypeScript, CSS, Shell, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/diskus)
