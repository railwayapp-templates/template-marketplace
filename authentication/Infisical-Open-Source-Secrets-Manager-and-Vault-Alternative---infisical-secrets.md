# Deploy Infisical | Open-Source Secrets Manager and Vault Alternative on Railway

Infisical secrets manager with the admin created and sign-up closed on boot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/infisical-secrets)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/infisical-secrets?utm_medium=integration&utm_source=button&utm_campaign=infisical-secrets)

[Infisical](https://infisical.com/) is the open-source secrets manager: environment variables, API keys, database credentials and certificates in one place, with per-environment projects, secret versioning and point-in-time recovery, access controls, audit logs, and a CLI, SDKs and Kubernetes operator that inject secrets into your apps. This template runs Infisical 0.165.16 on the official image with Postgres and Redis, and creates your admin account on first boot, so Infisical's admin sign-up page is never open to whoever finds the URL first.

The stack is three services: Infisical, Postgres and Redis.

- **Upstream's own image, pinned.** Infisical runs from the official `infisical/infisical:v0.165.16` image, with a thin wrapper that only adds the first-boot admin setup and an IPv6 listener for Railway's private network.
- **Admin ready, sign-up closed.** Upstream makes the first visitor to `/admin/signup` the instance admin. Here the first boot creates the admin from your email and a generated password, creates your first organization, and turns public sign-up off. There is nothing to claim.
- **Keys generated for you.** The encryption key and session secret are generated at deploy time in the format Infisical expects.
- **Upgrades that migrate themselves.** Every boot runs Infisical's database migrations before serving.
- **Redis that keeps its queue.** Infisical schedules secret syncs, rotations and reminders through Redis queues, so Redis keeps an append-only file on its own volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.10.2-alpine` | Database |
| Infisical | [nomideusz/infisical-railway](https://github.com/nomideusz/infisical-railway) (root: /infisical) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `PORT` | Infisical | 8080 | Port Infisical listens on - leave as is |
| `SITE_URL` | Infisical | - | Public URL of Infisical - set it to your custom domain after adding one |
| `REDIS_URL` | Infisical | - | Redis on the private network (family=0 lets it connect over IPv6) |
| `SMTP_HOST` | Infisical | - | Optional SMTP server for invites and alerts (Railway allows outbound SMTP on Pro only) |
| `SMTP_PORT` | Infisical | 587 | SMTP port |
| `AUTH_SECRET` | Infisical | (secret) | Signs login sessions - changing it logs everyone out |
| `HTTPS_ENABLED` | Infisical | true | Railway serves the domain over HTTPS, so session cookies are marked Secure |
| `SMTP_PASSWORD` | Infisical | (secret) | SMTP password |
| `SMTP_USERNAME` | Infisical | (secret) | SMTP username |
| `ENCRYPTION_KEY` | Infisical | - | Root key that encrypts every secret. BACK IT UP - if it is lost or changed, stored secrets cannot be decrypted |
| `DB_CONNECTION_URI` | Infisical | - | Postgres on the private network |
| `SMTP_FROM_ADDRESS` | Infisical | - | Sender address for Infisical emails |
| `INFISICAL_ADMIN_EMAIL` | Infisical | - | Your email - the instance admin login, created on first boot |
| `INFISICAL_ORGANIZATION` | Infisical | My Company | Name of the first organization, created on first boot |
| `INFISICAL_ADMIN_PASSWORD` | Infisical | (secret) | Admin password, set on first boot only - copy it from here to log in, then change it in Infisical |
| `POSTGRES_DB` | Postgres | infisical | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |

## Configuration

- **Start command:** `/bin/sh -c "chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes"`
- **Volume:** `/data`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/infisical-secrets)
