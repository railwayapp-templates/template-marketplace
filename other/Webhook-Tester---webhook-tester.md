# Deploy Webhook Tester on Railway

Powerful tool for testing WebHooks and more | Webhook.site alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/webhook-tester)

## About

Webhook Tester is a self-hosted tool for testing and debugging webhooks and HTTP requests. It lets you generate unique URLs, inspect incoming requests in real time, and customize responses (status codes, headers, body, delays) so you can reliably debug integrations without relying on third-party webhook testing services.

Hosting Webhook Tester on Railway gives you a lightweight, always-on endpoint for capturing and inspecting webhooks in the cloud. The service runs as a single containerized web app that listens on an HTTP port and can use in-memory storage out of the box, so you can get started without extra infrastructure. For more advanced setups, it supports Redis and filesystem-backed storage for persistence and scaling. Configuration is done entirely via environment variables, making it straightforward to adjust logging, storage drivers, pub/sub, session TTLs, and optional tunneling behavior to match each Railway environment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Webhook Tester | `ghcr.io/tarampampam/webhook-tester` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HTTP_PORT` | Webhook Tester | 8080 | - |
| `LOG_LEVEL` | Webhook Tester | info | - |
| `LOG_FORMAT` | Webhook Tester | console | - |
| `SESSION_TTL` | Webhook Tester | 168h0m0s | - |
| `MAX_REQUESTS` | Webhook Tester | 128 | - |
| `PUBSUB_DRIVER` | Webhook Tester | redis | - |
| `STORAGE_DRIVER` | Webhook Tester | redis | - |
| `SHUTDOWN_TIMEOUT` | Webhook Tester | 15s | - |
| `HTTP_IDLE_TIMEOUT` | Webhook Tester | 1m0s | - |
| `HTTP_READ_TIMEOUT` | Webhook Tester | 1m0s | - |
| `HTTP_WRITE_TIMEOUT` | Webhook Tester | 1m0s | - |
| `AUTO_CREATE_SESSIONS` | Webhook Tester | false | - |
| `MAX_REQUEST_BODY_SIZE` | Webhook Tester | 0 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/webhook-tester)
