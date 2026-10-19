# Deploy Redis Queue and Cache Starter on Railway

Private authenticated Redis with append-only persistence and a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-queue-and-cache-starter)

## About

Private authenticated Redis with append-only persistence and a volume.

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
| `REDIS_PASSWORD` | (secret) | Randomly generated password for authenticating with Redis |

## Configuration

- **Start command:** `/bin/sh -c 'exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --save 60 1 --maxmemory-policy noeviction --bind 0.0.0.0 :: --dir /data'`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/redis-queue-and-cache-starter)
