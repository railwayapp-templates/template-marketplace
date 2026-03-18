# Deploy Chatwoot on Railway

A customer communication platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/chatwoot)

## About

Chatwoot is an open-source customer engagement platform that provides live chat, email support, and omnichannel communication capabilities. It's a comprehensive customer support solution that enables businesses to manage conversations across multiple channels including website chat, Facebook Messenger, WhatsApp, Twitter, Telegram, and email from a single unified inbox. Chatwoot focuses on delivering exceptional customer experiences while providing powerful automation, analytics, and team collaboration features.

Hosting Chatwoot gives you access to a complete customer engagement platform that manages real-time conversations, automates customer support workflows, and provides detailed analytics on customer interactions. Chatwoot offers live chat widgets, chatbot integration, canned responses, file sharing, conversation assignment, and comprehensive reporting dashboards. The platform excels at centralizing customer communications, reducing response times, and improving customer satisfaction through efficient support workflows. Chatwoot deployments benefit from Railway's SSL certificates, scalable hosting infrastructure for handling high conversation volumes, and reliable uptime for 24/7 customer support operations. Railway provides database backup capabilities and monitoring tools to ensure your customer data and conversation history remain secure and accessible.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg16` | Database |
| Chatwoot | `ghcr.io/railwayapp-templates/chatwoot:Community` | Web service |
| Valkey | `valkey/valkey:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | Chatwoot | production | Run in production mode |
| `RAILS_ENV` | Chatwoot | production | Run in production mode |
| `REDIS_URL` | Chatwoot | - | The Redis database Chatwoot will connect to |
| `DATABASE_URL` | Chatwoot | - | The Postgres database Chatwoot will connect to |
| `FRONTEND_URL` | Chatwoot | - | Frontend URL |
| `DEFAULT_LOCALE` | Chatwoot | en | The Default locale |
| `SECRET_KEY_BASE` | Chatwoot | (secret) | Super secret key |
| `INSTALLATION_ENV` | Chatwoot | docker | Let Chatwoot know its running in Docker |
| `ACTIVE_STORAGE_SERVICE` | Chatwoot | local | Default storage type (uses volumes) |
| `VALKEY_URL` | Valkey | - | Private database URL |
| `VALKEY_HOST` | Valkey | - | Private hostname |
| `VALKEY_PORT` | Valkey | 6379 | Private port |
| `VALKEY_USER` | Valkey | (secret) | Default username |
| `VALKEY_PASSWORD` | Valkey | (secret) | Authentication password |
| `VALKEY_PUBLIC_URL` | Valkey | - | Public database URL |
| `VALKEY_PUBLIC_HOST` | Valkey | - | Public hostname |
| `VALKEY_PUBLIC_PORT` | Valkey | - | Public port |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --port ${VALKEY_PORT} --requirepass ${VALKEY_PASSWORD}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/chatwoot)
