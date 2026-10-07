# Deploy LiteLLM | (Just Updated) AI Gateway, Add Models in the UI, Zero Required Keys on Railway

LiteLLM AI gateway. Keys auto-set, add models in UI, saved in Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-or-just-updated-ai-gateway-add-m)

## About

LiteLLM is an open-source AI gateway: one OpenAI-compatible endpoint in front of 100+ model providers
(OpenAI, Anthropic, Gemini, Bedrock, Azure, OpenRouter, Ollama and more), with virtual API keys, spend
tracking, budgets, rate limits, fallbacks and an admin dashboard.

This template runs LiteLLM v1.104 from the official `litellm-database` image (pinned by digest) next to a
Postgres 17 service with a Railway volume. Nothing has to be typed into the deploy form.

- **No required fields.** The master key, the encryption salt key and the dashboard password are generated per
  deploy. You do not paste provider keys or a config YAML at deploy time; add models and provider keys in the
  dashboard afterwards.
- **Models and keys live in Postgres.** The start command turns on `STORE_MODEL_IN_DB`, so every model, virtual
  key and budget you create in the dashboard is stored in the database and survives redeploys and restarts.
  Provider keys are encrypted at rest with the generated `LITELLM_SALT_KEY`; do not change that variable after
  you add your first model, or the stored keys can no longer be decrypted.
- **Locked from the first request.** Every API call needs the master key or a virtual key you issued, and the
  dashboard login is `admin` plus the generated `UI_PASSWORD`. Anonymous calls get `401`.
- **Waits for its database.** The start command waits for Postgres on the private network before starting, so
  a first deploy does not fail because the two services booted in a different order.
- **Healthcheck on `/health/readiness`,** which reports the database connection.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-trixie` | Database |
| litellm | `ghcr.io/berriai/litellm-database:v1.104.0@sha256:fbe28229d2d02181c0a7d9df9599de614b491f3d897d2d7da18404f088310218` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `UI_PASSWORD` | litellm | (secret) |
| `POSTGRES_PASSWORD` | litellm | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'export UI_USERNAME="${UI_USERNAME:-admin}" STORE_MODEL_IN_DB=True DATABASE_URL="postgresql://postgres:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/postgres"; n=0; until python -c "import socket,os;socket.create_connection((os.environ[\"POSTGRES_HOST\"],5432),3).close()" 2>/dev/null; do n=$((n+1)); [ $n -gt 60 ] && { echo "[railway] postgres unreachable at $POSTGRES_HOST"; exit 1; }; sleep 2; done; echo "[railway] port=$PORT postgres=$POSTGRES_HOST ui_user=$UI_USERNAME store_model_in_db=$STORE_MODEL_IN_DB"; exec litellm --port "$PORT"'`
- **Healthcheck:** `/health/readiness`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/litellm-or-just-updated-ai-gateway-add-m)
