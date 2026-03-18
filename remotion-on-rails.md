# Deploy Remotion on Rails on Railway

Effortlessly render and store Remotion videos using Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/remotion-on-rails)

## About

Remotion-on-Rails is a production-ready one-click deploy template that provisions a complete backend for Remotion's React-based video generation abilities.

With a single click, you’ll have a fully configured Remotion stack running on Railway’s scalable infrastructure. In under a minute, your Node.js server, PostgreSQL database, and Redis cache are up and ready, handling everything from rendering to job queuing. Just click deploy, wait for the clone, and open your new Remotion Studio in the browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| remotion-template | [helmerapp/remotion-on-rails](https://github.com/helmerapp/remotion-on-rails) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | remotion-template | 8080 | Port of this HTTP server |
| `ADMIN_PASSWORD` | remotion-template | (secret) | Password for the BullMQ dashboard |
| `ADMIN_USERNAME` | remotion-template | (secret) | Username for the BullMQ dashboard |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | Redis | no | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/tmp/out`
- **Volume:** `/bitnami`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, EJS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/remotion-on-rails)
