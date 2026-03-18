# Deploy immich on Railway

Open source google photos alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/k-RfAP)

## About

Deploy the Immich server and with the machine learning server.

It uses a postgres installation with the Vectors extension installed and a Redis instance for cache. Images are stored on the Immich server volume, make sure to expand it.

High performance self-hosted photo and video management solution

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Immich server | `ghcr.io/immich-app/immich-server:v1.106.3` | Web service |
| Redis | `bitnami/redis` | Database |
| Immich machine learning | `ghcr.io/immich-app/immich-machine-learning:v1.106.3` | Web service |
| PGvector | `pgvector/pgvector:pg16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Immich server | 3001 |
| `REDIS_PASSWORD` | Immich server | (secret) |
| `REDIS_USERNAME` | Immich server | (secret) |
| `UPLOAD_LOCATION` | Immich server | /usr/src/app/upload |
| `DB_VECTOR_EXTENSION` | Immich server | pgvector |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | Immich machine learning | 3003 |
| `POSTGRES_DB` | PGvector | railway |
| `POSTGRES_USER` | PGvector | (secret) |
| `PGPORT_PRIVATE` | PGvector | 5432 |
| `POSTGRES_PASSWORD` | PGvector | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/app/upload`
- **Volume:** `/bitnami`
- **Healthcheck:** `/`
- **Volume:** `/cache`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/k-RfAP)
