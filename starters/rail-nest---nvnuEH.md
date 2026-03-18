# Deploy rail-nest on Railway

Nestjs + Redis + Postgres + Cron

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nvnuEH)

## About

The template features a Nestjs application at its core, coupled with Redis instead of in-memory caching, PostgresDB for database and Nestjs cron service for interval-activities. You can get setup faster, overcoming the long process of setting up on Railway from scratch.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Main Application | [D-Lite/rail-nest](https://github.com/D-Lite/rail-nest) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPASSWORD` | Main Application | (secret) |
| `POSTGRESPASSWORD` | Main Application | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 |
| `REDIS_AOF_ENABLED` | Redis | no |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/bitnami`

**Category:** Starters · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/nvnuEH)
