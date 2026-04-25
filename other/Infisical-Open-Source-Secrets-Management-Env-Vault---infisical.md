# Deploy Infisical (Open-Source Secrets Management & Env Vault) on Railway

Infisical [May ’26] (Securely Store & Sync Environment Variables) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/infisical)

## About

Infisical is a free, open-source secret management platform available on GitHub. It allows developers and teams to securely store, manage, and share environment variables and secrets across applications and environments.

Self-hosting Infisical on Railway means you can have complete control over your secret management system - all stored securely within your own cloud environment. By hosting Infisical yourself, you ensure that no third-party services can access your secrets or configurations. 

* * *

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| infisical/infisical:latest-postgres | `infisical/infisical:latest-postgres` | Database |

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
| `AUTH_SECRET` | infisical/infisical:latest-postgres | (secret) | - |
| `SMTP_PASSWORD` | infisical/infisical:latest-postgres | (secret) | - |
| `SMTP_USERNAME` | infisical/infisical:latest-postgres | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/infisical)
