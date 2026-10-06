# Deploy Automata | WhatsApp, Telegram, SQL MCP on Railway

WhatsApp, Telegram & Postgres MCP for Claude | Alt to Zapier, Composio

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/automata-or-whatsapp-telegram-sql-mcp)

## About

Automata is a self-hosted MCP server that connects Claude to your WhatsApp, Telegram and PostgreSQL. Link an account by QR code or paste a database URL, then issue connector tokens limited to specific chats, tables and tools. Teams share connections inside an organization, with roles, invitations and email alerts when a connection drops.

The template deploys the Automata web app (dashboard plus the `/mcp` endpoint), PostgreSQL, Evolution API with Redis for WhatsApp, and a Telegram bridge. Everything shares one Postgres, each part in its own schema, and the app runs its migrations at boot. After deploying, open the web app and sign up, which creates your organization. Then add a connection and mint a token. Paste the `/mcp/` URL into Claude as a custom connector. Telegram needs an API ID and hash from my.telegram.org. These are optional: without them, WhatsApp and SQL work normally. Add SMTP settings to send alert and invitation emails.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Automata MCP | `ghcr.io/ju-li/automata-mcp-web:1` | Web service |
| Redis | `redis:8.2` | Database |
| Automata MCP Telegram Bridge | `ghcr.io/ju-li/automata-mcp-telegram-bridge:1` | Worker |
| Evolution API | `evoapicloud/evolution-api:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NUXT_SMTP_TLS` | Automata MCP | false | false uses STARTTLS when offered (port 587); set true for implicit TLS (port 465) |
| `NUXT_MAIL_FROM` | Automata MCP | - | From address for alert and invitation emails. Must be one your SMTP provider accepts |
| `NUXT_SMTP_HOST` | Automata MCP | - | SMTP server hostname. Optional: leave empty and no email is sent (alerts stay queued, invitation links are still shown to copy) |
| `NUXT_SMTP_PORT` | Automata MCP | 587 | SMTP server port, usually 587 (STARTTLS) or 465 (TLS) |
| `NUXT_WEBHOOK_URL` | Automata MCP | - | URL Evolution posts WhatsApp connection events to, so disconnect alerts go out in seconds |
| `NUXT_DATABASE_URL` | Automata MCP | - | Postgres connection URL for the app's own data (users, organizations, connections, tokens). Required; migrated at boot |
| `NUXT_TELEGRAM_URL` | Automata MCP | - | Private URL of the Telegram bridge |
| `NUXT_EVOLUTION_URL` | Automata MCP | - | Private URL of the Evolution API, used for WhatsApp connections |
| `NUXT_SMTP_PASSWORD` | Automata MCP | (secret) | SMTP password or API key |
| `NUXT_SMTP_USERNAME` | Automata MCP | (secret) | SMTP user name |
| `NUXT_MAIL_FROM_NAME` | Automata MCP | Automata MCP | Sender name shown on outgoing emails |
| `NUXT_PUBLIC_APP_URL` | Automata MCP | - | Public URL of this app, used to build connector URLs and links in emails |
| `NUXT_WEBHOOK_SECRET` | Automata MCP | (secret) | Shared secret that Evolution and the Telegram bridge send with each webhook, generated at deploy. Keep it secret |
| `NUXT_TELEGRAM_ADMIN_KEY` | Automata MCP | - | Telegram bridge admin key, used only to create and delete Telegram sessions |
| `NUXT_EVOLUTION_ADMIN_KEY` | Automata MCP | - | Evolution global API key, used only to create and delete WhatsApp instances |
| `NUXT_TELEGRAM_DATABASE_URL` | Automata MCP | - | Postgres connection URL for reading synced Telegram chats (telegram schema). Opened read-only |
| `NUXT_EVOLUTION_DATABASE_URL` | Automata MCP | - | Postgres connection URL for reading WhatsApp messages (Evolution's tables). Opened read-only |
| `REDISHOST` | Redis | - | Private hostname of the Redis service, only reachable from other services in this project |
| `REDISPORT` | Redis | 6379 | Port Redis listens on |
| `REDISUSER` | Redis | default | Redis user name |
| `REDIS_URL` | Redis | - | Full private-network connection URL for Redis, used by Evolution API as its cache |
| `REDISPASSWORD` | Redis | (secret) | Same value as REDIS_PASSWORD, under the name some clients expect |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, generated at deploy. Keep it secret |
| `TELEGRAM_API_ID` | Automata MCP Telegram Bridge | - | Telegram API ID from my.telegram.org. Optional: leave both API fields empty to run without Telegram (WhatsApp and SQL still work). Set both or neither |
| `TELEGRAM_API_HASH` | Automata MCP Telegram Bridge | - | Telegram API hash from my.telegram.org (32 hex characters). Set together with TELEGRAM_API_ID, or leave both empty |
| `TELEGRAM_BRIDGE_PORT` | Automata MCP Telegram Bridge | 8095 | Port the bridge listens on. Fixed here because Railway injects PORT=8080; the app connects on 8095 |
| `TELEGRAM_BRIDGE_ADMIN_KEY` | Automata MCP Telegram Bridge | - | Admin key the app uses only to create and delete Telegram sessions, generated at deploy. Keep it secret |
| `TELEGRAM_BRIDGE_DATABASE_URL` | Automata MCP Telegram Bridge | - | Postgres connection URL. The bridge stores sessions and synced chats in its own telegram schema |
| `TELEGRAM_SESSION_ENCRYPTION_KEY` | Automata MCP Telegram Bridge | - | Encrypts stored Telegram sessions, generated at deploy. Never change or lose it: doing so unlinks every Telegram account |
| `SERVER_URL` | Evolution API | - | Public URL of the Evolution API, used in links it generates |
| `SERVER_PORT` | Evolution API | 8080 | Port Evolution listens on. Fixed here because Evolution reads SERVER_PORT, not Railway's PORT |
| `CACHE_REDIS_URI` | Evolution API | - | Redis connection URL for Evolution's cache, on the private network |
| `DATABASE_PROVIDER` | Evolution API | postgresql | Database engine Evolution stores sessions, chats and messages in |
| `TELEMETRY_ENABLED` | Evolution API | false | Turns off Evolution's anonymous usage telemetry |
| `CACHE_LOCAL_ENABLED` | Evolution API | false | Turns off the in-memory cache; Redis is used instead |
| `CACHE_REDIS_ENABLED` | Evolution API | true | Uses Redis as Evolution's cache |
| `AUTHENTICATION_API_KEY` | Evolution API | (secret) | Global admin key for Evolution, generated at deploy. Automata uses it only to create and delete WhatsApp instances. Keep it secret |
| `CACHE_REDIS_PREFIX_KEY` | Evolution API | evolution | Prefix for Evolution's keys in Redis |
| `WEBHOOK_GLOBAL_ENABLED` | Evolution API | false | Keep false. Automata registers a webhook per connection; enabling the global one delivers every event twice |
| `DATABASE_CONNECTION_URI` | Evolution API | - | Postgres connection URL. Evolution writes to the public schema of the shared database |
| `DATABASE_SAVE_DATA_CHATS` | Evolution API | true | Stores chats, used for the chat list and token scoping |
| `DATABASE_SAVE_DATA_CONTACTS` | Evolution API | true | Stores contacts, used to show names instead of phone numbers |
| `DATABASE_SAVE_DATA_HISTORIC` | Evolution API | true | Imports past conversations when a number is linked. Must be true before the QR code is scanned |
| `DATABASE_SAVE_DATA_INSTANCE` | Evolution API | true | Stores WhatsApp instance records |
| `DATABASE_SAVE_MESSAGE_UPDATE` | Evolution API | true | Stores message status updates such as delivered and read |
| `DATABASE_SAVE_DATA_NEW_MESSAGE` | Evolution API | true | Stores incoming and outgoing messages so Claude can read and search them |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/evolution/instances`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/automata-or-whatsapp-telegram-sql-mcp)
