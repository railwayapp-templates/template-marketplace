# Deploy WhatsApp AI Business Hub on Railway

WhatsApp AI support, CRM inbox, and automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-ai-business-hub)

## About

This stack runs an API + admin UI with PostgreSQL and Redis. With RUN_WORKER_IN_API=true, message workers run inside the API service. Demo mode works without WhatsApp keys so you can test the inbox immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| whatsapp-ai-business | [hammad129/whatsapp-ai-business](https://github.com/hammad129/whatsapp-ai-business) | Worker |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEMO_MODE` | whatsapp-ai-business | true | Set true to test simulated WhatsApp messages without Meta credentials. |
| `REDIS_URL` | whatsapp-ai-business | - | Redis connection URL. Keep the Redis plugin reference. |
| `DATABASE_URL` | whatsapp-ai-business | - | Postgres connection URL. Keep the Postgres plugin reference. |
| `ADMIN_PASSWORD` | whatsapp-ai-business | (secret) | Password used to log into the admin dashboard. |
| `OPENAI_API_KEY` | whatsapp-ai-business | (secret) | Optional OpenAI API key for AI replies. Leave empty for FAQ fallback. |
| `SESSION_SECRET` | whatsapp-ai-business | (secret) | Long random string used to sign login cookies. |
| `WHATSAPP_TOKEN` | whatsapp-ai-business | (secret) | Meta WhatsApp Cloud API access token. Leave empty for demo mode. |
| `RUN_WORKER_IN_API` | whatsapp-ai-business | true | Keep true so workers run inside the API service. |
| `WHATSAPP_VERIFY_TOKEN` | whatsapp-ai-business | (secret) | Must match the verify token in Meta webhook settings. |
| `WHATSAPP_PHONE_NUMBER_ID` | whatsapp-ai-business | - | whats app phone number id |
| `REDISHOST` | Redis | - | 	 Redis server hostname. Provided automatically by the Railway Redis plugin. |
| `REDISPORT` | Redis | 6379 | Redis server port. Provided automatically by the Railway Redis plugin. |
| `REDISUSER` | Redis | default | Redis username. Provided automatically by the Railway Redis plugin. |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | 	 Redis password. Provided automatically by the Railway Redis plugin. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password (alternate key). Provided automatically by the Railway Redis plugin. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/whatsapp-ai-business-hub)
