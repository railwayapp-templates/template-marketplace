# Deploy Infisical (Open-Source Secrets Management & Env Vault) with Resend on Railway

Secrets management with PostgreSQL, Redis, and Resend SMTP gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/infisical-open-source-secrets-management)

## About

Railway provides fully managed hosting for each component:

- **PostgreSQL**: Managed relational database with SSL connections, automatic backups, and point-in-time recovery. Supports HA Patroni clusters for production deployments.
- **Redis**: Managed in-memory cache with persistent disk storage. Supports HA Sentinel failover with HAProxy routing.
- **Infisical**: Containerized application with automatic health checks, rolling deployments, and public HTTP domain.
- **Resend Gateway**: Lightweight SMTP relay running on private network, no public internet access needed.

All services communicate via Railway's private network. Data persists across deployments via managed volumes. No manual server management required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| infisical | `infisical/infisical:latest-postgres` | Database |
| resend-railway-gateway | [Mensa-Philosophical-Circle/resend-railway-gateway](https://github.com/Mensa-Philosophical-Circle/resend-railway-gateway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Redis hostname for private network access |
| `REDISPORT` | Redis | 6379 | Redis port number |
| `REDISUSER` | Redis | default | Redis username for authentication |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Redis password hash for authentication |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password for client connections |
| `SITE_URL` | infisical | http://localhost:8080 | Public URL for Infisical |
| `REDIS_URL` | infisical | - | Redis connection string |
| `SMTP_HOST` | infisical | resend-railway-gateway.railway.internal | SMTP gateway hostname |
| `SMTP_PORT` | infisical | 2525 | SMTP gateway port |
| `AUTH_SECRET` | infisical | (secret) | Secret for auth tokens |
| `SMTP_SECURE` | infisical | false | Use TLS (false for STARTTLS) |
| `SMTP_PASSWORD` | infisical | (secret) | Gateway SMTP_PASS |
| `SMTP_USERNAME` | infisical | (secret) | Gateway SMTP_USER |
| `ENCRYPTION_KEY` | infisical | - | Master encryption key |
| `SMTP_FROM_NAME` | infisical | Infisical | Display name for emails |
| `DB_CONNECTION_URI` | infisical | - | Postgres connection string |
| `SMTP_FROM_ADDRESS` | infisical | noreply@infisical.com | Email address to send from |
| `SMTP_TLS_REJECT_UNAUTHORIZED` | infisical | false | Accept self-signed certificates |
| `SMTP_PASS` | resend-railway-gateway | - | Password for SMTP AUTH |
| `SMTP_USER` | resend-railway-gateway | (secret) | Username for SMTP AUTH |
| `RESEND_API_KEY` | resend-railway-gateway | (secret) | Resend API key for email delivery |
| `SMTP_LISTEN_ADDR` | resend-railway-gateway | :2525 | SMTP server listen address |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Tags:** secrets, infisical, vault, environment-variables, security, resend, smtp · **Languages:** Go, Dockerfile, Makefile

[View on Railway →](https://railway.com/deploy/infisical-open-source-secrets-management)
