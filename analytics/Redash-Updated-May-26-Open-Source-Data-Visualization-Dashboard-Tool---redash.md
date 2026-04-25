# Deploy Redash [Updated May ’26] (Open-Source Data Visualization & Dashboard Tool) on Railway

Redash [May ’26] (Query, Visualize & Share Data Insights) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redash)

## About

Redash is a powerful, open-source data visualization and analytics platform that helps you turn your raw data into insightful dashboards and reports. It enables teams to connect to multiple data sources, run SQL queries, visualize data with stunning charts, and share insights effortlessly - all in a collaborative environment.

You can self-host Redash on Railway to gain full control over your analytics environment, data connections, and security configurations. By hosting Redash on Railway, you can run queries, generate dashboards, and share analytics in a secure, cost-effective, and managed cloud setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| railway-redash | [Shinyduo/railway-redash](https://github.com/Shinyduo/railway-redash) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDASH_LOG_LEVEL` | railway-redash | INFO |
| `REDASH_MULTI_ORG` | railway-redash | false |
| `REDASH_SECRET_KEY` | railway-redash | (secret) |
| `REDASH_COOKIE_SECRET` | railway-redash | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/redash)
