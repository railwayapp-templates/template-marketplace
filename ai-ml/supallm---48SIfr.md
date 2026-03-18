# Deploy supallm on Railway

Build AI Agents with no code and control them using our realtime SDK.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/48SIfr)

## About

Step 1: update the INITIAL_USER_EMAIL and INITIAL_USER_PASSWORD variables in the supallm_api service.

Step 2: open the app frontend, log in and start building your AI agents.

Step 3: read [our documentation](https://github.com/supallm/supallm) to know more about our realtime SDK and view our demo.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| supallm_frontend | `ghcr.io/supallm/supallm:latest` | Web service |
| supallm_runner | `ghcr.io/supallm/supallm:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| supallm_api | `ghcr.io/supallm/supallm:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | Redis | no | - |
| `MODE` | supallm_frontend | frontend | - |
| `MODE` | supallm_runner | runner | - |
| `SECRET_KEY` | supallm_runner | (secret) | - |
| `DISABLE_NSJAIL` | supallm_runner | true | - |
| `REDIS_PASSWORD` | supallm_runner | (secret) | - |
| `NSJAIL_CLONE_NEW_USER` | supallm_runner | (secret) | - |
| `RUNNER_MAX_CONCURRENT_JOBS` | supallm_runner | 5 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `MODE` | supallm_api | api | - |
| `SECRET_KEY` | supallm_api | (secret) | openssl rand -base64 32 |
| `POSTGRES_USER` | supallm_api | (secret) | - |
| `REDIS_PASSWORD` | supallm_api | (secret) | - |
| `INITIAL_USER_NAME` | supallm_api | Admin | - |
| `POSTGRES_PASSWORD` | supallm_api | (secret) | - |
| `INITIAL_USER_EMAIL` | supallm_api | - | Add the email address you want to login with. |
| `INITIAL_USER_PASSWORD` | supallm_api | (secret) | Enter a secure password (min 6 chars) for your admin account. |

## Configuration

- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/48SIfr)
