# Deploy Omnicon on Railway

Multi-channel messaging SaaS built on the WhatsApp Cloud API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omnicon)

## About

Hosting Omnicon on Railway involves deploying the application service, attaching a PostgreSQL database, and configuring environment variables for API credentials and webhooks. After deployment, set the webhook URL, connect phone numbers, and enable messaging features. Railway manages builds, networking, logs, and scaling so the platform can run in production without manual server setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Application | `engineforge/omnicon:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Application | 8080 |
| `NODE_ENV` | Application | production |
| `LOG_LEVEL` | Application | info |
| `DB_POOL_MAX` | Application | 20 |
| `SESSION_SECRET` | Application | (secret) |
| `DB_IDLE_TIMEOUT` | Application | 30000 |
| `DB_CONNECTION_TYPE` | Application | tcp |
| `DB_CONNECTION_TIMEOUT` | Application | 10000 |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | Application | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/omnicon)
