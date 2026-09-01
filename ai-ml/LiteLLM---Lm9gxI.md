# Deploy LiteLLM on Railway

LiteLLM: LLM router, virtual keys, budgets, cost tracking, guardrails

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Lm9gxI)

## About

LiteLLM is an open-source AI gateway that puts one OpenAI-compatible endpoint in front of 100+ LLM providers. This template deploys the LiteLLM Proxy Server with Postgres and Redis, giving you virtual API keys, per-key budgets, spend tracking, rate limits, fallbacks and response caching — managed from a web dashboard.

LiteLLM Proxy runs as a Python service backed by Postgres for models, keys, budgets and spend history, plus Redis for response caching and cross-replica rate limiting. Self-hosting it means running that database, keeping migrations applied on every upgrade, generating and safeguarding an encryption key for stored provider credentials, and exposing the gateway over TLS. This template wires all three services together with private networking, generates every secret for you, pins an exact image version so upgrades are deliberate, applies database migrations once per deploy before any replica starts, and gates each rollout behind a readiness healthcheck so a broken version never takes traffic. There are no configuration files and no third-party accounts to create — you add providers and models from the Admin UI after deploying.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LiteLLM | `ghcr.io/berriai/litellm:v1.98.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | LiteLLM | 0.0.0.0 | MUST be 0.0.0.0. Railway's healthcheck cannot reach a proxy bound to :: |
| `PORT` | LiteLLM | 4000 | Tells Railway's healthcheck which port to probe. There is NO port auto-detection - the deploy fails without this. Do not change it: the image hardcodes --port 4000. |
| `REDIS_URL` | LiteLLM | - | Enables response caching and coordinates rate limits across replicas. |
| `OR_APP_NAME` | LiteLLM | - | Optional - Sent to OpenRouter as X-Title for attribution. |
| `OR_SITE_URL` | LiteLLM | - | Optional - Sent to OpenRouter as HTTP-Referer for attribution. |
| `UI_PASSWORD` | LiteLLM | (secret) | Optional - Leave blank to log in with LITELLM_MASTER_KEY. |
| `UI_USERNAME` | LiteLLM | (secret) | Optional - Admin UI username. |
| `DATABASE_URL` | LiteLLM | - | Stores models, virtual keys, budgets and spend. |
| `GEMINI_API_KEY` | LiteLLM | (secret) | Optional |
| `OPENAI_API_KEY` | LiteLLM | (secret) | Optional - Models are normally added from the Admin UI instead. |
| `LITELLM_SALT_KEY` | LiteLLM | - | Encrypts provider credentials at rest. Generated once and NEVER changed - rotating it silently makes every stored provider key unreadable. |
| `ANTHROPIC_API_KEY` | LiteLLM | (secret) | Optional |
| `STORE_MODEL_IN_DB` | LiteLLM | True | Lets you add models from the Admin UI. Without it, Add Model returns HTTP 500. |
| `LITELLM_MASTER_KEY` | LiteLLM | - | Your API key AND the Admin UI password. Generated for you - copy it from this service's Variables tab after deploying. |
| `OPENROUTER_API_KEY` | LiteLLM | (secret) | Optional - One key unlocks ~100 models via the openrouter/* wildcard. |
| `LITELLM_CONFIG_YAML` | LiteLLM | - | Optional - Advanced. A full config.yaml, for the few features that need a file (e.g. Prometheus). Max 32768 characters. |
| `LITELLM_LOCAL_MODEL_COST_MAP` | LiteLLM | True | Uses the bundled pricing table instead of fetching it at boot. Halves startup time. |
| `ENFORCE_PRISMA_MIGRATION_CHECK` | LiteLLM | true | Fails the deploy loudly on a bad migration instead of serving a half-migrated database. |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. |
| `DATABASE_URL` | Postgres | - | Private-network connection string. LiteLLM stores models, virtual keys, budgets and spend history here. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated once at deploy time. |
| `REDISHOST` | Redis | - | Private-network hostname of the Redis service. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on. |
| `REDISUSER` | Redis | default | Redis username for this image's default user. |
| `REDIS_URL` | Redis | - | Private-network connection string. LiteLLM uses Redis for response caching and cross-replica rate limiting. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, generated once at deploy time. |

## Configuration

- **Start command:** `sh -c 'if [ -n "$LITELLM_CONFIG_YAML" ]; then printf %s "$LITELLM_CONFIG_YAML" > /tmp/config.yaml; exec litellm --config /tmp/config.yaml --port 4000; else exec litellm --port 4000; fi'`
- **Healthcheck:** `/health/readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly no --save ''"`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/Lm9gxI)
