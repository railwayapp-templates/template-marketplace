# Deploy postiz on Railway

All-in-one social media management tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/xWx2v4)

## About

🚨 NOTE: this will not work until my railway PR is merged into the postiz-app main branch 🚨

Deploys the postiz app from https://github.com/gitroomhq/postiz-app/.

This includes 
- a web dasboard
- a redis instance for powering bullmq to schedule posts
- a psql database to store app data
- an uploads volume to store uploads that go along with your posts

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| gitroomhq/postiz-app:latest | `ghcr.io/gitroomhq/postiz-app:latest` | Web service |
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
| `PORT` | gitroomhq/postiz-app:latest | 5000 | - |
| `NODE_ENV` | gitroomhq/postiz-app:latest | production | - |
| `IS_GENERAL` | gitroomhq/postiz-app:latest | true | - |
| `JWT_SECRET` | gitroomhq/postiz-app:latest | (secret) | - |
| `BACK_END_PORT` | gitroomhq/postiz-app:latest | 3000 | - |
| `STORAGE_PROVIDER` | gitroomhq/postiz-app:latest | local | - |
| `UPLOAD_DIRECTORY` | gitroomhq/postiz-app:latest | /uploads | - |
| `SKIP_CONFIG_CHECK` | gitroomhq/postiz-app:latest | true | - |
| `BACKEND_INTERNAL_URL` | gitroomhq/postiz-app:latest | http://localhost:3000 | - |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | gitroomhq/postiz-app:latest | /uploads | - |
| `NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY` | gitroomhq/postiz-app:latest | /uploads | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/xWx2v4)
