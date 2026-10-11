# Deploy LiteLLM on Railway

Secure, low-cost LiteLLM AI gateway: one API for 100+ LLMs, with budgets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-1)

## About

LiteLLM is an open-source AI gateway: one OpenAI-compatible endpoint in front of OpenAI,
Anthropic, Google, Mistral and 100+ other providers. This template runs the LiteLLM proxy
with Postgres, so you get an admin UI, virtual keys with budgets and spend tracking from
the first deploy, starting at about $7.40 a month on Railway.

Hosting LiteLLM means running the proxy server and a Postgres database for its keys, models,
budgets and spend logs. This template uses the official LiteLLM image, pinned to v1.104.1 by
tag and digest and checked against LiteLLM's published signature. Secrets (master key, salt
key, database password) are generated fresh for every deploy, the database is reachable
only over Railway's private network, and the proxy has a readiness health check so a bad
deploy never takes traffic. You add models and provider API keys in the admin UI at `/ui`;
they are stored encrypted in Postgres and survive restarts and redeploys. Redis is
deliberately left out: one replica doesn't need it, which keeps the bill low.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LiteLLM | [mtswenisiphosami-lgtm/litellm-railway](https://github.com/mtswenisiphosami-lgtm/litellm-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | LiteLLM | 4000 | Port the proxy listens on. Leave at 4000 unless you also change the public networking port. |
| `LITELLM_LOG` | LiteLLM | ERROR | Log level. ERROR keeps logs small; set to INFO or DEBUG temporarily when troubleshooting. |
| `NUM_WORKERS` | LiteLLM | 1 | Number of proxy worker processes. 1 is enough for most use; each extra worker uses more memory (and costs more). |
| `DATABASE_URL` | LiteLLM | - | Connection to the Postgres service over Railway’s private network. Set automatically; no need to change it. |
| `LITELLM_MODE` | LiteLLM | PRODUCTION | Production mode: LiteLLM does not load a local .env file. Leave as is. |
| `LITELLM_SALT_KEY` | LiteLLM | - | Encrypts the provider API keys stored in the database, generated for you. Never change it after adding models, or stored keys can no longer be decrypted. |
| `STORE_MODEL_IN_DB` | LiteLLM | True | Saves models you add in the admin UI to the database so they survive restarts and redeploys. |
| `LITELLM_MASTER_KEY` | LiteLLM | - | Admin key for the proxy, generated for you. It is also the admin UI password (username admin). Keep it private and use virtual keys for apps. |
| `POSTGRES_DB` | Postgres | railway | Database name. |
| `DATABASE_URL` | Postgres | - | Private connection string used by LiteLLM. Set automatically. |
| `POSTGRES_USER` | Postgres | (secret) | Database user name. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password, generated for you on every deploy. |

## Configuration

- **Healthcheck:** `/health/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** PowerShell, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/litellm-1)
