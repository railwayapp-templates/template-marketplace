# Deploy LiteLLM Gateway + Postgres on Railway

OpenAI-compatible LLM gateway with Postgres, virtual keys, spend tracking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-gateway-postgres)

## About

LiteLLM is an open-source, OpenAI-compatible LLM gateway. It unifies 100+ providers behind one `/v1/chat/completions` API, with virtual keys, routing, spend tracking, and an admin UI, so apps talk to a single proxy instead of each vendor SDK.

Hosting LiteLLM means running the proxy next to PostgreSQL so virtual keys, models, and spend live in the database. The official compose file also offers Prometheus; that sidecar is optional and not required to boot. This template uses the official `ghcr.io/berriai/litellm:v1.100.0` image (pinned, as upstream recommends), pins `PORT=4000` so Railway healthchecks hit `/health/liveliness`, and points `DATABASE_URL` at a private Postgres service over Railway's IPv6 private network. Set `STORE_MODEL_IN_DB=True` so you can add models from `/ui` without shipping a `config.yaml`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| LiteLLM | `ghcr.io/berriai/litellm:v1.100.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | litellm | Database name. |
| `DATABASE_URL` | Postgres | - | Private-network connection string (IPv6, includes port). |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL via the TCP proxy (for psql / GUI clients). |
| `PORT` | LiteLLM | 4000 | LiteLLM listen port. Railway's healthcheck and edge proxy probe $PORT, so keep it equal to the port the proxy binds (the proxy reads PORT). |
| `UI_USERNAME` | LiteLLM | (secret) | Admin UI username (log in at /ui with LITELLM_MASTER_KEY as the password). |
| `DATABASE_URL` | LiteLLM | - | Postgres connection string. Prisma migrations run automatically on boot. |
| `OPENAI_API_KEY` | LiteLLM | (secret) | Optional. Provider keys can also be added later in the Admin UI. |
| `LITELLM_SALT_KEY` | LiteLLM | - | Encrypts provider API keys stored in Postgres. Set once and never rotate, or stored keys become unreadable. |
| `ANTHROPIC_API_KEY` | LiteLLM | (secret) | Optional. Provider keys can also be added later in the Admin UI. |
| `STORE_MODEL_IN_DB` | LiteLLM | True | Lets you add models and provider keys from the Admin UI instead of a config.yaml. |
| `LITELLM_MASTER_KEY` | LiteLLM | - | Admin key for the API and the /ui login (username: admin). Keep the sk- prefix. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/liveliness`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/litellm-gateway-postgres)
