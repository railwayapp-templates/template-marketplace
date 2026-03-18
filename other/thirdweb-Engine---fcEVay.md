# Deploy thirdweb Engine on Railway

The open-source server for scalable web3 apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fcEVay)

## About

thirdweb Engine is a production-grade HTTP server that reads, writes, and deploys smart contracts at scale. It enables backend wallet management, transaction retries, nonce management, and gas estimation for scalable blockchain applications with complete web3 infrastructure.

Hosting thirdweb Engine involves deploying a self-hosted HTTP server that interacts with smart contracts on any EVM blockchain. The deployment includes setting up PostgreSQL and Redis databases, configuring API keys, and managing backend wallets. This setup provides complete control over your web3 infrastructure while enabling high-throughput blockchain interactions with automatic transaction management and scalable backend wallet operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Redis | `bitnami/redis` | Database |
| Engine | `thirdweb/engine:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `LOG_LEVEL` | Engine | debug | Determines the logging severity level. Adjust for finer control over logged information. (Default: debug) |
| `REDIS_URL` | Engine | - | Redis connection string. |
| `ENABLE_HTTPS` | Engine | false | Self-sign a certificate to serve API requests on HTTPS. Set to true if running Engine locally only. (Default: false) |
| `PGHOST_PRIVATE` | Engine | - | Postgres private host. |
| `PGPORT_PRIVATE` | Engine | 5432 | Postgres private port. |
| `TINI_SUBREAPER` | Engine | 1 | - |
| `PRUNE_TRANSACTIONS` | Engine | true | When false, Engine prevents the pruning/deletion of processed transaction data. (Default: true) |
| `ENCRYPTION_PASSWORD` | Engine | (secret) | Provide a string to encrypt sensitive data stored in DB. Do not change this value or encrypted data will be inaccessible. |
| `ADMIN_WALLET_ADDRESS` | Engine | - | The wallet address that will configure Engine from the thirdweb dashboard. You will be able to add other admins later. |
| `POSTGRES_CONNECTION_URL` | Engine | - | Postgres connection string. |
| `THIRDWEB_API_SECRET_KEY` | Engine | (secret) | A thirdweb secret key created on the [API Keys page](https://thirdweb.com/dashboard/settings/api-keys). |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Engine | true | Set to true to ensure it will work with Railway. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Healthcheck:** `/system/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/fcEVay)
