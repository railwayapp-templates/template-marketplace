# Deploy blinko on Railway

AI-powered notes with RAG chat and persistent Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/blinko)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/blinko)

> **Canonical code:** `blinko` — deploy URL: https://railway.com/new/template/blinko

![OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-blinko/main/og-image.svg)

Blinko is an AI-powered, card-based note-taking app with RAG (Retrieval-Augmented Generation). Capture ideas, chat with your notes, and let AI help you connect thoughts — all self-hosted on Railway.

Blinko runs as a two-service stack on Railway:

- **`blinko`** — the main app container (port 1111)
- **`postgres`** — a sibling PostgreSQL 16 (Alpine) container, mounted with a volume so your notes and AI embeddings persist across deploys

Railway provides the compute, TLS at the edge, and a public URL. The Blinko service restarts automatically on failures. The Postgres service stores all data with persistent volume storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:16-alpine` | Database |
| blinko | `blinkospace/blinko:1.8.8` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | blinko | Initial database created on first boot. MUST match the database name in Blinko's DATABASE_URL (path component: /blinko). |
| `POSTGRES_USER` | postgres | (secret) | Postgres superuser name. Used as the credential prefix in Blinko's DATABASE_URL. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres password. Default literal 'postgres' chosen so marketplace first-time deploys authenticate against Blinko's literal DATABASE_URL out of the box. Rotate this in the dashboard AND update Blinko's DATABASE_URL to match before going to production. |
| `PORT` | blinko | 1111 | Container port. Defaults to 1111 (blinko's internal listener). When blank, Railway auto-injects. |
| `DATABASE_URL` | blinko | postgresql://postgres:postgres@postgres.railway.internal:5432/blinko | PostgreSQL connection string. Defaults to a literal credential matched against the sibling postgres service's POSTGRES_PASSWORD. For production, rotate POSTGRES_PASSWORD in the postgres service AND update this URL to match (path component /blinko is the database name created by POSTGRES_DB). |
| `NEXTAUTH_URL` | blinko | - | Public URL of your Blinko instance. Required for auth callbacks. The https:// prefix is mandatory — RAILWAY_PUBLIC_DOMAIN resolves to the bare domain only. |
| `NEXTAUTH_SECRET` | blinko | (secret) | Random secret for authentication encryption. Auto-generated on first deploy. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/blinko)
