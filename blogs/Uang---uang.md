# Deploy Uang on Railway

Deploy and Host Uang with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uang)

## About

Uang is a self-hosted, single-household personal finance app. It tracks accounts
(assets and liabilities), investment holdings, and multi-currency balances with
FX, charts net worth over time, and plans savings goals with projections. A
Bun/ElysiaJS API with an embedded SQLite (libSQL) database backs a React
single-page web app.

Hosting Uang means running two services from one monorepo: a Bun/ElysiaJS API and
a static React (Vite) front end served by nginx. The API persists everything in an
embedded SQLite (libSQL) database on a mounted volume, runs Drizzle migrations
automatically on boot, and handles authentication with better-auth using secure
session cookies. The two services are wired together through Railway reference
variables, so the front end knows the API's URL and CORS/cookies work across both
HTTPS domains. A generated 32-character auth secret and a persistent volume are
provisioned for you, and both services can sleep when idle to keep a low-traffic,
personal deployment inexpensive.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Uang App | [azizsafudin/uang](https://github.com/azizsafudin/uang) (root: /) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | production | - |
| `DATABASE_URL` | file:/data/uang.db | SQLite file |
| `BETTER_AUTH_SECRET` | (secret) | - |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/data`

**Category:** Blogs · **Languages:** TypeScript, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/uang)
