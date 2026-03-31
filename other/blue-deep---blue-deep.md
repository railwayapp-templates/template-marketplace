# Deploy blue-deep on Railway

Deploy and Host blue-deep with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/blue-deep)

## About

gregregrewgre r g g54 g4 5g 545

gregregrewgre r g g54 g4 5g 545gregregrewgre r g g54 g4 5g 545gregregrewgre r g g54 g4 5g 545gregregrewgre r g g54 g4 5g 545gregregrewgre r g g54 g4 5g 545

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

**Category:** Other

[View on Railway →](https://railway.com/deploy/blue-deep)
