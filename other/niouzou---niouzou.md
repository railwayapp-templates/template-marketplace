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
| `ADMIN_PASSWORD` | miniflux | (secret) |
| `ADMIN_USERNAME` | miniflux | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `JWT_SECRET` | refresh-worker | (secret) |
| `OPENROUTER_API_KEY` | refresh-worker | (secret) |
| `JWT_SECRET` | api | (secret) |
| `OPENROUTER_API_KEY` | api | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, TypeScript, CSS, Dockerfile, HTML, Mako, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/niouzou)
