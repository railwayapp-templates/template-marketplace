# Deploy Redis on Railway

Deploy and Host Redis with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/redis)

## About

- New to Redis? Start with [What is Redis](#what-is-redis) and [Getting Started](#getting-started)
- Ready to build from source? Jump to [Build Redis from Source](#build-redis-from-source)
- Want to contribute? See the [Code contributions](#code-contributions) section
  and [CONTRIBUTING.md](./CONTRIBUTING.md)
- Looking for detailed documentation? Navigate to [redis.io/docs](https://redis.io/docs/)

Redis is a popular choice for developers worldwide due to its combination of speed, flexibility, and rich feature set. Here's why people choose Redis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISPORT` | 6379 | - |
| `REDISUSER` | default | - |
| `REDIS_URL` | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | (secret) | - |
| `REDIS_PASSWORD` | (secret) | - |
| `REDIS_PUBLIC_URL` | - | Connection string for connecting to redis externally |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/redis)
