# Deploy absinthe-adapters on Railway

Deploy and Host zonal-gentleness with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/zonal-gentleness)

## About

Each adapter requires a reliable hosting environment to ensure uninterrupted data indexing. Choose between cloud providers, self-hosted servers, or managed container platforms based on your performance, scalability, and maintenance preferences.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| absinthelabs/absinthe-adapters:latest | `ghcr.io/absinthelabs/absinthe-adapters:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `LOG_LEVEL` | absinthelabs/absinthe-adapters:latest | debug | - |
| `ABSINTHE_API_KEY` | absinthelabs/absinthe-adapters:latest | (secret) | - |
| `ABSINTHE_API_URL` | absinthelabs/absinthe-adapters:latest | https://v2.adapters.absinthe.network | - |
| `COINGECKO_API_KEY` | absinthelabs/absinthe-adapters:latest | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/zonal-gentleness)
