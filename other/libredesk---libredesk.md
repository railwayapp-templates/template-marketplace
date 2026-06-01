# Deploy libredesk on Railway

Modern, open source, self-hosted omnichannel customer support desk.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libredesk)

## About

Libredesk is a modern, open source, self-hosted omnichannel customer support desk. Live chat, email, automation, SLA management, CSAT surveys, and AI-assisted responses - all packed into a single binary.

Deploying libredesk on railway is very easy and just needs one variable to be set for deploying.

This template deploys Libredesk with PostgreSQL and Redis pre-configured. On first deploy, the database schema is installed and an admin user is created with the password you provide. Upgrades are automatic - just redeploy with the latest image and migrations run on startup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17-alpine` | Database |
| libredesk | `libredesk/libredesk:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | libredesk | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | libredesk | 9000 | Libredesk http server port |
| `LIBREDESK_APP__ENV` | libredesk | prod | Environment either prod / dev |
| `LIBREDESK_DB__HOST` | libredesk | - | Hostname for database |
| `LIBREDESK_DB__PORT` | libredesk | 5432 | Database port |
| `LIBREDESK_DB__USER` | libredesk | (secret) | DB user |
| `LIBREDESK_REDIS__URL` | libredesk | - | Redis connection url (DSN) |
| `LIBREDESK_DB__DATABASE` | libredesk | - | Database name |
| `LIBREDESK_DB__PASSWORD` | libredesk | (secret) | Database password |
| `LIBREDESK_DB__SSL_MODE` | libredesk | disable | SSL mode for database connection |
| `LIBREDESK_APP__LOG_LEVEL` | libredesk | debug | Log level: info, debug, warn, error, fatal |
| `LIBREDESK_UPLOAD__PROVIDER` | libredesk | fs | File upload provider to use, either `fs` or `s3` |
| `LIBREDESK_WEBHOOK__TIMEOUT` | libredesk | 15s | HTTP timeout for webhook requests |
| `LIBREDESK_WEBHOOK__WORKERS` | libredesk | 5 | Number of webhook delivery workers |
| `LIBREDESK_APP__CHECK_UPDATES` | libredesk | true | Whether to automatically check for application updates on start up, app updates are shown as a banner in the admin panel |
| `LIBREDESK_UPLOAD__FS__EXPIRY` | libredesk | 1h | Signed URL expiry duration (e.g., "30m", "1h"). Defaults to 1h if unset |
| `LIBREDESK_APP__ENCRYPTION_KEY` | libredesk | - | Libredesk encryption key |
| `LIBREDESK_WEBHOOK__QUEUE_SIZE` | libredesk | 10000 | Maximum number of webhook deliveries that can be queued |
| `LIBREDESK_APP__SERVER__ADDRESS` | libredesk | 0.0.0.0:9000 | Address on which the libredesk http server listens to |
| `LIBREDESK_SYSTEM_USER_PASSWORD` | libredesk | (secret) | Set a password with at least 10 characters. It must include an uppercase letter, a lowercase letter, a number, and a special character. For example: MyPassword@123. Save this password somewhere safe before deploying. Once your deployment is live, open your deployment URL and log in using the email `System` and the password you set here. |
| `LIBREDESK_UPLOAD__FS__UPLOAD_PATH` | libredesk | uploads | Directory where uploaded files are stored, make sure this directory exists and is writable by the application |
| `LIBREDESK_AUTOMATION__WORKER_COUNT` | libredesk | 10 | Number of workers processing automation rules |
| `LIBREDESK_NOTIFICATION__QUEUE_SIZE` | libredesk | 2000 | Maximum number of notifications that can be queued |
| `LIBREDESK_SLA__EVALUATION_INTERVAL` | libredesk | 5m | How often to evaluate SLA compliance for conversations |
| `LIBREDESK_APP__SERVER__READ_TIMEOUT` | libredesk | 5s | Request read timeout |
| `LIBREDESK_NOTIFICATION__CONCURRENCY` | libredesk | 2 | Number of concurrent notification workers |
| `LIBREDESK_APP__SERVER__MAX_BODY_SIZE` | libredesk | 104857600 | Maximum request body size in bytes (100MB). If you are using proxy, you may need to configure them to allow larger request bodies |
| `LIBREDESK_APP__SERVER__WRITE_TIMEOUT` | libredesk | 5s | Request write timeout |
| `LIBREDESK_MESSAGE__INCOMING_QUEUE_SIZE` | libredesk | 5000 | Maximum number of messages that can be queued for incoming processing |
| `LIBREDESK_MESSAGE__OUTGOING_QUEUE_SIZE` | libredesk | 5000 | Maximum number of messages that can be queued for outgoing processing |
| `LIBREDESK_APP__SERVER__READ_BUFFER_SIZE` | libredesk | 65536 | Size of the read buffer for incoming requests (also limits max header size) |
| `LIBREDESK_APP__SERVER__SESSION_LIFETIME` | libredesk | 9h | Session lifetime duration |
| `LIBREDESK_APP__SERVER__KEEPALIVE_TIMEOUT` | libredesk | 10s | Keepalive timeout |
| `LIBREDESK_CONVERSATION__UNSNOOZE_INTERVAL` | libredesk | 5m | How often to check for conversations to unsnooze |
| `LIBREDESK_MESSAGE__INCOMING_QUEUE_WORKERS` | libredesk | 10 | Number of workers processing incoming message queue |
| `LIBREDESK_MESSAGE__OUTGOING_QUEUE_WORKERS` | libredesk | 10 | Number of workers processing outgoing message queue |
| `LIBREDESK_AUTOASSIGNER__AUTOASSIGN_INTERVAL` | libredesk | 5m | How often to run automatic conversation assignment |
| `LIBREDESK_CONVERSATION__CONTINUITY_SCAN_INTERVAL` | libredesk | 5m | How often to check for offline conversations in database to send continuity emails |
| `LIBREDESK_CONVERSATION__DRAFT_RETENTION_DURATION` | libredesk | 360h | How long to keep drafts before deleting them from the database (e.g. "360h", "48h") |
| `LIBREDESK_MESSAGE__MESSAGE_OUTGOING_SCAN_INTERVAL` | libredesk | 100ms | How often to scan for outgoing messages to process, keep it low to process messages quickly |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Volume:** `/var/lib/postgresql/data/pgdata `
- **Start command:** `/bin/sh -c "(./libredesk --install --idempotent-install --yes || true) && (./libredesk --upgrade --yes || true) && exec ./libredesk"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/libredesk/uploads`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/libredesk)
