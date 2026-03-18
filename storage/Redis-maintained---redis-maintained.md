# Deploy Redis (maintained) on Railway

Redis key-value data store (maintained template)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-maintained)

## About

Redis (Maintained) is a community-maintained Redis deployment template for Railway. Redis is a fast in-memory key-value database commonly used for caching, queues, and real-time data. This template exists because the official Redis template on Railway is outdated and currently several versions behind the latest Redis releases.

Hosting Redis (Maintained) on Railway provides a simple way to deploy a modern Redis server without managing infrastructure yourself. This template runs a recent Redis version and aims to stay closer to upstream releases compared to the official Redis template, which is currently around seven versions behind.

When deployed, Railway provisions a container running Redis and exposes connection details through environment variables. Applications can immediately connect using the provided Redis URL.

Railway handles infrastructure tasks like restarts, scaling, and networking. This maintained template ensures developers can run a newer Redis version with current security fixes, performance improvements, and features.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.6.1` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `REDISPORT` | 6379 |
| `REDISUSER` | default |
| `REDISPASSWORD` | (secret) |
| `REDIS_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/redis-maintained)
