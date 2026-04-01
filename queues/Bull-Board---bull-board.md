# Deploy Bull Board on Railway

BullMQ dashboard with auto-discovery, multi-Redis & auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bull-board)

## About

Bull Board is a production-ready web dashboard for monitoring and managing BullMQ job queues. Built on Hono, it features automatic queue discovery, multi-Redis support, and built-in HTTP Basic Auth — giving you real-time visibility into your background jobs with zero manual queue registration.

Hosting Bull Board requires a running Redis instance that your BullMQ workers also connect to. The dashboard connects to Redis, periodically scans for queues, and surfaces them automatically — no config changes needed as your app grows. This template deploys three services on Railway: the Bull Board dashboard, a pre-configured Redis instance, and an example worker that populates sample queues so you see a live dashboard immediately. Authentication is handled via HTTP Basic Auth, configured through environment variables. For multi-service architectures, Bull Board can monitor multiple Redis instances simultaneously from a single deployment using the `REDIS_INSTANCES` config.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| example-worker | [wfalowski/bull-board-hono](https://github.com/wfalowski/bull-board-hono) (root: ./example/) | Worker |
| Bull Board | `ghcr.io/wfalowski/bull-board-hono:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_FAMILY` | example-worker | 6 | - |
| `BASE_PATH` | Bull Board | / | Bull board UI base path |
| `AUTH_PASSWORD` | Bull Board | (secret) | Basic auth password |
| `AUTH_USERNAME` | Bull Board | (secret) | Basic auth user name |
| `QUEUE_DISCOVERY_INTERVAL` | Bull Board | 10000 | Queue discovery interval |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Start command:** `npm run start`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Queues · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/bull-board)
