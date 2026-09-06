# Deploy Redis on Railway

Deploy and Host Redis with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis)

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
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISHOST` | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | 6379 | Port that Redis listens on |
| `REDISUSER` | default | Username for authenticating with Redis |
| `REDIS_URL` | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | (secret) | Randomly generated password for authenticating with Redis |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Storage · **Verified:** Yes

[View on Railway →](https://railway.com/deploy/redis)
