# Deploy sails on Railway

A complete Sails starter app connected to a PostgreSQL database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/t3sAEH)

## About

A simple Sails.js starter app connected to a Postgres database and Redis store for saving sessions.


# Sails Starter Example

This is a [Sails](https://sailsjs.com/) starter app that connects to a Railway Postgres database.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/fWEWWf)

## ✨ Features

- Node
- Sails
- Postgres
- Redis

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| sails | [railwayapp-templates/sails](https://github.com/railwayapp-templates/sails) | Worker |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Starters · **Languages:** JavaScript, EJS, Less

[View on Railway →](https://railway.com/deploy/t3sAEH)
