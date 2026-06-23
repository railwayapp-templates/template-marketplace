# Deploy niouzou on Railway

Self-hostable swipe news reader that learns your taste as you swipe

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/niouzou)

## About

Niouzou is a self-hostable, mobile-first news aggregator with a swipe interface.
You swipe through articles; the system learns your preferences from your likes
and dislikes and surfaces only what's relevant. Every article gets a relevance
score (0–100%) that updates as you swipe — your feed gets smarter the more you
use it.

Hosting Niouzou runs five coordinated services: a FastAPI backend, a React PWA,
a Miniflux RSS reader, a background refresh worker (RSS fetch + LLM enrichment +
local embeddings), and a PostgreSQL database with the pgvector extension. The
API and Miniflux share one Postgres instance across two databases; the API
auto-provisions the Miniflux schema, admin user, and access token on first boot,
and runs its own migrations from a pre-deploy step. This template wires all five
services together so the stack comes up ready to swipe — no manual key step.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| miniflux | `miniflux/miniflux:2.1.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| refresh-worker | [OuApps/niouzou](https://github.com/OuApps/niouzou) (root: /api) | Worker |
| api | [OuApps/niouzou](https://github.com/OuApps/niouzou) (root: /api) | Web service |
| pwa | [OuApps/niouzou](https://github.com/OuApps/niouzou) (root: /pwa) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | miniflux | 8080 |
| `CREATE_ADMIN` | miniflux | 1 |
| `ADMIN_PASSWORD` | miniflux | (secret) |
| `ADMIN_USERNAME` | miniflux | (secret) |
| `RUN_MIGRATIONS` | miniflux | 1 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | refresh-worker | 8000 |
| `JWT_SECRET` | refresh-worker | (secret) |
| `OMP_NUM_THREADS` | refresh-worker | 3 |
| `OPENROUTER_API_KEY` | refresh-worker | (secret) |
| `CRON_FETCH_INTERVAL` | refresh-worker | 30 |
| `EMBEDDING_NUM_THREADS` | refresh-worker | 3 |
| `PORT` | api | 8000 |
| `JWT_SECRET` | api | (secret) |
| `OPENROUTER_MODEL` | api | google/gemma-4-26b-a4b-it |
| `OPENROUTER_API_KEY` | api | (secret) |
| `PORT` | pwa | 3000 |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Healthcheck:** `/`

**Category:** Other · **Languages:** Python, TypeScript, CSS, Dockerfile, HTML, Mako, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/niouzou)
