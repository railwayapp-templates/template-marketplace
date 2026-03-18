# Deploy judge0 on Railway

🔥 The most advanced open-source online code execution system in the world.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/h9hIWO)

## About

Judge0 (pronounced like "judge zero") is a robust, scalable, and open-source online code execution system. You can use it to build a wide range of applications that need online code execution features. Some examples include competitive programming platforms, e-learning platforms, candidate assessment and recruitment platforms, online code editors, online IDEs, and many more.

In our research paper Robust and Scalable Online Code Execution System, we present Judge0's modern modular architecture that can be easily deployed and scaled. We study its design, comment on the various challenges in building such systems, and compare it with other available online code execution systems and online judge systems.

To see Judge0 in action, try Judge0 IDE - our free and open-source online code editor.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | `judge0/judge0` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| server | `judge0/judge0` | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AUTHN_TOKEN` | worker | (secret) | - |
| `POSTGRES_USER` | worker | (secret) | - |
| `REDIS_PASSWORD` | worker | (secret) | - |
| `SECRET_KEY_BASE` | worker | (secret) | - |
| `POSTGRES_PASSWORD` | worker | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | server | 2358 | - |
| `AUTHN_TOKEN` | server | (secret) | - |
| `AUTHN_HEADER` | server | X-Auth-Token | - |
| `MAX_FILE_SIZE` | server | 1024 | - |
| `POSTGRES_USER` | server | (secret) | - |
| `NUMBER_OF_RUNS` | server | 1 | - |
| `REDIS_PASSWORD` | server | (secret) | - |
| `SECRET_KEY_BASE` | server | (secret) | - |
| `MAX_MAX_FILE_SIZE` | server | 4096 | - |
| `POSTGRES_PASSWORD` | server | (secret) | - |
| `MAX_NUMBER_OF_RUNS` | server | 20 | - |
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

- **Start command:** `bash ./scripts/workers`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bash ./scripts/server`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other

[View on Railway →](https://railway.com/deploy/h9hIWO)
