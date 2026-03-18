# Deploy Infisical on Railway

Infisical is the open-source secret management platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wBMgxA)

## About

# Infisical

♾ Infisical is the open-source secret management platform: Sync secrets across your team/infrastructure, prevent secret leaks, and manage internal PKI

![Infisical dashboard screenshot](https://github.com/Infisical/.github/raw/main/profile/infisical_github_banner.png)

* [Docs](https://infisical.com/docs/documentation/getting-started/introduction)
* [Security](https://infisical.com/docs/internals/security)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| db-migrate | `infisical/infisical:latest-postgres` | Database |
| Redis | `bitnami/redis:7.2.5` | Database |
| Infisical | `infisical/infisical:latest-postgres` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `AUTH_SECRET` | Infisical | (secret) | Secret to sign JWT token |
| `SMTP_PASSWORD` | Infisical | (secret) | - |
| `SMTP_USERNAME` | Infisical | (secret) | - |
| `ENCRYPTION_KEY` | Infisical | - | Key for platform encryption/decryption ops |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `npm run migration:latest`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/wBMgxA)
