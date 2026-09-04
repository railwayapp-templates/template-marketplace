# Deploy Standard Notes on Railway

End-to-end encrypted notes app with web, desktop and mobile clients

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/standard-notes)

## About

Standard Notes is an open-source, end-to-end encrypted notes app. Everything you write is encrypted on your device before it leaves, so the server holds ciphertext and nothing else — it cannot read your notes, and nor can anyone who reaches the database. The apps run on desktop, mobile and the web, and all sync through one server you can run yourself.

Deploy Standard Notes on Railway and you get that server plus the official web app, wired together. The `standardnotes` service runs the API gateway, the auth, syncing, revisions and files servers and their four workers behind one HTTPS origin. `MySQL` stores accounts, encrypted items and revisions, `Redis` holds sessions and cross-service tokens, and `localstack` provides the SNS topics and SQS queues the servers hand work to the workers through. `web` serves the browser client, pointed at your server. Sources: [standardnotes/server](https://github.com/standardnotes/server), [standardnotes/app](https://github.com/standardnotes/app).

![Standard Notes web and sync services above LocalStack, MySQL and Redis](https://res.cloudinary.com/rroe4rtk/image/upload/v1788498524/standard-notes-architecture.png)

Standard Notes is built for people who want their notes to outlive any single company: an open format, an open protocol, and a server anyone can run. Self-hosting keeps your notes off a third party's infrastructure — and because encryption is client-side, even the server's operator cannot read them.

- End-to-end encrypted notes, tags, nested folders and file attachments
- Clients for web, desktop, iOS and Android, plus a clipper
- Note version history for recovering an earlier draft
- Two-factor authentication, passkeys and per-device sessions
- Plain-text, Markdown and Super editors

The API gateway is the only HTTP entry point: it validates every session and proxies to the others internally. The syncing server owns your encrypted items, auth owns accounts and sessions, revisions keeps note history, and the files server streams attachments to and from disk. Each has a worker taking background jobs off a queue instead of blocking your sync.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [gridalpha/standard-notes-railway](https://github.com/gridalpha/standard-notes-railway) | Web service |
| localstack | [gridalpha/standard-notes-railway](https://github.com/gridalpha/standard-notes-railway) | Worker |
| Redis | `redis:8.2` | Database |
| MySQL | `mysql:9.4` | Database |
| standardnotes | [gridalpha/standard-notes-railway](https://github.com/gridalpha/standard-notes-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | web | 8080 | Port nginx serves the client on |
| `SYNC_SERVER_URL` | web | - | Sync server the client uses |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | web | 1 | Size nginx workers from the container |
| `PORT` | localstack | 4566 | Gateway port probed by the health check |
| `LS_LOG` | localstack | warn | Log verbosity |
| `SERVICES` | localstack | sns,sqs | Only the emulated services needed |
| `DISABLE_EVENTS` | localstack | 1 | Disable usage analytics |
| `GATEWAY_LISTEN` | localstack | 0.0.0.0:4566 | Address the gateway binds |
| `EAGER_SERVICE_LOADING` | localstack | 1 | Start SNS and SQS at boot |
| `SKIP_SSL_CERT_DOWNLOAD` | localstack | 1 | No outbound certificate fetch |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias for the superuser |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the entrypoint |
| `PORT` | standardnotes | 8080 | Port Caddy serves the app on |
| `DB_HOST` | standardnotes | - | Private MySQL hostname |
| `DB_PORT` | standardnotes | - | MySQL port |
| `DB_TYPE` | standardnotes | mysql | Database driver |
| `REDIS_URL` | standardnotes | - | Redis connection string |
| `CACHE_TYPE` | standardnotes | redis | Cache backend |
| `REDIS_HOST` | standardnotes | - | Private Redis hostname |
| `REDIS_PORT` | standardnotes | - | Redis port |
| `DB_DATABASE` | standardnotes | - | Database name |
| `DB_PASSWORD` | standardnotes | (secret) | MySQL password |
| `DB_USERNAME` | standardnotes | (secret) | MySQL user |
| `DB_DEBUG_LEVEL` | standardnotes | error | TypeORM log level |
| `GRANT_PRO_PLAN` | standardnotes | true | Grant accounts server-side premium features |
| `AUTH_JWT_SECRET` | standardnotes | (secret) | Signs session tokens |
| `VALET_TOKEN_SECRET` | standardnotes | (secret) | Signs file upload tokens |
| `PUBLIC_FILES_SERVER_URL` | standardnotes | - | Public attachment host |
| `AUTH_SERVER_SNS_ENDPOINT` | standardnotes | - | Auth event publisher |
| `AUTH_SERVER_SQS_ENDPOINT` | standardnotes | - | Auth queue endpoint |
| `AUTH_SERVER_COOKIE_DOMAIN` | standardnotes | - | Session cookie scope |
| `AUTH_SERVER_SQS_QUEUE_URL` | standardnotes | - | Auth worker queue |
| `FILES_SERVER_SNS_ENDPOINT` | standardnotes | - | Files event publisher |
| `FILES_SERVER_SQS_ENDPOINT` | standardnotes | - | Files queue endpoint |
| `FILES_SERVER_SQS_QUEUE_URL` | standardnotes | - | Files worker queue |
| `SYNCING_SERVER_SNS_ENDPOINT` | standardnotes | - | Syncing event publisher |
| `SYNCING_SERVER_SQS_ENDPOINT` | standardnotes | - | Syncing queue endpoint |
| `SYNCING_SERVER_SQS_QUEUE_URL` | standardnotes | - | Syncing worker queue |
| `REVISIONS_SERVER_SNS_ENDPOINT` | standardnotes | - | Revisions event publisher |
| `REVISIONS_SERVER_SQS_ENDPOINT` | standardnotes | - | Revisions queue endpoint |
| `REVISIONS_SERVER_SQS_QUEUE_URL` | standardnotes | - | Revisions worker queue |
| `AUTH_SERVER_ENCRYPTION_SERVER_KEY` | standardnotes | - | Must be 64 hex characters |
| `AUTH_SERVER_PSEUDO_KEY_PARAMS_KEY` | standardnotes | - | Hides unknown-account lookups |
| `AUTH_SERVER_DISABLE_USER_REGISTRATION` | standardnotes | false | Set true to close signups |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/_localstack/health`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthcheck`
- **Volume:** `/opt/shared`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/standard-notes)
