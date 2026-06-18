# Deploy litellm-source-20260617 on Railway

LiteLLM AI gateway with Postgres keys, Redis cache, and spend controls.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-source-20260617)

## About

Run LiteLLM Proxy as a production-shaped OpenAI-compatible AI gateway with Postgres persistence, Redis coordination, generated admin credentials, and provider-key setup left to the deployer.

- `litellm`: public LiteLLM proxy/API/admin service on port `4000`
- `postgres`: private app database for virtual keys, teams, provider config, and spend logs
- `redis`: private cache/routing coordination service
- Generated `LITELLM_MASTER_KEY`, `LITELLM_SALT_KEY`, Postgres password, and Redis password
- No provider API keys are included in the template

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| litellm | `ghcr.io/berriai/litellm:main-stable` | Web service |
| postgres | `postgres:17` | Database |
| redis | `redis:7` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | litellm | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |

## Configuration

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
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -lc 'exec redis-server --appendonly yes --dir /data --requirepass "$REDIS_PASSWORD" --maxmemory-policy noeviction'`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/litellm-source-20260617)
