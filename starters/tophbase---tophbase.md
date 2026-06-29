# Deploy tophbase on Railway

Supabase-compatible backend. No CLI, no Docker. Iterate MVP ideas faster

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tophbase)

## About

I love Supabase. But spinning it up locally means Docker, a heavy CLI, and a cloud account before you can do anything. tophbase gives you a Supabase-compatible backend in one click: no CLI, no Docker, no external database. Postgres, REST API, Auth, Storage, and a built-in dashboard.

![tophbase dashboard](https://raw.githubusercontent.com/avocadocutter/toph-base/main/screenshot.png)

Deploying tophbase on Railway gives you a persistent, hosted backend with a public URL. Railway provisions the service from the tophbase GitHub repo, builds it via Docker, and mounts a persistent volume at `/app/.tophbase` so your data survives restarts and redeployments. Point any Supabase JS client at it by swapping `SUPABASE_URL` to your Railway domain and using the publishable key printed in the deploy logs.

To move to real Supabase later, run `npx tophbase graduate --provider supabase`. It migrates your schema and data over.

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
