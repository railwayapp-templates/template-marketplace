# Deploy Unthread WhatsApp Bot on Railway

Deploy and Host Unthread WhatsApp Bot with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/unthread-whatsapp-bot)

## About

The Unthread WhatsApp Bot is an official Unthread extension that connects a Twilio WhatsApp number to Unthread's support ticketing system. Incoming customer messages automatically become support tickets in Unthread, while agent replies and ticket status updates are delivered back to customers on WhatsApp.

Hosting the Unthread WhatsApp Bot on Railway involves deploying the bot service alongside PostgreSQL and two Redis instances. The bot receives inbound WhatsApp messages via Twilio webhooks, creates or updates customer records and conversations in Unthread, and sends outbound replies through Twilio. One Redis instance handles platform caching and storage, while the second serves as a webhook queue consumed from the companion unthread-webhook-server. PostgreSQL provides durable persistence for customer and conversation data. Railway manages service networking and environment variable injection, making the full-stack deployment easy to configure and scale.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis Platform | `redis:8.2.1` | Database |
| Redis Webhook | `redis:8.2.1` | Database |
| Webhook Server | `wgtechlabs/unthread-webhook-server:latest` | Worker |
| Postgres Platform | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| WhatsApp Bot | `wgtechlabs/unthread-whatsapp-bot:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis Platform | 6379 | - |
| `REDISUSER` | Redis Platform | default | - |
| `REDIS_URL` | Redis Platform | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis Platform | (secret) | - |
| `REDIS_PASSWORD` | Redis Platform | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis Platform | - | Connection string for connecting to redis externally |
| `REDISPORT` | Redis Webhook | 6379 | - |
| `REDISUSER` | Redis Webhook | default | - |
| `REDIS_URL` | Redis Webhook | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis Webhook | (secret) | - |
| `REDIS_PASSWORD` | Redis Webhook | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis Webhook | - | Connection string for connecting to redis externally |
| `TARGET_PLATFORM` | Webhook Server | whatsapp | - |
| `UNTHREAD_WEBHOOK_SECRET` | Webhook Server | (secret) | - |
| `POSTGRES_DB` | Postgres Platform | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres Platform | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres Platform | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres Platform | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres Platform | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | WhatsApp Bot | 3000 | Application port used by the bot service |
| `NODE_ENV` | WhatsApp Bot | production | Environment mode for Railway deployments; keep as production |
| `REDIS_URL` | WhatsApp Bot | - | Redis for platform caching; optional but recommended |
| `POSTGRES_URL` | WhatsApp Bot | - | Auto-configured PostgreSQL connection URL |
| `UNTHREAD_API_KEY` | WhatsApp Bot | (secret) | Get from the Unthread dashboard API settings; required |
| `TWILIO_AUTH_TOKEN` | WhatsApp Bot | (secret) | Get from the Twilio Console auth token; required |
| `WEBHOOK_REDIS_URL` | WhatsApp Bot | - | Redis URL for webhook queue processing; required for agent replies |
| `TWILIO_ACCOUNT_SID` | WhatsApp Bot | - | Get from the Twilio Console account SID; required |
| `TWILIO_WHATSAPP_NUMBER` | WhatsApp Bot | - | Your Twilio WhatsApp-enabled sender in whatsapp:+123456789 format; required |
| `UNTHREAD_WEBHOOK_SECRET` | WhatsApp Bot | (secret) | Optional secret from Unthread webhook settings for request verification |
| `UNTHREAD_SLACK_CHANNEL_ID` | WhatsApp Bot | - | Target Slack channel ID in Unthread where tickets should be created; required |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/template/unthread-whatsapp-bot)
