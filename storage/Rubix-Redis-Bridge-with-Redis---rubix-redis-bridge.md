# Deploy Rubix Redis Bridge with Redis on Railway

Secure Redis HTTP bridge with Upstash SDK compatibility.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rubix-redis-bridge)

## About

Rubix Redis Bridge is a secure, self-hosted HTTP gateway for Redis-compatible databases. It provides an Upstash-style REST API for supported `@upstash/redis`, `@upstash/ratelimit`, and `@upstash/realtime` workflows, with bearer authentication, command policies, managed transactions, realtime SSE subscriptions, health checks, and Prometheus metrics.

Deploying Rubix Redis Bridge provisions the bridge alongside Redis and connects both services through Railway’s private network. Redis remains protected from direct public access while the bridge provides authenticated HTTP endpoints for applications that cannot use Redis TCP connections. The deployment generates separate access and metrics tokens, applies command restrictions, limits request and response sizes, controls concurrency, and monitors Redis availability. A Railway public domain can be enabled when external or serverless applications require access. Applications running within the same Railway project can use private networking to avoid public traffic and network egress.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| rubixvi/rubix-redis-bridge | `rubixvi/rubix-redis-bridge` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | rubixvi/rubix-redis-bridge | 8080 | - |
| `RRB_HOST` | rubixvi/rubix-redis-bridge | 0.0.0.0 | - |
| `RRB_MODE` | rubixvi/rubix-redis-bridge | env | - |
| `RRB_TOKEN` | rubixvi/rubix-redis-bridge | (secret) | - |
| `RRB_TOKEN_TYPE` | rubixvi/rubix-redis-bridge | (secret) | - |
| `RRB_MAX_ARG_BYTES` | rubixvi/rubix-redis-bridge | 262144 | - |
| `RRB_METRICS_TOKEN` | rubixvi/rubix-redis-bridge | (secret) | - |
| `RRB_MAX_BODY_BYTES` | rubixvi/rubix-redis-bridge | 1048576 | - |
| `RRB_MAX_CONCURRENCY` | rubixvi/rubix-redis-bridge | 1024 | - |
| `RRB_OPERATION_LIMIT` | rubixvi/rubix-redis-bridge | 100 | - |
| `RRB_MAX_COMMAND_ARGS` | rubixvi/rubix-redis-bridge | 256 | - |
| `RRB_CONNECTION_SHARDS` | rubixvi/rubix-redis-bridge | 4 | - |
| `RRB_ACQUIRE_TIMEOUT_MS` | rubixvi/rubix-redis-bridge | 100 | - |
| `RRB_MAX_RESPONSE_BYTES` | rubixvi/rubix-redis-bridge | 10485760 | - |
| `RRB_REQUEST_TIMEOUT_MS` | rubixvi/rubix-redis-bridge | 5000 | - |
| `RRB_TRUST_PROXY_HEADERS` | rubixvi/rubix-redis-bridge | false | - |
| `RRB_AUTH_LOCKOUT_SECONDS` | rubixvi/rubix-redis-bridge | 300 | - |
| `RRB_AUTH_LOCKOUT_FAILURES` | rubixvi/rubix-redis-bridge | 10 | - |
| `RRB_MAX_PIPELINE_COMMANDS` | rubixvi/rubix-redis-bridge | 1000 | - |
| `RRB_AUTH_LOCKOUT_MAX_ENTRIES` | rubixvi/rubix-redis-bridge | 65536 | - |
| `RRB_REALTIME_MAX_CONCURRENCY` | rubixvi/rubix-redis-bridge | 1024 | - |
| `RRB_AUTH_LOCKOUT_WINDOW_SECONDS` | rubixvi/rubix-redis-bridge | 300 | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/rubix-redis-bridge)
