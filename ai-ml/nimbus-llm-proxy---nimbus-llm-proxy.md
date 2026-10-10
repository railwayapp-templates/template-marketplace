# Deploy nimbus-llm-proxy on Railway

LLM proxy with Redis that forwards requests to an upstream API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nimbus-llm-proxy)

## About

nimbus-llm-proxy is an LLM proxy that sits between your apps and an upstream LLM API. Your apps call the proxy, and it forwards requests to the upstream provider using the API keys you configure, so those keys stay on the server instead of in your clients.

This template deploys two services on Railway: the nimbus-llm-proxy service and a Redis database. The proxy connects to Redis over Railway's private network, and the Redis connection variables are linked for you. On deploy, Railway generates the Redis password and the proxy secret. You only need to enter the upstream base URL and your upstream API key or keys. Once the deploy finishes, point your apps at the proxy's public URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| llm-proxy | `ghcr.io/yoodule/nimbus/llm-proxy:v1.2.0` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | llm-proxy | redis://redis.railway.internal:6379 | Redis connection string. Linked automatically to the Redis service. |
| `UPSTREAM_BASE` | llm-proxy | https://ollama.com | Base URL of the upstream LLM API the proxy forwards requests to. Replace with your provider's URL. |
| `REDIS_PASSWORD` | llm-proxy | (secret) | Redis password. Linked automatically to the Redis service. |
| `UPSTREAM_API_KEYS` | llm-proxy | (secret) | API key or keys for the upstream provider. Replace with your own key. Never share these. |
| `NIMBUS_PROXY_SECRET` | llm-proxy | (secret) | Secret that protects the proxy. Auto-generated on deploy. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis database. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on. Leave at 6379. |
| `REDISUSER` | Redis | default | Redis user. Leave as default. |
| `REDIS_URL` | Redis | - | Redis connection string, built from the other Redis variables. |
| `REDISPASSWORD` | Redis | (secret) | Redis password. Linked to REDIS_PASSWORD. |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated password for Redis. Unique per deploy. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/nimbus-llm-proxy)
