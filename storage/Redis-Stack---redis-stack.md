# Deploy Redis Stack on Railway

All in one Redis setup with Insight UI and persistent storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-stack)

## About

![](https://cdn.sanity.io/images/sy1jschh/production/8f55bd3acc15dcbe6547e331e5b0ef8dd011ef16-646x400.svg)

Hosting Redis Stack involves running a preconfigured Redis server alongside RedisInsight for observability and management. This setup includes persistent storage to ensure data durability across restarts. It is suitable for development, testing, and lightweight production use cases. Railway simplifies deployment by handling infrastructure, networking, and scaling, allowing you to deploy and start using Redis instantly without manual configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis-insight | `redis/redisinsight` | Database |
| redis-server | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | redis-insight | 5540 |
| `REDISPORT` | redis-server | 6379 |
| `REDISPASSWORD` | redis-server | (secret) |
| `REDIS_PASSWORD` | redis-server | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/redis-stack)
