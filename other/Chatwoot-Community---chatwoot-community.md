# Deploy Chatwoot Community on Railway

The modern customer support tool for your business

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-community)

## About

Chatwoot is the modern, open-source, self-hosted customer support platform. It brings live chat, email, and other customer channels into one shared workspace, and includes tools like a help center and shared inbox so teams can support customers while keeping control of their data.

Hosting Chatwoot Community on Railway gives you a straightforward way to run your own customer support workspace without building the deployment from scratch. This template packages the application in a Railway-friendly setup, exposes it through a public domain, and provides the production configuration needed to get started faster. It is a practical starting point for teams that want the self-hosted Chatwoot experience on their own infrastructure, with the flexibility to configure inboxes, channels, agents, automations, and help center content over time. Railway handles the infrastructure layer so you can focus on support operations instead of manual setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Chatwoot | `ghcr.io/hosmelq/railway-chatwoot-template` | Web service |
| Redis | `redis:8.6.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Chatwoot | 8080 | Internal app port. |
| `NODE_ENV` | Chatwoot | production | Node.js runtime environment. |
| `RAILS_ENV` | Chatwoot | production | Rails runtime environment. |
| `REDIS_URL` | Chatwoot | - | Redis connection URL. |
| `DATABASE_URL` | Chatwoot | - | Primary Postgres connection URL. |
| `FRONTEND_URL` | Chatwoot | - | Public URL of your Chatwoot instance. |
| `SECRET_KEY_BASE` | Chatwoot | (secret) | Rails secret key base. |
| `INSTALLATION_ENV` | Chatwoot | docker | Chatwoot installation environment. |
| `ACTIVE_STORAGE_SERVICE` | Chatwoot | local | Attachment storage backend. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/chatwoot-community)
