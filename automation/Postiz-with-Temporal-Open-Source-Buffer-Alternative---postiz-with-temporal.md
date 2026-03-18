# Deploy Postiz [with Temporal] | Open-Source Buffer Alternative on Railway

1 Click Self-Host Postiz. Schedule posts in 30+ social platforms with AI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-with-temporal)

## About

Deploy a fully self-hosted social media scheduling platform on Railway with one click. This template provisions all 8 required services — Postiz app, two Postgres databases, Redis, Temporal workflow engine, Temporal UI, admin tools, and Elasticsearch — pre-wired with private networking and auto-generated secrets.

![postiz railway deployment](https://res.cloudinary.com/asset-cloudinary/image/upload/v1772992354/postiz_on_railway_ict9aj.png)

Postiz is an open-source alternative to Buffer and Hootsuite, supporting 30+ platforms including X, Instagram, LinkedIn, Threads, Bluesky, Mastodon, TikTok, Reddit, and YouTube. Since v2.12.0, Postiz replaced BullMQ with **Temporal** for all background job processing — scheduled posting, token refresh, email digests, and streak tracking. 

**Key features:**
- Visual content calendar with AI writing assistant
- Multi-platform publishing (30+ networks)
- Team collaboration and approval workflows
- Built-in analytics dashboard
- Fully open-source (`ghcr.io/gitroomhq/postiz-app:latest`)

![postiz-with-temporal dashboard screenshot](https://github.com/user-attachments/assets/a27ee220-beb7-4c7e-8c1b-2c44301f82ef)

**Architecture (8 services):**
`postiz` → `postiz-postgres` + `redis` + `temporal-server` → `temporal-postgres` + `elasticsearch` + `temporal-ui` + `temporal-admin-tools`

The Elasticsearch service uses a custom-wrapped image  because Railway rejects dotted env var names like `cluster.routing.allocation.disk.watermark.low`. The wrapper bakes config into `elasticsearch.yml` at build time and fixes volume permissions at runtime via a custom entrypoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postiz_postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| temporal_server | `temporalio/auto-setup` | Worker |
| temporal-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| postiz-app | `ghcr.io/gitroomhq/postiz-app:latest` | Web service |
| elasticsearch-railway | [praveen-ks-2001/elasticsearch-railway](https://github.com/praveen-ks-2001/elasticsearch-railway) | Database |
| temporal-ui | `temporalio/ui` | Web service |
| postiz_redis | `redis:8.2.1` | Database |
| temporal-admin-tools | `temporalio/admin-tools` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postiz_postgres | railway | Postiz application database |
| `DATABASE_URL` | postiz_postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | postiz_postgres | (secret) | Postgres admin username |
| `POSTGRES_PASSWORD` | postiz_postgres | (secret) | Password for Postiz Postgres user |
| `DATABASE_PUBLIC_URL` | postiz_postgres | - | External Postgres connection string |
| `DB` | temporal_server | postgres12 | Database driver used by Temporal |
| `ES_PWD` | temporal_server | - | Elasticsearch authentication password |
| `DB_PORT` | temporal_server | 5432 | Postgres database port |
| `ES_PORT` | temporal_server | 9200 | Elasticsearch service port |
| `ES_USER` | temporal_server | (secret) | Elasticsearch username |
| `ES_SEEDS` | temporal_server | - | Elasticsearch host address |
| `ENABLE_ES` | temporal_server | true | Enable Elasticsearch visibility backend |
| `ES_SCHEME` | temporal_server | http | Elasticsearch connection protocol |
| `BIND_ON_IP` | temporal_server | 0.0.0.0 | Bind Temporal server on all interfaces |
| `ES_VERSION` | temporal_server | v7 | Elasticsearch API version compatibility |
| `POSTGRES_PWD` | temporal_server | - | Password for Temporal Postgres |
| `POSTGRES_USER` | temporal_server | (secret) | Username for Temporal Postgres |
| `POSTGRES_SEEDS` | temporal_server | - | Postgres host for Temporal |
| `TEMPORAL_ADDRESS` | temporal_server | 127.0.0.1:7233 | Local Temporal service address |
| `DEFAULT_NAMESPACE` | temporal_server | default | Namespace created at startup |
| `TEMPORAL_NAMESPACE` | temporal_server | default | Default workflow namespace |
| `TEMPORAL_BROADCAST_ADDRESS` | temporal_server | 127.0.0.1 | Broadcast address for cluster nodes |
| `SKIP_DEFAULT_NAMESPACE_CREATION` | temporal_server | false | Create namespace automatically |
| `POSTGRES_DB` | temporal-postgres | temporal | Temporal service database name |
| `DATABASE_URL` | temporal-postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | temporal-postgres | (secret) | Temporal database username |
| `POSTGRES_PASSWORD` | temporal-postgres | (secret) | Password for Temporal Postgres user |
| `DATABASE_PUBLIC_URL` | temporal-postgres | - | External Postgres connection string |
| `PORT` | postiz-app | 3000 | HTTP server listening port |
| `MAIN_URL` | postiz-app | - | Primary public application URL |
| `RUN_CRON` | postiz-app | true | Enable scheduled background jobs |
| `REDIS_URL` | postiz-app | - | Redis connection for queues |
| `IS_GENERAL` | postiz-app | true | Enable general multi-user mode |
| `JWT_SECRET` | postiz-app | (secret) | Secret for signing authentication tokens |
| `NOT_SECURED` | postiz-app | true | Disable strict security protections |
| `DATABASE_URL` | postiz-app | - | Postiz Postgres database connection |
| `FRONTEND_URL` | postiz-app | - | Public frontend interface URL |
| `STORAGE_PROVIDER` | postiz-app | local | Use local filesystem storage |
| `TEMPORAL_ADDRESS` | postiz-app | - | Temporal workflow service address |
| `UPLOAD_DIRECTORY` | postiz-app | /uploads | Local directory storing uploaded files |
| `BACKEND_INTERNAL_URL` | postiz-app | http://localhost:3000 | Internal backend service address |
| `DISABLE_REGISTRATION` | postiz-app | false | Allow new user registrations |
| `NEXT_PUBLIC_BACKEND_URL` | postiz-app | - | Public backend API endpoint |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | postiz-app | /uploads | Public upload directory path |
| `PORT` | elasticsearch-railway | 9200 | Elasticsearch HTTP service port |
| `ES_JAVA_OPTS` | elasticsearch-railway | -Xms256m -Xmx512m | JVM heap memory settings |
| `ELASTIC_PASSWORD` | elasticsearch-railway | (secret) | Password for Elasticsearch authentication |
| `ELASTIC_USERNAME` | elasticsearch-railway | (secret) | Elasticsearch admin username |
| `PORT` | temporal-ui | 8080 | Container HTTP listening port |
| `TEMPORAL_ADDRESS` | temporal-ui | - | Temporal server address for UI |
| `TEMPORAL_UI_PORT` | temporal-ui | 8080 | Port Temporal UI runs on |
| `TEMPORAL_CORS_ORIGINS` | temporal-ui | http://localhost:3000 | Allowed CORS origins for UI |
| `REDISHOST` | postiz_redis | - | Internal Redis service hostname |
| `REDISPORT` | postiz_redis | 6379 | Default Redis server port |
| `REDISUSER` | postiz_redis | default | Redis authentication username |
| `REDIS_URL` | postiz_redis | - | Internal Redis connection URI |
| `REDISPASSWORD` | postiz_redis | (secret) | Redis password alias variable |
| `REDIS_PASSWORD` | postiz_redis | (secret) | Redis authentication password |
| `REDIS_PUBLIC_URL` | postiz_redis | - | External Redis connection URI |
| `TEMPORAL_ADDRESS` | temporal-admin-tools | - | Temporal service endpoint |
| `TEMPORAL_CLI_ADDRESS` | temporal-admin-tools | - | CLI connection address |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`
- **Volume:** `/esdata`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/postiz-with-temporal)
