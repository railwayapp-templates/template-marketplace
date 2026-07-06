# Deploy Libredesk - Complete Setup on Railway

[Jul'26] Complete self-hosted omnichannel customer support desk.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libredesk-complete-setup)

## About

Libredesk is a modern, open-source, self-hosted omnichannel customer support desk. It helps you manage customer conversations from live chat, email, and other support channels in one unified inbox, with support for automation, team workflows, webhooks, and API-based integrations.

Hosting Libredesk on Railway gives you a ready-to-use self-hosted customer support desk without manually configuring servers, databases, Redis, networking, or deployment pipelines. This template includes the Libredesk application, PostgreSQL, and Redis, so the required backend services are already included for conversations, queues, notifications, webhooks, automation rules, and support desk data.

This is a complete setup template. After deployment succeeds, you only need to open the generated Railway URL and log in using the default system account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Libredesk | `libredesk/libredesk:latest` | Web service |
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
| `PORT` | Libredesk | 9000 | - |
| `PASSWORD` | Libredesk | (secret) | - |
| `LIBREDESK_APP__ENV` | Libredesk | prod | - |
| `LIBREDESK_DB__PORT` | Libredesk | 5432 | - |
| `LIBREDESK_DB__USER` | Libredesk | (secret) | - |
| `LIBREDESK_DB__PASSWORD` | Libredesk | (secret) | - |
| `LIBREDESK_DB__SSL_MODE` | Libredesk | disable | - |
| `LIBREDESK_APP__LOG_LEVEL` | Libredesk | debug | - |
| `LIBREDESK_UPLOAD__PROVIDER` | Libredesk | fs | - |
| `LIBREDESK_WEBHOOK__TIMEOUT` | Libredesk | 15s | - |
| `LIBREDESK_WEBHOOK__WORKERS` | Libredesk | 5 | - |
| `LIBREDESK_APP__CHECK_UPDATES` | Libredesk | true | - |
| `LIBREDESK_UPLOAD__FS__EXPIRY` | Libredesk | 1h | - |
| `LIBREDESK_WEBHOOK__QUEUE_SIZE` | Libredesk | 10000 | - |
| `LIBREDESK_APP__SERVER__ADDRESS` | Libredesk | 0.0.0.0:9000 | - |
| `LIBREDESK_SYSTEM_USER_PASSWORD` | Libredesk | (secret) | - |
| `LIBREDESK_UPLOAD__FS__UPLOAD_PATH` | Libredesk | uploads | - |
| `LIBREDESK_AUTOMATION__WORKER_COUNT` | Libredesk | 10 | - |
| `LIBREDESK_NOTIFICATION__QUEUE_SIZE` | Libredesk | 2000 | - |
| `LIBREDESK_SLA__EVALUATION_INTERVAL` | Libredesk | 5m | - |
| `LIBREDESK_APP__SERVER__READ_TIMEOUT` | Libredesk | 5s | - |
| `LIBREDESK_NOTIFICATION__CONCURRENCY` | Libredesk | 2 | - |
| `LIBREDESK_APP__SERVER__MAX_BODY_SIZE` | Libredesk | 104857600 | - |
| `LIBREDESK_APP__SERVER__WRITE_TIMEOUT` | Libredesk | 5s | - |
| `LIBREDESK_MESSAGE__INCOMING_QUEUE_SIZE` | Libredesk | 5000 | - |
| `LIBREDESK_MESSAGE__OUTGOING_QUEUE_SIZE` | Libredesk | 5000 | - |
| `LIBREDESK_APP__SERVER__READ_BUFFER_SIZE` | Libredesk | 65536 | - |
| `LIBREDESK_APP__SERVER__SESSION_LIFETIME` | Libredesk | 9h | - |
| `LIBREDESK_APP__SERVER__KEEPALIVE_TIMEOUT` | Libredesk | 10s | - |
| `LIBREDESK_CONVERSATION__UNSNOOZE_INTERVAL` | Libredesk | 5m | - |
| `LIBREDESK_MESSAGE__INCOMING_QUEUE_WORKERS` | Libredesk | 10 | - |
| `LIBREDESK_MESSAGE__OUTGOING_QUEUE_WORKERS` | Libredesk | 10 | - |
| `LIBREDESK_AUTOASSIGNER__AUTOASSIGN_INTERVAL` | Libredesk | 5m | - |
| `LIBREDESK_CONVERSATION__CONTINUITY_SCAN_INTERVAL` | Libredesk | 5m | - |
| `LIBREDESK_CONVERSATION__DRAFT_RETENTION_DURATION` | Libredesk | 360h | - |
| `LIBREDESK_MESSAGE__MESSAGE_OUTGOING_SCAN_INTERVAL` | Libredesk | 100ms | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `sh -c './libredesk --install --idempotent-install --yes --config="" && ./libredesk --upgrade --yes --config="" && ./libredesk --config=""'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/libredesk/uploads`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/libredesk-complete-setup)
