# Deploy owui-litellm-src-20260617b on Railway

Open WebUI with a private LiteLLM gateway, Postgres state, and Redis cache.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/owui-litellm-src-20260617b)

## About

Open WebUI gives your team a private ChatGPT-style workspace, while LiteLLM sits behind it as an OpenAI-compatible gateway for provider keys, routing, virtual keys, and spend controls. This Railway template deploys Open WebUI with a private LiteLLM service, two Postgres databases, and Redis.

Published marketplace code: `owui-litellm-src-20260617b`

Published template ID: `54f72708-921d-41e7-bf86-40218160584c`

Self-hosting Open WebUI and LiteLLM keeps chat history, user accounts, provider configuration, and gateway state in infrastructure you control. Open WebUI stores users, chats, settings, and API keys in its own Postgres database. LiteLLM stores virtual keys, provider config, and spend data in a separate Postgres database, with Redis available for cache and routing coordination.

The template exposes only Open WebUI publicly. LiteLLM, both Postgres services, and Redis remain private inside the Railway project network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openwebui-postgres | `postgres:17` | Database |
| litellm | `ghcr.io/berriai/litellm:main-stable` | Worker |
| open-webui | `ghcr.io/open-webui/open-webui:main` | Web service |
| redis | `redis:7` | Database |
| litellm-postgres | `postgres:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | openwebui-postgres | (secret) |
| `POSTGRES_PASSWORD` | openwebui-postgres | (secret) |
| `REDIS_PASSWORD` | litellm | (secret) |
| `OPENAI_API_KEY` | open-webui | (secret) |
| `WEBUI_SECRET_KEY` | open-webui | (secret) |
| `WEBUI_ADMIN_PASSWORD` | open-webui | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `POSTGRES_USER` | litellm-postgres | (secret) |
| `POSTGRES_PASSWORD` | litellm-postgres | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -lc 'cat > /tmp/litellm_config.yaml <<"YAML"
model_list: []
general_settings:
  master_key: os.environ/LITELLM_MASTER_KEY
  database_url: os.environ/DATABASE_URL
  store_model_in_db: true
  proxy_batch_write_at: 60
  database_connection_pool_limit: 10
litellm_settings:
  cache: true
  cache_params:
    type: redis
    host: os.environ/REDIS_HOST
    port: os.environ/REDIS_PORT
    password: os.environ/REDIS_PASSWORD
  json_logs: true
  set_verbose: false
router_settings:
  routing_strategy: simple-shuffle
  redis_host: os.environ/REDIS_HOST
  redis_port: os.environ/REDIS_PORT
  redis_password: os.environ/REDIS_PASSWORD
YAML
exec litellm --config /tmp/litellm_config.yaml --port 4000 --num_workers 1'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -lc 'exec redis-server --appendonly yes --dir /data --requirepass "$REDIS_PASSWORD" --maxmemory-policy noeviction'`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/owui-litellm-src-20260617b)
