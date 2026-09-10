# Deploy chatbot-whatsapp on Railway

WhatsApp Gateway + Evolution API with multi-LLM bots

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatbot-whatsapp)

## About

One-click production stack: Evolution API (WhatsApp), Postgres, Redis, MySQL, and a ProfesIA-branded gateway UI with multi-LLM bots (Gemini, OpenAI, Claude, Groq).

This template provisions a full WhatsApp operations stack on Railway: Evolution API for WhatsApp sessions, a gateway UI for QR linking / chats / bots, plus Postgres, Redis, MySQL, and a persistent volume for device sessions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chatbot-whatsapp | [ProfesIA-IA/chatbot-whatsapp](https://github.com/ProfesIA-IA/chatbot-whatsapp) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| MySQL | `mysql:9.4` | Database |
| evolution-api | `evoapicloud/evolution-api:v2.3.7` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `NODE_ENV` | chatbot-whatsapp | production |
| `CORS_ORIGIN` | chatbot-whatsapp | * |
| `EVOLUTION_API_KEY` | chatbot-whatsapp | (secret) |
| `DEFAULT_ADMIN_USER` | chatbot-whatsapp | (secret) |
| `DEFAULT_ADMIN_PASSWORD` | chatbot-whatsapp | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `MYSQLPORT` | MySQL | 3306 |
| `MYSQLUSER` | MySQL | root |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | railway |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `PORT` | evolution-api | 8080 |
| `LANGUAGE` | evolution-api | es |
| `LOG_LEVEL` | evolution-api | ERROR,WARN,INFO |
| `SERVER_PORT` | evolution-api | 8080 |
| `SERVER_TYPE` | evolution-api | http |
| `DEL_INSTANCE` | evolution-api | false |
| `DATABASE_PROVIDER` | evolution-api | postgresql |
| `TELEMETRY_ENABLED` | evolution-api | false |
| `CACHE_LOCAL_ENABLED` | evolution-api | false |
| `CACHE_REDIS_ENABLED` | evolution-api | true |
| `AUTHENTICATION_API_KEY` | evolution-api | (secret) |
| `CACHE_REDIS_PREFIX_KEY` | evolution-api | evolution |
| `WEBHOOK_GLOBAL_ENABLED` | evolution-api | true |
| `DATABASE_SAVE_DATA_CHATS` | evolution-api | true |
| `DATABASE_SAVE_DATA_CONTACTS` | evolution-api | true |
| `DATABASE_SAVE_DATA_INSTANCE` | evolution-api | true |
| `DATABASE_SAVE_MESSAGE_UPDATE` | evolution-api | true |
| `WEBHOOK_EVENTS_QRCODE_UPDATED` | evolution-api | true |
| `DATABASE_SAVE_DATA_NEW_MESSAGE` | evolution-api | true |
| `WEBHOOK_EVENTS_MESSAGES_UPSERT` | evolution-api | true |
| `DATABASE_CONNECTION_CLIENT_NAME` | evolution-api | evolution_exchange |
| `WEBHOOK_EVENTS_CONNECTION_UPDATE` | evolution-api | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Volume:** `/evolution/instances`

**Category:** Bots · **Languages:** JavaScript, TypeScript, Dockerfile, Shell, CSS, HTML

[View on Railway →](https://railway.com/deploy/chatbot-whatsapp)
