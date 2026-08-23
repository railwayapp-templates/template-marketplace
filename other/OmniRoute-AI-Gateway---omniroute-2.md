# Deploy OmniRoute — AI Gateway on Railway

Unified AI proxy. Route any LLM through one endpoint.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omniroute-2)

## About

OmniRoute is a self-hosted LLM gateway that routes multiple AI providers through a single OpenAI-compatible endpoint. Connect providers such as OpenAI, Anthropic, Gemini, OpenRouter, Ollama, and other compatible APIs, then manage routing, fallback, API keys, usage, and model configuration from one dashboard.

This template deploys **OmniRoute with Redis and persistent storage**.

OmniRoute acts as a unified control layer between your applications and LLM providers. Instead of configuring different API endpoints and provider credentials in every application, clients connect to a single `/v1` endpoint while OmniRoute handles provider selection, routing rules, failover, API keys, analytics, and optional prompt compression.

Application configuration is stored persistently under `/app/data`, while Redis provides a shared backend for rate limiting and runtime state.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Omniroute | `diegosouzapw/omniroute:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Redis private hostname within Railway |
| `REDISPORT` | Redis | 6379 | Redis service port |
| `REDISUSER` | Redis | default | Default Redis username |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias for the generated Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `PORT` | Omniroute | 20128 | Railway public service port for OmniRoute |
| `BASE_URL` | Omniroute | - | Canonical public OmniRoute URL |
| `DATA_DIR` | Omniroute | /app/data | Persistent directory for SQLite database, backups, and logs |
| `HOSTNAME` | Omniroute | 0.0.0.0 | Listen on all container network interfaces |
| `NODE_ENV` | Omniroute | production | Run OmniRoute in production mode |
| `REDIS_URL` | Omniroute | - | Redis connection used for shared rate limiting and runtime state |
| `JWT_SECRET` | Omniroute | (secret) | Secret used to sign dashboard sessions |
| `API_KEY_SECRET` | Omniroute | (secret) | Secret used to protect gateway API keys |
| `REQUIRE_API_KEY` | Omniroute | (secret) | Require an OmniRoute API key for /v1 gateway requests |
| `INITIAL_PASSWORD` | Omniroute | (secret) | Initial dashboard admin password |
| `OMNIROUTE_MEMORY_MB` | Omniroute | 2048 | Maximum Node.js heap allocation in MB |
| `NEXT_PUBLIC_BASE_URL` | Omniroute | - | Public URL used by the dashboard |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/omniroute-2)
