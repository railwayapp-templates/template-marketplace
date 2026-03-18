# Deploy AFFiNE on Railway

AFFiNE - Self-host version  

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/affine)

## About

AFFiNE is a privacy-focused, local-first, open-source alternative to Notion and Miro that combines docs, whiteboards, and databases in one workspace.

Self-hosting AFFiNE requires Docker with three services: AFFiNE server, PostgreSQL, and Redis. Railway simplifies deployment by providing managed databases and automatic scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AFFiNE | `ghcr.io/toeverything/affine-graphql:stable` | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NODE_ENV` | AFFiNE | production |
| `AFFINE_REVISION` | AFFiNE | stable |
| `CONFIG_LOCATION` | AFFiNE | /root/.affine/self-host/config |
| `UPLOAD_LOCATION` | AFFiNE | /root/.affine/self-host/storage |
| `REDIS_SERVER_USER` | AFFiNE | (secret) |
| `AFFINE_SERVER_HOST` | AFFiNE | 0.0.0.0 |
| `AFFINE_SERVER_PORT` | AFFiNE | 3010 |
| `AFFINE_ADMIN_PASSWORD` | AFFiNE | (secret) |
| `REDIS_SERVER_DATABASE` | AFFiNE | 0 |
| `REDIS_SERVER_PASSWORD` | AFFiNE | (secret) |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 |
| `REDIS_AOF_ENABLED` | Redis | no |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.affine/`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/affine)
