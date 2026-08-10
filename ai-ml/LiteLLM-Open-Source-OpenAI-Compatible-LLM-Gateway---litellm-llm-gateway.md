# Deploy LiteLLM | Open Source OpenAI-Compatible LLM Gateway on Railway

OpenAI-compatible proxy for 100+ LLM providers, with keys and budgets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-llm-gateway)

## About

LiteLLM is an open-source proxy that puts one OpenAI-compatible API in front of every model provider — OpenAI, Anthropic, Gemini, Bedrock, Azure, Groq, Ollama and around a hundred more — with keys, budgets, rate limits and spend tracking on top.

This template runs the official `ghcr.io/berriai/litellm` image on a pinned stable tag, paired with a PostgreSQL 18 instance on a persistent Railway volume. Nothing is rebuilt or forked, so upstream releases and upstream security fixes are what you get.

Everything that matters is stored in Postgres rather than in a config file. `STORE_MODEL_IN_DB` is enabled, which means models, provider credentials, virtual API keys, teams, budgets and spend logs are all managed from the admin UI and survive every redeploy — on a platform with no editable filesystem, that is the difference between a usable proxy and a static one. Provider keys are encrypted at rest with a salt key generated once at deploy time.

The proxy is reachable two ways at once. Your public Railway domain serves the OpenAI-compatible API and the admin UI, and the same process answers on the private network, so other services in your project can call `http://litellm.railway.internal:4000/v1/chat/completions` without leaving Railway or paying for egress. Postgres stays private — it has no public endpoint at all.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:18.4-alpine` | Database |
| LiteLLM | `ghcr.io/berriai/litellm:main-v1.83.14-stable` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | litellm | Database LiteLLM creates its tables in. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser LiteLLM connects as. Leave as is unless you know why you are changing it. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated once at deploy. DATABASE_URL on the LiteLLM service references this value. |
| `PORT` | LiteLLM | 4000 | Port the proxy listens on. Change it here and the start command follows. |
| `UI_PASSWORD` | LiteLLM | (secret) | Password for the admin UI. Generated at deploy — copy it from the service variables. |
| `UI_USERNAME` | LiteLLM | (secret) | Username for the admin UI at /ui. |
| `DATABASE_URL` | LiteLLM | - | Connection string to the bundled Postgres over the private network. |
| `LITELLM_SALT_KEY` | LiteLLM | - | Encrypts the provider API keys stored in Postgres. Never change it after the first deploy — every saved key would become undecryptable. |
| `STORE_MODEL_IN_DB` | LiteLLM | True | Keeps models, keys, teams and budgets in Postgres so they are managed from the UI and survive redeploys. Turning this off leaves no way to add a model on Railway. |
| `LITELLM_MASTER_KEY` | LiteLLM | - | Admin key for the proxy API and the /ui login. Treat it as root — issue virtual keys for everything else. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `sh -c "litellm --host '[::]' --port ${PORT:-4000} --run_gunicorn"`
- **Healthcheck:** `/health/liveliness`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/litellm-llm-gateway)
