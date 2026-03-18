# Deploy Celery Flower (w/ Auth) on Railway

Celery Flower is a real-time web-based monitor for Celery task queues.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/celery-flower-w-auth)

## About

Celery Flower is a real-time web-based monitor for Celery task queues. It provides visibility into task progress, worker status, and queue metrics. This template includes caddy-zero-trust for Basic Auth protection, ensuring your monitoring dashboard is not publicly accessible.

This deployment consists of two services: Flower and caddy-zero-trust. Flower connects to your Redis broker and exposes a dashboard on port 5555 via Railway's private network. caddy-zero-trust sits in front as the public entry point, requiring authentication before proxying requests to Flower. Railway handles TLS termination, while the internal communication between services stays on the private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| celery-flower-monitor | [rubenszinho/celery-flower-monitor](https://github.com/rubenszinho/celery-flower-monitor) | Worker |
| caddy-auth-proxy | [rubenszinho/caddy-auth-proxy](https://github.com/rubenszinho/caddy-auth-proxy) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | celery-flower-monitor | 5555 | - |
| `AUTH_USER` | caddy-auth-proxy | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Observability · **Languages:** Python, Shell, Dockerfile, CSS, HTML

[View on Railway →](https://railway.com/deploy/celery-flower-w-auth)
