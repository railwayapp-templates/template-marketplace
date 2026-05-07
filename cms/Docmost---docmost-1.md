# Deploy Docmost on Railway

Self-hosted Notion alternative with real-time collaborative editing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docmost-1)

## About

Docmost is an open-source collaborative wiki and documentation platform - a self-hosted alternative to Notion and Confluence. With real-time editing, nested pages, multiple workspaces, and granular permissions, Docmost gives teams full control over their knowledge base without vendor lock-in.

The core platform is free and open-source under AGPL-3.0, giving you complete flexibility without per-seat pricing. Hosting Docmost on Railway provisions all three required services automatically - the Docmost app, PostgreSQL for data storage, and Redis for real-time collaboration so you get a fully working instance in minutes. Railway gives every new user a $5 free trial when signing up with GitHub, enough to run Docmost free for about a month before committing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| docmost-railway-template | [Amritasha/docmost-railway-template](https://github.com/Amritasha/docmost-railway-template) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `APP_URL` | docmost-railway-template | - | App URL |
| `NODE_ENV` | docmost-railway-template | production | - |
| `REDIS_URL` | docmost-railway-template | - | Redis URL |
| `APP_SECRET` | docmost-railway-template | (secret) | Super secret api key |
| `DATABASE_URL` | docmost-railway-template | - | Database url for postgres |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** CMS · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/docmost-1)
