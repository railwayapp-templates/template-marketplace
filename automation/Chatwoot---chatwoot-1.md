# Deploy Chatwoot on Railway

Self-hosted Intercom alternative — live chat, email, Whatsapp & team inbox.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-1)

## About

Chatwoot is an open-source customer support platform and self-hosted alternative to Intercom and Zendesk. Manage live chat, email, WhatsApp, Twitter, and Facebook conversations from a single dashboard. Free to self-host, with full control over your data and no per-agent pricing.

Hosting Chatwoot requires three components: the Rails web application, a Sidekiq background worker for processing jobs, and supporting services — PostgreSQL for data storage and Redis for queues and real-time features. This Railway template bundles the web app and Sidekiq into a single container for simplicity. On first boot, database migrations run automatically. You set one variables - `SECRET_KEY_BASE` - and Chatwoot is ready to use. For production teams, adding SMTP credentials enables email notifications, invites, and password resets.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| chatwoot-railway-template | [Amritasha/chatwoot-railway-template](https://github.com/Amritasha/chatwoot-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `SECRET_KEY_BASE` | chatwoot-railway-template | (secret) | run -> openssl rand -hex 64 to get the key |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/chatwoot-1)
