# Deploy Errsole on Railway

Logger For Node.js With Dashboard To View, Filter, And Search Your App Logs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/errsole)

## About

Errsole is an open-source Node.js logger with a built-in web dashboard. It collects console logs, stores them in PostgreSQL, and lets you view, filter, and search them with authentication and team management. This template self-hosts a **standalone Errsole dashboard** on Railway — the dashboard process plus Postgres — so every app in the project can write logs to the same database while one public service serves the UI.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/errsole)

Hosting Errsole on Railway means two containers on the private network: a public dashboard (`errsole`) and a private PostgreSQL 17 database (`postgres`). Railway terminates TLS at the edge, so the dashboard listens on HTTP `0.0.0.0:${PORT}` (default 8080). The entrypoint waits for Postgres over IPv6 private DNS, Errsole creates its tables (`errsole_logs_v3`, `errsole_users`, `errsole_config`, `errsole_notifications`) on first boot, then optionally seeds `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Attach one volume on Postgres at `/var/lib/postgresql` before the first successful start. After deploy, open the public URL, sign in, and point your Node apps at the same `DATABASE_URL` with `enableDashboard: false`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | [OpenSource-Templates/Errsole](https://github.com/OpenSource-Templates/Errsole) (root: /postgres) | Database |
| errsole | [OpenSource-Templates/Errsole](https://github.com/OpenSource-Templates/Errsole) (root: /errsole) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | errsole | Database name. Keep in sync with DATABASE_URL. |
| `POSTGRES_USER` | postgres | (secret) | Database role. Keep in sync with DATABASE_URL. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password. Referenced by errsole. |
| `DOMAIN` | errsole | - | Public domain where Betterlytics is accessible. Railway automatically provides this domain. |
| `APP_NAME` | errsole | errsole | Name shown in the dashboard and stored with logs. |
| `ADMIN_NAME` | errsole | Admin | Display name for the seeded admin user. |
| `ADMIN_EMAIL` | errsole | admin@example.com | First dashboard admin email. Change this before first boot. |
| `DATABASE_URL` | errsole | - | Private Postgres URL over IPv6 DNS. |
| `ERRSOLE_PATH` | errsole | / | Dashboard base path. |
| `ADMIN_PASSWORD` | errsole | (secret) | Auto-generated admin password. Copy it from Variables after deploy. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/errsole)
