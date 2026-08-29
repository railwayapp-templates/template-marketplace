# Deploy Redis by Bitnami on Railway

Secure, persistent Redis powered by Bitnami. Deploy in 1-click 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-by-bitnami)

## About

Redis by Bitnami provides a secure and persistent Redis deployment for Railway. It includes password authentication, AOF persistence, private networking, and persistent storage for caching, sessions, queues, rate limiting, Pub/Sub, and other low-latency workloads.

Hosting Redis by Bitnami on Railway gives you a persistent Redis instance that can be accessed securely by other services through Railway's private network.

The template uses the latest Bitnami Redis container, enables password authentication, stores Redis data on a Railway volume, and exposes standard connection variables such as `REDIS_URL`, `REDISHOST`, `REDISPORT`, and `REDISUSER`.

Redis remains private by default and does not require a public HTTP domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `bitnami/redis:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISHOST` | - | Private Redis hostname within the Railway project |
| `REDISPORT` | 6379 | Redis TCP port |
| `REDISUSER` | default | Default Redis ACL username |
| `REDIS_URL` | - | Internal Redis connection URL |
| `REDIS_PASSWORD` | (secret) | Password required to authenticate to Redis |

## Configuration

- **Start command:** `/bin/bash -c 'mkdir -p /bitnami/redis/data && exec /opt/bitnami/redis/bin/redis-server --port 6379 --bind 0.0.0.0 --protected-mode yes --dir /bitnami/redis/data --appendonly yes --requirepass "$REDIS_PASSWORD"'`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami/redis/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/redis-by-bitnami)
