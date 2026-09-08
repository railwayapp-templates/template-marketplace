# Deploy Teable on Railway

Airtable-style spreadsheet database with Postgres, Redis and file storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teable-2)

## About

[Teable](https://github.com/teableio/teable) is an Airtable-style spreadsheet database backed by private PostgreSQL and Redis, with persistent local attachments. Basic tables do not require a model-provider key or paid feature license.

[Deploy Teable on Railway](https://railway.com/deploy/teable-2)

This template deploys three container images directly. **No GitHub repository, source fork, or build setup is required.**

| Service | Image | Networking | Persistent mount |
| --- | --- | --- | --- |
| Teable | `ghcr.io/teableio/teable:release.2026-09-07T09-32-29Z.2963` | Public HTTPS to port 3000 | `/app/.assets` |
| PostgreSQL | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Private port 5432; no public TCP proxy | `/var/lib/postgresql/data` |
| Redis | `redis:8.2` | Private port 6379; no public TCP proxy | `/data` |

Use one Teable replica with local attachment storage. First boot applies database migrations before starting the application. Allow up to 600 seconds for `/health`; upstream recommends at least 4 GB RAM and two CPU cores for the standalone stack.

### First deployment and account

1. Deploy all three services with their volumes. Check PostgreSQL and Redis startup as well as application health. Redis must be able to write AOF files under `/data`.
2. Create the first account before sharing the URL, using controlled access. **The first account becomes instance administrator.** There is no preset admin password; a teable.ai cloud account does not authenticate to this instance.
3. Configure registration and invitations in the administrator UI before broader access. Do not assume an `ENABLE_SIGNUP` environment variable closes registration.
4. Create a base/table and row, edit and reload it, and verify row and attachment readback after restart. Confirm wrong-password and anonymous access behavior before storing sensitive data.

An automatically generated public domain is not an owner-only setup gate. If you cannot control the initial registration window, establish private ingress or an access gateway before exposing the app.

### Connection and session settings

- `DATABASE_URL` and `PRISMA_DATABASE_URL` reference `${{Postgres.DATABASE_URL}}`.
- `BACKEND_CACHE_PROVIDER=redis`; `BACKEND_CACHE_REDIS_URI` references `${{Redis.REDIS_URL}}`.
- Redis reference variables include `REDISUSER=default` and `REDISPORT=6379`, without underscores. The password is generated separately.
- `PUBLIC_ORIGIN=https://${{RAILWAY_PUBLIC_DOMAIN}}` is the exact app HTTPS origin without a trailing slash. For a custom domain, update it to that origin and redeploy.
- `BACKEND_SESSION_COOKIE_SECURE=true` and `BACKEND_TRUST_PROXY=1` account for Railway's single ingress hop. Reassess this trust count if adding another proxy; do not blindly trust every forwarded header or disable Secure cookies. Incorrect proxy/origin settings can break sessions, uploads and imports.
- Keep generated `SECRET_KEY`, database password, and Redis password private and stable across restarts. Never commit resolved credentials.

| Service | Runtime defaults |
| --- | --- |
| PostgreSQL | `POSTGRES_USER=postgres`, `POSTGRES_DB=railway`, `PGDATA=/var/lib/postgresql/data/pgdata`, `PGPORT=5432`, `SSL_CERT_DAYS=820`, `RAILWAY_DEPLOYMENT_DRAINING_SECONDS=60` |
| Redis | `REDISUSER=default`, `REDISPORT=6379`, authenticated AOF persistence and snapshots |
| Teable | `PORT=3000`, healthcheck timeout 600 seconds, `RAILWAY_RUN_UID=0` |

### Persistent storage and permissions

PostgreSQL stores accounts, schemas and rows. The Teable volume stores local attachment bytes. Redis provides the authenticated cache/session backend with AOF and snapshots.

The Redis startup command sets mount ownership to `redis:redis` and mode 700 before the image entrypoint drops privileges, preserving Railway's `lost+found`. This avoids failed AOF startup when the entrypoint skips automatic permission repair. The app uses `RAILWAY_RUN_UID=0` for writable mounted assets; this is a permissions tradeoff, not production hardening.

Back up PostgreSQL, attachments, Redis and secret configuration together; volumes and AOF are not backups. For scaling or production attachment storage, review upstream S3-compatible storage guidance.

**PostgreSQL 17 is for fresh volumes only. Do not downgrade an existing PostgreSQL 18 volume in place.** Plan a backed-up logical migration and test it separately. A version tag is not a guarantee of future database/image compatibility.

### Validation scope

The configuration was checked on fresh volumes with actual browser table creation and row creation/edit/reload. After restarting Teable, PostgreSQL and Redis, the edited row, existing authenticated session and exact attachment bytes persisted. Signup/login, wrong-password rejection, anonymous denial and Secure session cookies were also verified during validation.

Attachment upload and readback were exercised through authenticated browser API requests, **not the file-chooser UI**. Registration-policy closure and a fresh login after restart remain unverified. Existing-session persistence is not proof of a new login after restart. SMTP, paid integrations, backup/restore, upgrades and production load require separate validation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| teable | `ghcr.io/teableio/teable:release.2026-09-07T09-32-29Z.2963` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `TZ` | teable | UTC |
| `PORT` | teable | 3000 |
| `SECRET_KEY` | teable | (secret) |
| `BACKEND_TRUST_PROXY` | teable | 1 |
| `BACKEND_CACHE_PROVIDER` | teable | redis |
| `NEXT_ENV_IMAGES_ALL_REMOTE` | teable | true |
| `BACKEND_SESSION_COOKIE_SECURE` | teable | true |

## Configuration

- **Start command:** `/bin/sh -c 'chown redis:redis "$RAILWAY_VOLUME_MOUNT_PATH" && chmod 700 "$RAILWAY_VOLUME_MOUNT_PATH" && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --save 60 1 --dir "$RAILWAY_VOLUME_MOUNT_PATH"'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `scripts/start.sh`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.assets`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/teable-2)
