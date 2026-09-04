# Deploy Portkey on Railway

A powerful AI gateway for routing, guardrails, fallbacks, and 200+ LLMs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/portkey)

## About

Portkey AI Gateway is an open-source AI gateway designed to route, control, and optimize requests across multiple LLM providers through a unified API layer.

This Railway template deploys **Portkey AI Gateway with Redis**, giving you a lightweight, production-oriented gateway stack with shared caching over Railway private networking.

This template deploys Portkey AI Gateway as the public-facing API layer and Redis as its internal cache backend.

Portkey handles LLM request routing, retries, fallbacks, guardrails, provider abstraction, and gateway-level policies, while Redis provides a shared cache store that can be reused across gateway restarts or multiple gateway replicas.

The stack communicates internally through Railway's private network, so Redis does not need to be publicly exposed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Portkeyai | `portkeyai/gateway:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Redis hostname available through Railway private networking |
| `REDISPORT` | Redis | 6379 | Default Redis TCP port |
| `REDISUSER` | Redis | default | Default Redis ACL username |
| `REDIS_URL` | Redis | - | Full Redis connection URL using Railway private networking |
| `REDISPASSWORD` | Redis | (secret) | Compatibility alias for clients expecting REDISPASSWORD |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated Redis authentication password |
| `PORT` | Portkeyai | 8787 | HTTP port used by Portkey AI Gateway |
| `NODE_ENV` | Portkeyai | production | Run the gateway in production mode |
| `LOG_LEVEL` | Portkeyai | info | Gateway logging level |
| `REDIS_URL` | Portkeyai | - | Redis connection URL referenced from the Redis service |
| `CACHE_STORE` | Portkeyai | redis | Use Redis as the shared cache store |
| `PORTKEY_CLIENT_AUTH` | Portkeyai | - | Optional secret used to protect gateway client access |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/portkey)
