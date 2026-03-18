# Deploy YASES - Yet Another SES Wrapper on Railway

A self-hosted email service built on AWS SES with a nice dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deployyases-yet-another-ses-wrapper)

## About

A self-hosted email service built on AWS SES with a beautiful dashboard for managing identities, tracking deliveries, and handling bounces. Once deployed and connected to your AWS SES account, you get a simple REST API for sending emails, automatic bounce and complaint handling via SNS webhooks, real-time delivery analytics, and a web dashboard for managing sending domains, suppression lists, and API keys.

Source code: https://github.com/valtlfelipe/yases

This template is ready to use, you just need some ENV variables. Railway will take care of the rest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| worker | `ghcr.io/valtlfelipe/yases:latest` | Worker |
| dashboard / api | `ghcr.io/valtlfelipe/yases:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `TOKEN_SECRET` | worker | (secret) | - |
| `BETTER_AUTH_SECRET` | worker | (secret) | Better Auth Secret |
| `DISPOSABLE_BLOCKLIST_URL` | worker | https://raw.githubusercontent.com/disposable/disposable-email-domains/master/domains.txt | - |
| `CREDENTIALS_ENCRYPTION_KEY` | worker | (secret) | Credentials encryption key |
| `AWS_REGION` | dashboard / api | us-east-1 | - |
| `EMAIL_QUEUE_CONCURRENCY` | dashboard / api | 10 | - |
| `DISPOSABLE_BLOCKLIST_URL` | dashboard / api | https://raw.githubusercontent.com/disposable/disposable-email-domains/master/domains.txt | - |
| `CREDENTIALS_ENCRYPTION_KEY` | dashboard / api | (secret) | Credentials encryption key |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `bun server/workers/index.ts`
- **Start command:** `bun /app/server/index.mjs`
- **Healthcheck:** `/health`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/deployyases-yet-another-ses-wrapper)
