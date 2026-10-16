# Deploy open-webui-litellm-template on Railway

Open WebUI + LiteLLM. BYO LLM keys. Optional Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-litellm-template)

## About

Team chat over **your** models: [Open WebUI](https://github.com/open-webui/open-webui) talks only to [LiteLLM](https://www.litellm.ai/). This is the ChatGPT Team replacement on [c17.io/stacks/open-webui-litellm](https://c17.io/stacks/open-webui-litellm).

**Provider API keys are BYO and optional.** The stack boots without `OPENAI_API_KEY` / `ANTHROPIC_API_KEY`. You add keys in LiteLLM (or as optional env vars) when you want models to answer.

Open WebUI is the ChatGPT-style UI. LiteLLM is an OpenAI-compatible proxy: one URL, many providers, virtual keys, spend logs. Agents (Cursor, n8n, your bots) should point at LiteLLM, not at Open WebUI.

On Railway this is three services:

| Service | Source | Public | Notes |
|---|---|---|---|
| `open-webui` | `ghcr.io/open-webui/open-webui` | Yes | `PORT` native. Health `GET /health`. Volume `/app/backend/data`. |
| `litellm` | `docker.litellm.ai/berriai/litellm:main-stable` | Yes | So agents can hit the proxy. Health `GET /health/liveliness`. |
| `Postgres` | Railway plugin | No | LiteLLM models, virtual keys, spend. Open WebUI stays on SQLite on the volume unless you later set `DATABASE_URL`. |

Open WebUI is pre-wired to LiteLLM over Railway private networking. First Open WebUI signup becomes admin; then disable public signup. LiteLLM admin UI is `/ui` on the LiteLLM domain; password is `LITELLM_MASTER_KEY`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:16` | Database |
| open-webui | `ghcr.io/open-webui/open-webui:main` | Web service |
| litellm | `ghcr.io/berriai/litellm:main-stable` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `OPENAI_API_KEY` | open-webui | (secret) |
| `WEBUI_SECRET_KEY` | open-webui | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Start command:** `sh -c "litellm --port $PORT --host 0.0.0.0"`
- **Healthcheck:** `/health/liveliness`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-litellm-template)
