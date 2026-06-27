# Deploy tophbase on Railway

Supabase-compatible backend. No CLI, no Docker. Dev & MVP use only.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tophbase)

## About

tophbase is a Supabase-compatible backend you can deploy in one click — no Supabase CLI, no Docker, no external database to configure. It gives you a Postgres-compatible database with a REST API, Auth, Storage, and Edge Functions out of the box. Ideal for development and MVPs.

Deploying tophbase on Railway gives you a persistent, hosted backend with a public URL. Railway provisions the service from the tophbase GitHub repo, builds it via Docker, and mounts a persistent volume at `/app/.tophbase` so your data survives restarts and redeployments. The service exposes a Supabase-compatible API — you can point any Supabase JS client at it by swapping the `SUPABASE_URL` to your Railway domain and using the publishable key printed in the deploy logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| toph-base | [avocadocutter/toph-base](https://github.com/avocadocutter/toph-base) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TOPHBASE_HOST` | 0.0.0.0 |

## Configuration

- **Start command:** `node apps/orchestrator/dist/cli/tophbase.js freshman --port $PORT --migrations-dir /app/migrations`
- **Volume:** `/app/.tophbase`

**Category:** Starters · **Languages:** TypeScript, PLpgSQL, JavaScript, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/tophbase)
