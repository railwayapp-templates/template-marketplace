# Deploy Libredesk [Updated Sep '26] on Railway

Libredesk [Sep '26] (Self-Hosted Zendesk/Intercom Alternative)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libredesk-self-hosted)

## About

Libredesk is the open-source answer to Zendesk: a unified live chat, email, and help center inbox that ships as a single Go binary, with none of the per-agent billing. This template deploys its real 3-service architecture, verified live end-to-end against Libredesk's own official Docker Compose config.

Zendesk's Suite Team plan runs $55/agent/month billed annually, $69/month billed monthly, and Suite Professional jumps to $115/agent/month before AI or workforce add-ons stack on top. A 10-agent team pays $550-690/month before any of that. Self-hosting Libredesk on Railway flips that: a flat infrastructure cost regardless of how many agents you add.

There's a second reason beyond price: unlike most self-hosted support platforms, Libredesk is genuinely light. Live chat, email, a help center, automation, and SLA management all run from one binary, backed by just Postgres and Redis, not a sprawl of microservices.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17-alpine` | Database |
| libredesk | `libredesk/libredesk:latest` | Web service |
| redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | libredesk | Database name. |
| `POSTGRES_USER` | postgres | (secret) | Database user Libredesk connects as. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Database password. Auto-generated per deploy. |
| `PORT` | libredesk | 9000 | HTTP port the app listens on. Matches the service's public domain target port. |
| `LIBREDESK_APP__ENV` | libredesk | prod | Environment mode — prod disables the dev-only color logging. |
| `LIBREDESK_DB__HOST` | libredesk | - | Postgres private hostname. |
| `LIBREDESK_DB__PORT` | libredesk | 5432 | Postgres port. |
| `LIBREDESK_DB__USER` | libredesk | (secret) | Postgres user. |
| `LIBREDESK_REDIS__URL` | libredesk | - | Redis connection DSN. Overrides all other Redis config keys — do not also set LIBREDESK_REDIS__ADDRESS/LIBREDESK_REDIS__PASSWORD, they're a red herring from config.sample.toml that this build initially (wrongly) used. |
| `LIBREDESK_DB__DATABASE` | libredesk | - | Postgres database name. |
| `LIBREDESK_DB__PASSWORD` | libredesk | (secret) | Postgres password. |
| `LIBREDESK_DB__SSL_MODE` | libredesk | disable | SSL mode for the DB connection — Railway's private network doesn't need Postgres SSL. |
| `LIBREDESK_APP__ENCRYPTION_KEY` | libredesk | - | 32-character hex encryption key for stored secrets. Auto-generate — never leave the image's baked-in placeholder (your-32-char-random-string-here!) in place. |
| `LIBREDESK_SYSTEM_USER_PASSWORD` | libredesk | (secret) | Login password for the initial admin (System) account. Confirmed live: a password missing a special character makes install fail silently, and the app then logs a misleading database tables are missing error on the next boot, not a password-complexity warning. Save it — it isn't recoverable from the dashboard. |
| `REDISHOST` | redis | - | Redis's private network hostname, for services that need it directly instead of the full URL. |
| `REDISPORT` | redis | 6379 | Redis port. |
| `REDISUSER` | redis | default | Redis username — default, since this is a plain --requirepass setup, not Redis ACLs. |
| `REDIS_URL` | redis | - | Full connection DSN — this is what libredesk's LIBREDESK_REDIS__URL references. |
| `REDISPASSWORD` | redis | (secret) | Same password, exposed under Railway's conventional Redis variable naming for services that expect it. |
| `REDIS_PASSWORD` | redis | (secret) | Auth password Redis is started with (--requirepass). Auto-generated. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "(./libredesk --install --idempotent-install --yes || true) && (./libredesk --upgrade --yes || true) && exec ./libredesk"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/libredesk-self-hosted)
