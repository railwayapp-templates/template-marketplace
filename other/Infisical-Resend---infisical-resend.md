# Deploy Infisical + Resend on Railway

Deploy and Host Infisical on Railway with Zero Configuration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/infisical-resend)

## About

**Infisical + Resend** combine secure secrets management with modern email delivery. Infisical stores and injects sensitive environment variables, while Resend handles reliable transactional emails. Together, they let you ship production-ready apps without hardcoding secrets or managing email infrastructure.

Hosting Infisical + Resend on **Railway** is intentionally simple. The Railway template comes fully pre-configured with Infisical set up to manage secrets and environment variables, and Resend already wired in as the email provider. There’s no manual infrastructure work, no service-to-service networking, and no complex setup steps. You deploy the stack, add your Resend API key, and you’re done. Railway handles builds, networking, scaling, and runtime configuration automatically, so you can focus entirely on application logic instead of ops.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Infisical | `infisical/infisical:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `SMTP_HOST` | Infisical | smtp.resend.com | - |
| `SMTP_PORT` | Infisical | 2587 | - |
| `AUTH_SECRET` | Infisical | (secret) | - |
| `SMTP_PASSWORD` | Infisical | (secret) | YOUR_RESEND_API_KEY |
| `SMTP_USERNAME` | Infisical | (secret) | - |
| `SMTP_FROM_NAME` | Infisical | Infisical | - |
| `SMTP_FROM_ADDRESS` | Infisical | - | YOUR_RESEND_FROM_EMAIL |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/infisical-resend)
