# Deploy Upstash Redis Adaptor on Railway

Self-hosted Upstash-compatible Redis HTTP API for edge environments

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/upstash-redis-adaptor)

## About

**Upstash Redis Adaptor** is a lightweight HTTP wrapper that exposes any Redis server as an Upstash-compatible REST API. It enables you to use the `@upstash/redis` SDK with your own self-hosted Redis instance—perfect for edge environments where TCP connections aren't available.

Deploying Upstash Redis Adaptor involves running a small Hono + Bun server that translates HTTP requests into Redis TCP commands. The adaptor connects to your Redis instance and exposes endpoints for single commands, pipelines, and transactions—all compatible with Upstash's REST API format. This template automatically provisions both a Redis database and the adaptor service, with environment variables pre-configured. Once deployed, simply point your `@upstash/redis` SDK to your adaptor URL and start using Redis over HTTP.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| redis-http-wrapper | [blink-new/redis-http-wrapper](https://github.com/blink-new/redis-http-wrapper) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `SR_TOKEN` | redis-http-wrapper | (secret) | Auto-generates secure token |
| `REDIS_URL` | redis-http-wrapper | - | Auto-linked to Redis service |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/upstash-redis-adaptor)
