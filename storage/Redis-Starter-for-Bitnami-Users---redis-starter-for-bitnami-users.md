# Deploy Redis Starter for Bitnami Users on Railway

Redis with generated auth and durable data, using the upstream Redis image.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-starter-for-bitnami-users)

## About

Redis with generated auth and durable data, using the upstream Redis image.

This deployment fork provisions Redis. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis@sha256:47670742d7924adbcdb404d1288b6327815b23141969c0939b8e5d61f78c2634` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISPORT` | 6379 | - |
| `REDISUSER` | default | - |
| `REDISPASSWORD` | (secret) | - |
| `REDIS_PASSWORD` | (secret) | Password to connect to Redis. |
| `REDIS_RDB_POLICY` | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | no | Disable writing to AOF file. |

## Configuration

- **Start command:** `/bin/sh -c 'exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --save 60 1 --maxmemory-policy noeviction --bind 0.0.0.0 :: --dir /data'`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/redis-starter-for-bitnami-users)
