# Deploy Buffet - Modern Starter for Bun on Railway

Full-stack type safe template: Bun + Effect + ElysiaJS + Svelte

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/buffet-modern-starter-for-bun)

## About

Buffet is a small full‑stack starter built with Bun, Effect, Elysia, and Svelte. It ships with auth (Better Auth), SQLite via Drizzle, typed RPC with Eden Treaty, and a simple “thoughts” UI. It’s meant as a practical base you can quickly adapt to your own app.

Buffet runs as a single Bun service that serves both the API and the Svelte SPA. In production it builds the client bundle, serves static assets with compression, runs SQLite migrations on startup, and uses preconfigured auth/database environment variables so it works on Railway with no extra setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Server | [a-rebets/buffet](https://github.com/a-rebets/buffet) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DB_PATH` | /data/app.db | Where database is persisted |
| `BUN_PUBLIC_DOMAIN` | - | Where API is pointed to |
| `BETTER_AUTH_SECRET` | (secret) | Auth server secret |

## Configuration

- **Healthcheck:** `/auth/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** Svelte, TypeScript, CSS, HTML

[View on Railway →](https://railway.com/template/buffet-modern-starter-for-bun)
