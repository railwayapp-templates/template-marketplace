# Deploy postiz-app:v2.11.3 on Railway

One Click deployment of Popular Open Source Social media scheduling tool.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Rd76MM)

## About

[Postiz](https://postiz.com) is your ultimate social media scheduling tool. It offers everything you need to manage social posts, build an audience, capture leads, and grow your business — all from a single, streamlined platform.

---

[Railway](https://railway.app) is a cloud infrastructure platform designed to simplify deployments. Hosting Postiz on Railway provides:

- Scalable deployments via containers
- Seamless integration of services (DB, cache, frontend/backend)
- CI/CD out-of-the-box
- Easy public domain generation

Postiz leverages a multi-container setup including frontend, backend, Redis, PostgreSQL, and public entry via port 5000.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:7` | Database |
| gitroomhq/postiz-app:latest | `ghcr.io/gitroomhq/postiz-app:v2.11.3` | Database |
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
| `PORT` | gitroomhq/postiz-app:latest | 3000 | - |
| `MAIN_URL` | gitroomhq/postiz-app:latest | - | The public service or customer domain. |
| `IS_GENERAL` | gitroomhq/postiz-app:latest | true | - |
| `JWT_SECRET` | gitroomhq/postiz-app:latest | (secret) | - |
| `NOT_SECURED` | gitroomhq/postiz-app:latest | false | - |
| `FRONTEND_URL` | gitroomhq/postiz-app:latest | - | The public service or customer domain. |
| `BACK_END_PORT` | gitroomhq/postiz-app:latest | 3000 | - |
| `STORAGE_PROVIDER` | gitroomhq/postiz-app:latest | local | - |
| `UPLOAD_DIRECTORY` | gitroomhq/postiz-app:latest | /uploads | - |
| `BACKEND_INTERNAL_URL` | gitroomhq/postiz-app:latest | http://localhost:3000 | - |
| `NEXT_PUBLIC_BACKEND_URL` | gitroomhq/postiz-app:latest | - | The public service or customer domain. |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | gitroomhq/postiz-app:latest | /uploads | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Volume:** `/uploads`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation

[View on Railway →](https://railway.com/template/Rd76MM)
