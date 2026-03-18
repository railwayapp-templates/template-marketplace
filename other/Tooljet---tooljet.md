# Deploy Tooljet on Railway

Low-code platform for building business applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tooljet)

## About

Tooljet is a low-code platform for building business applications. It allows you to connect to various data sources and APIs, enabling rapid application development with minimal coding effort.

Hosting Tooljet involves deploying the application on a server, configuring the database, and setting up the necessary environment for optimal performance. Railway simplifies this process by providing a seamless deployment experience, allowing you to focus on customizing your applications without worrying about infrastructure management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Tooljet | `tooljet/tooljet-ce:ce-lts-latest` | Web service |
| PostgREST | `postgrest/postgrest:v13.0.0` | Database |
| Redis | `railwayapp/redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Tooljet | 8080 | - |
| `PG_USER` | Tooljet | (secret) | - |
| `ORM_LOGGING` | Tooljet | all | - |
| `SERVE_CLIENT` | Tooljet | true | - |
| `DISABLE_SIGNUPS` | Tooljet | false | If signups should be disabled. |
| `SECRET_KEY_BASE` | Tooljet | (secret) | - |
| `TOOLJET_DB_USER` | Tooljet | (secret) | - |
| `PGRST_JWT_SECRET` | Tooljet | (secret) | - |
| `CHECK_FOR_UPDATES` | Tooljet | false | - |
| `DEPLOYMENT_PLATFORM` | Tooljet | docker | - |
| `USER_SESSION_EXPIRY` | Tooljet | 2880 | - |
| `COMMENT_FEATURE_ENABLE` | Tooljet | true | - |
| `DISABLE_TOOLJET_TELEMETRY` | Tooljet | true | If telemetry should be disabled. |
| `ENABLE_MARKETPLACE_FEATURE` | Tooljet | true | - |
| `ENABLE_MULTIPLAYER_EDITING` | Tooljet | true | - |
| `ENABLE_ONBOARDING_QUESTIONS_FOR_ALL_SIGN_UPS` | Tooljet | true | If onboarding should be enabled. |
| `PGRST_JWT_SECRET` | PostgREST | (secret) | - |
| `PGRST_SERVER_PORT` | PostgREST | 3000 | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `./server/entrypoint.sh npm run start:prod`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tooljet)
