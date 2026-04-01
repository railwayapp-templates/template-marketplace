# Deploy Affine with AI Copilot on Railway

One-click template for AFFiNE with optional AI (NVIDIA NIM/Google Gemini)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/affine-with-ai-copilot)

## About

AFFiNE is an open-source alternative to Notion and Miro that combines documents, whiteboards, and databases in one workspace. This template deploys AFFiNE with optional AI Copilot powered by NVIDIA NIM or Google Gemini for chat, writing assistance, summarization, and code generation.

AI Copilot is enabled by simply providing an NVIDIA NIM or Google Gemini API key — the template auto-generates AFFiNE's config.json at startup to route all AI tasks through your chosen provider. No AI key is required for basic functionality.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | [polats/railway-affine](https://github.com/polats/railway-affine) | Database |
| affine | [polats/railway-affine](https://github.com/polats/railway-affine) | Web service |
| redis | [polats/railway-affine](https://github.com/polats/railway-affine) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | postgres | 5432 |
| `POSTGRES_DB` | postgres | affine |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `POSTGRES_INITDB_ARGS` | postgres | --data-checksums |
| `PORT` | affine | 3010 |
| `NODE_ENV` | affine | production |
| `REDIS_SERVER_PORT` | affine | 6379 |
| `AFFINE_SERVER_PORT` | affine | 3010 |
| `NVIDIA_NIM_API_KEY` | affine | (secret) |
| `GOOGLE_GEMINI_API_KEY` | affine | (secret) |
| `AFFINE_INDEXER_ENABLED` | affine | false |
| `PORT` | redis | 6379 |

## Configuration

- **Start command:** `docker-entrypoint.sh postgres -c listen_addresses=*`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'node ./scripts/self-host-predeploy.js && node ./dist/main.js'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.affine`
- **Start command:** `redis-server --bind 0.0.0.0 :: --port 6379`

**Category:** Starters · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/affine-with-ai-copilot)
