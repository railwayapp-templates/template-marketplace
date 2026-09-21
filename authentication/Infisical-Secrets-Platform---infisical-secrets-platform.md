# Deploy Infisical Secrets Platform on Railway

Self-hosted Infisical secrets platform with Postgres and Redis included

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/infisical-secrets-platform)

## About

Infisical is an open-source platform for secrets, certificates, and privileged access management. Teams keep API keys, database credentials, and certificates in one audited place instead of scattered `.env` files, then pull them into apps and CI through the Infisical CLI, SDKs, Kubernetes operator, or Terraform provider.

Hosting Infisical means running the standalone application image next to PostgreSQL and Redis. Postgres holds every encrypted secret, user, project, and audit log. Redis is a hard dependency rather than a cache: it carries the background job queue, distributed locks, and rate limit counters, and the app refuses to start without it. The application image bundles the API, the React dashboard, and the workers in a single Node process on port 8080, and it runs its Knex migrations automatically on every boot, so there is no separate migration step.

This template ships the same three services as the official `docker-compose.prod.yml`, pinned to `infisical/infisical:v0.165.13` rather than `latest` as upstream recommends. It generates `ENCRYPTION_KEY` as the required 16-byte hex value and `AUTH_SECRET` as a high-entropy signing key, sets `HOST=0.0.0.0` because Infisical otherwise binds localhost and would fail the healthcheck, pins `PORT=8080` so Railway's healthcheck reaches `/api/status`, and wires `SITE_URL` to the generated public domain. Redis runs with a generated password, AOF persistence, and `maxmemory-policy noeviction`, which the upstream hardware requirements call a requirement because evicting queue state silently drops work.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Infisical | `infisical/infisical:v0.165.13` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:7.2.4-alpine3.19` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | Infisical | 0.0.0.0 | Bind address. Infisical defaults to localhost, which would make the Railway healthcheck fail. Keep 0.0.0.0 so the public domain works. Reaching this service from another Railway service should use the public domain, not *.railway.internal (see README). |
| `PORT` | Infisical | 8080 | Listen port. Railway's healthcheck and edge proxy probe $PORT, so keep it equal to the port Infisical binds (the server reads PORT, upstream default 8080). |
| `NODE_ENV` | Infisical | production | Production mode. Anything else skips the boot-time Postgres/Redis connectivity check and changes cookie/security defaults. |
| `SITE_URL` | Infisical | - | Absolute public URL of this instance, including the scheme. Used in emails, OAuth/SAML callbacks and the CLI. Update it if you attach a custom domain. |
| `REDIS_URL` | Infisical | - | Redis connection string. Redis is a hard dependency: it holds the background job queue, distributed locks and rate limit counters, and Infisical refuses to start without it. |
| `SMTP_HOST` | Infisical | - | Optional. SMTP server hostname. Not needed to create the first admin account; required to invite teammates, reset passwords and send notifications. |
| `SMTP_PORT` | Infisical | 587 | Optional. SMTP port. 465 switches the client to implicit TLS; anything else uses STARTTLS. |
| `AUTH_SECRET` | Infisical | (secret) | HMAC signing key for session and machine identity JWTs. Changing it signs every user out and invalidates issued identity tokens. |
| `SMTP_PASSWORD` | Infisical | (secret) | Optional. SMTP password or API key. |
| `SMTP_USERNAME` | Infisical | (secret) | Optional. SMTP username. |
| `ENCRYPTION_KEY` | Infisical | - | Root encryption key for all secrets stored in Postgres. Must be a 16-byte hex string (exactly 32 hex characters), the same shape as `openssl rand -hex 16`. Back this up: without it the database cannot be decrypted, and rotating it needs the documented rotation procedure. |
| `SMTP_FROM_NAME` | Infisical | - | Optional. From name on outgoing mail. |
| `DB_CONNECTION_URI` | Infisical | - | Postgres connection string over the private network. Knex migrations run automatically on every boot. |
| `SMTP_FROM_ADDRESS` | Infisical | - | Optional. From address on outgoing mail. |
| `TELEMETRY_ENABLED` | Infisical | false | Anonymous product telemetry to PostHog. Off by default in this template; set to true to send it. |
| `INITIAL_ORGANIZATION_NAME` | Infisical | - | Optional. Name given to the organization created with the first admin account. Defaults to "Admin Org". |
| `POSTGRES_DB` | Postgres | infisical | Database name. |
| `DATABASE_URL` | Postgres | - | Private-network connection string (IPv6, includes port). |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL via the TCP proxy (for psql / GUI clients and pg_dump backups). |
| `DATABASE_PRIVATE_URL` | Postgres | - | Referenced by Infisical as DB_CONNECTION_URI. |
| `REDIS_URL` | Redis | - | Private-network connection string (IPv6, includes port, db 0). Referenced by Infisical as REDIS_URL. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password (passed to redis-server --requirepass by the start command). |

## Configuration

- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --save 60 1 --dir /data --maxmemory-policy noeviction --bind :: 0.0.0.0'`
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/infisical-secrets-platform)
