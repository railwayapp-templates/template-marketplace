# Deploy Jitsu (Open-Source Data Integration & Event Collection Tool) on Railway

Jitsu [Mar ’26] (Collect & Route Event Data in Real Time) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/jitsu)

## About

Jitsu is a modern, open-source data integration platform available on GitHub, designed to make event and analytics data collection seamless and developer-friendly. With Jitsu, users can easily capture data from various sources and send it to their analytics, data warehouse, or storage solution in real time, all while keeping full control over their infrastructure.

Self-hosting Jitsu allows you to manage your data pipelines and analytics streams entirely under your control. By self-hosting, you ensure that all sensitive event data and analytics logs remain private and within your infrastructure. Jitsu provides a simple interface for configuring data streams, connectors, and destinations without requiring extensive coding knowledge.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jitsu-configurator-railway | [Shinyduo/jitsu-configurator-railway](https://github.com/Shinyduo/jitsu-configurator-railway) | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| jitsu-server-railway | [Shinyduo/jitsu-server-railway](https://github.com/Shinyduo/jitsu-server-railway) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | jitsu-configurator-railway | 7000 |
| `POSTGRES_USER` | jitsu-configurator-railway | (secret) |
| `JITSU_LOG_LEVEL` | jitsu-configurator-railway | debug |
| `JITSU_AUTH_SECRET` | jitsu-configurator-railway | (secret) |
| `POSTGRES_PASSWORD` | jitsu-configurator-railway | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | jitsu-server-railway | 8001 |
| `POSTGRES_USER` | jitsu-server-railway | (secret) |
| `JITSU_LOG_LEVEL` | jitsu-server-railway | debug |
| `JITSU_AUTH_SECRET` | jitsu-server-railway | (secret) |
| `POSTGRES_PASSWORD` | jitsu-server-railway | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/jitsu)
