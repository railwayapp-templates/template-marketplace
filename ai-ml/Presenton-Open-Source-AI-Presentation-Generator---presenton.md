# Deploy Presenton | Open Source AI Presentation Generator on Railway

Self-hosted AI presentation & slide generator with persistent storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/presenton)

## About

Presenton is an open-source, AI-powered presentation generator — a self-hosted
alternative to Gamma, Beautiful.ai, Decktopus and Presentations.ai. Describe a topic,
pick a template, and it writes and designs a full slide deck you can edit in the browser
and export to PPTX or PDF. It also exposes a generation API and an MCP endpoint.

This template runs Presenton with a **PostgreSQL database** and a **persistent volume**, so
your presentations, uploads and exports survive redeploys — bring your own LLM key
(OpenAI, Google Gemini, Anthropic, OpenRouter and others) or configure one from the in-app
settings after you log in.

Presenton ships as a single upstream container that runs an internal nginx in front of a
Next.js UI, a FastAPI backend and an MCP server, plus a bundled Chromium for PPTX/PDF export.
This template deploys that image **pinned to a fixed version** (never `latest`, so a redeploy
never swaps the app underneath you) and pairs it with two pieces of durable storage:

- **PostgreSQL** (a dedicated `postgres` service on its own volume) holds your accounts,
  presentations, templates and generation history. Presenton reads a standard `DATABASE_URL`
  and runs its migrations automatically on boot.
- **A mounted volume at `/app_data`** keeps every file asset — generated decks, PPTX/PDF
  exports, uploaded images and fonts. Presenton has no object-storage backend, so this volume
  *is* the persistence for everything that is not in the database.

The app has its own username/password authentication. On first visit you set the primary
administrator account — **do this immediately after deploying**, before sharing the URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:18.4-alpine` | Database |
| Presenton | `ghcr.io/presenton/presenton:v0.9.4-beta` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | presenton | Database name. |
| `POSTGRES_USER` | Postgres | (secret) | Database user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password. |
| `LLM` | Presenton | - | LLM provider: openai | google | anthropic. Leave empty and configure providers in-app after login. |
| `PORT` | Presenton | 80 | Internal nginx port. Do not change. |
| `DATABASE_URL` | Presenton | - | Postgres connection string (wired to the Postgres service). |
| `DB_WAIT_HOST` | Presenton | - | Postgres host the startup waits on. |
| `DB_WAIT_PORT` | Presenton | 5432 | Postgres port the startup waits on. Do not change. |
| `GOOGLE_MODEL` | Presenton | - | Gemini model, e.g. gemini-2.0-flash. |
| `OPENAI_MODEL` | Presenton | - | OpenAI model, e.g. gpt-4o. |
| `GOOGLE_API_KEY` | Presenton | (secret) | Google Gemini API key (used when LLM=google). |
| `OPENAI_API_KEY` | Presenton | (secret) | OpenAI API key (used when LLM=openai). |
| `PEXELS_API_KEY` | Presenton | (secret) | Optional Pexels API key for stock images in slides. |
| `ANTHROPIC_MODEL` | Presenton | - | Anthropic model, e.g. claude-3-5-sonnet-latest. |
| `CAN_CHANGE_KEYS` | Presenton | true | Allow editing LLM / API keys from the in-app settings after login. |
| `ANTHROPIC_API_KEY` | Presenton | (secret) | Anthropic API key (used when LLM=anthropic). |
| `APP_DATA_DIRECTORY` | Presenton | /app_data | Where presentations, exports, uploads and fonts are stored on the volume. |
| `MIGRATE_DATABASE_ON_STARTUP` | Presenton | true | Run database migrations automatically on boot. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bash -c 'for i in $(seq 1 90); do (echo > /dev/tcp/$DB_WAIT_HOST/$DB_WAIT_PORT) 2>/dev/null && break; echo "waiting for postgres ($i/90)"; sleep 2; done; exec node /app/start.js'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app_data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/presenton)
