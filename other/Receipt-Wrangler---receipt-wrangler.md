# Deploy Receipt Wrangler on Railway

Scan, categorise and split receipts: self-hosted receipt tracking with OCR

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/receipt-wrangler)

## About

Receipt Wrangler turns a photo of a receipt into structured data you can share. Upload or email a
receipt, let OCR (or an AI provider you configure) pull out the merchant, date, total and line
items, categorise and tag it, split it across a group, and track who owes whom. It has a web app,
iOS/Android apps, per-group permissions, custom fields, exports and an optional MCP server. This is
a community-maintained template and is not affiliated with the Receipt Wrangler project.

Receipt Wrangler is licensed under the **AGPL-3.0**. If you let other people use your deployment
over a network, you are responsible for offering them the corresponding source; the template
deploys the upstream release unmodified and links to it.

Three Railway services:

- **receipt-wrangler** — the upstream monolith (Go API + Angular web app behind nginx) from a
  version-pinned wrapper image, `ghcr.io/youssefsiam38/receipt-wrangler-railway`. It takes the
  public HTTPS domain on port 80 and a volume for receipt images.
- **Postgres** — Railway PostgreSQL, private network only.
- **Redis** — Railway Redis, private network only; the background job queue (OCR, email polling,
  scheduled tasks) needs it.

Receipt Wrangler creates a default `admin` / `admin` administrator the first time it starts. The
wrapper replaces that password with a per-deployment generated one **before** nginx, the public
listener, is ever started, so the default credentials are never reachable from the internet. Sign
in the first time with the generated password from the service variables, then change it in the
app; the wrapper will not revert your choice. Self-registration is off by default upstream.

The healthcheck targets `/api/featureConfig`, which is proxied to the API, so a deployment only goes
live once the API is answering and migrations are done. Schema migrations run automatically at
start. The service runs a single replica with a volume, so redeploys have a few seconds of downtime.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| receipt-wrangler | `ghcr.io/youssefsiam38/receipt-wrangler-railway:1.0.6` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | receipt-wrangler | 80 | Port nginx serves on inside the container. Leave at 80. |
| `DB_HOST` | receipt-wrangler | - | PostgreSQL host over Railway's private network. |
| `DB_NAME` | receipt-wrangler | - | PostgreSQL database name, taken from the Postgres service. |
| `DB_PORT` | receipt-wrangler | 5432 | PostgreSQL port. |
| `DB_USER` | receipt-wrangler | (secret) | PostgreSQL user, taken from the Postgres service. |
| `DB_ENGINE` | receipt-wrangler | postgresql | Database engine. Keep postgresql for this template. |
| `REDIS_HOST` | receipt-wrangler | - | Redis host over Railway's private network; Redis runs the OCR and email jobs. |
| `REDIS_PORT` | receipt-wrangler | 6379 | Redis port. |
| `SECRET_KEY` | receipt-wrangler | (secret) | Signs session tokens. Generated per deployment; changing it signs everyone out. |
| `DB_PASSWORD` | receipt-wrangler | (secret) | PostgreSQL password, taken from the Postgres service. |
| `ENCRYPTION_KEY` | receipt-wrangler | - | Encrypts third-party credentials stored in the database (SMTP, AI provider keys, API keys). Generated per deployment; changing it makes stored credentials unreadable. |
| `REDIS_PASSWORD` | receipt-wrangler | (secret) | Redis password, taken from the Redis service. |
| `APP_READY_TIMEOUT` | receipt-wrangler | 300 | Seconds the wrapper waits for the API during the pre-start phase that sets the administrator password. |
| `RW_ADMIN_PASSWORD` | receipt-wrangler | (secret) | Replaces Receipt Wrangler's built-in admin/admin password before the app is exposed. Reveal it here to sign in the first time, then change it in the app; this variable is ignored afterwards. |
| `RW_ADMIN_USERNAME` | receipt-wrangler | (secret) | The administrator account whose password is replaced on first start. Upstream always creates "admin". |
| `REDISPORT` | Redis | 6379 | Redis port. |
| `REDISUSER` | Redis | default | Redis user. |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Database name created on first start. |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser created on first start. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Healthcheck:** `/api/featureConfig`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/receipt-wrangler-api/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/receipt-wrangler)
