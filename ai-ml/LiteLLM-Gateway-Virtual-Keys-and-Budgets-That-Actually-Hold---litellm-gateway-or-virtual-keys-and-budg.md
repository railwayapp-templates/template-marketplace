# Deploy LiteLLM Gateway | Virtual Keys and Budgets That Actually Hold on Railway

Self-host LiteLLM with virtual keys, budgets and limits that actually hold.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-gateway-or-virtual-keys-and-budg)

## About

LiteLLM puts one OpenAI-compatible address in front of every model provider you use. Point your application at it once, and switch providers, split traffic, cap spend or revoke a colleague's access without touching application code.

This template deploys it the way it is meant to run: the proxy, Postgres for keys and spend, Redis for shared limits and cache. Pinned versions, generated secrets, nothing left to wire.

Self-hosted AI gateways are among the fastest-growing deployments on Railway right now — and among the fastest-failing. The most popular one collected 1700 installs in six weeks with roughly a third never coming up. LiteLLM, the mature option, is offered as a single container in every template that carries it, and a single container is exactly what it cannot be if you want the features people install it for.

Without Postgres there are no virtual keys, no budgets and no spend tracking — the proxy runs, and the reason you chose it is missing. Without Redis, rate limits are counted inside each process: run two replicas and each quietly enforces its own copy of the limit, so a key capped at 60 requests a minute gets 120. The cache has the same problem, and you pay for the duplicate calls.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| LiteLLM | [ak40u/litellm-railway-starter](https://github.com/ak40u/litellm-railway-starter) | Web service |
| Redis | `redis:8.6.5-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | LiteLLM | 4000 |
| `REDIS_PORT` | LiteLLM | 6379 |
| `UI_PASSWORD` | LiteLLM | (secret) |
| `UI_USERNAME` | LiteLLM | (secret) |
| `REDIS_PASSWORD` | LiteLLM | (secret) |
| `STORE_MODEL_IN_DB` | LiteLLM | True |
| `REDIS_PASSWORD` | Redis | (secret) |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Redis | true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/litellm-gateway-or-virtual-keys-and-budg)
