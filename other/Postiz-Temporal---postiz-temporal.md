# Deploy Postiz (Temporal) on Railway

All-in-one platform for social media management with Temporal orchestration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-temporal)

## About

<img width="280" src="https://github.com/user-attachments/assets/f0d30d70-dddb-4142-8876-e9aa6ed1cb99" alt="Postiz Logo">
Postiz is an open-source social media scheduling and management platform with AI-powered content creation, multi-platform publishing across 19+ networks, team collaboration, and automation features. This template bundles Postiz with Temporal for durable workflow orchestration, ensuring scheduled posts publish reliably even through server restarts or network failures.

![Image 1](https://github.com/user-attachments/assets/a27ee220-beb7-4c7e-8c1b-2c44301f82ef)
![Image 2](https://github.com/user-attachments/assets/eb5f5f15-ed90-47fc-811c-03ccba6fa8a2)

Hosting Postiz with Temporal involves deploying seven interconnected services: the Postiz application itself (a Next.js frontend with a NestJS backend), PostgreSQL for persistent storage, Redis for caching and sessions, Elasticsearch for Temporal's visibility layer, the Temporal workflow engine, a Temporal web UI for monitoring workflows, and Temporal Admin Tools for debugging. All services communicate over private networking, with Postgres shared between Postiz and Temporal. The Postiz container serves both the frontend (port 4200) and backend API (port 3000) behind an nginx reverse proxy on port 5000.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Temporal UI | `temporalio/ui:2.45.3` | Web service |
| Temporal Auto Setup | `temporalio/auto-setup:1.29.3` | Worker |
| Temporal Admin Tools | `temporalio/admin-tools:1.29` | Worker |
| Postiz | `ghcr.io/gitroomhq/postiz-app:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Elasticsearch | [protemplate/elasticsearch-railway](https://github.com/protemplate/elasticsearch-railway) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | Temporal UI | 8080 |
| `TEMPORAL_UI_PORT` | Temporal UI | 8080 |
| `TEMPORAL_CORS_ORIGINS` | Temporal UI | http://localhost:3000 |
| `DB` | Temporal Auto Setup | postgres12 |
| `DB_PORT` | Temporal Auto Setup | 5432 |
| `ES_PORT` | Temporal Auto Setup | 9200 |
| `ES_USER` | Temporal Auto Setup | (secret) |
| `ENABLE_ES` | Temporal Auto Setup | true |
| `ES_SCHEME` | Temporal Auto Setup | http |
| `BIND_ON_IP` | Temporal Auto Setup | 0.0.0.0 |
| `ES_VERSION` | Temporal Auto Setup | v7 |
| `POSTGRES_USER` | Temporal Auto Setup | (secret) |
| `TEMPORAL_ADDRESS` | Temporal Auto Setup | 127.0.0.1:7233 |
| `DEFAULT_NAMESPACE` | Temporal Auto Setup | default |
| `TEMPORAL_BROADCAST_ADDRESS` | Temporal Auto Setup | 127.0.0.1 |
| `SKIP_DEFAULT_NAMESPACE_CREATION` | Temporal Auto Setup | false |
| `PORT` | Postiz | 3000 |
| `RUN_CRON` | Postiz | true |
| `IS_GENERAL` | Postiz | true |
| `JWT_SECRET` | Postiz | (secret) |
| `NOT_SECURED` | Postiz | true |
| `STORAGE_PROVIDER` | Postiz | local |
| `UPLOAD_DIRECTORY` | Postiz | /uploads |
| `BACKEND_INTERNAL_URL` | Postiz | http://localhost:3000 |
| `DISABLE_REGISTRATION` | Postiz | false |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | Postiz | "/uploads |
| `NO_TS_TUNE` | Postgres | true |
| `POSTGRES_DB` | Postgres | postiz |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Elasticsearch | 9200 |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms500m -Xmx4g |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) |
| `ELASTIC_USERNAME` | Elasticsearch | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/esdata`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/postiz-temporal)
