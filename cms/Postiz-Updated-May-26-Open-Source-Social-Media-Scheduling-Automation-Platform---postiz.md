# Deploy Postiz [Updated May ’26] (Open-Source Social Media Scheduling & Automation Platform) on Railway

Postiz [May ’26] (Social Media Scheduler & AI Content Planner) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz)

## About

Postiz is a powerful, open-source social media automation and scheduling platform available on GitHub. It allows individuals, marketers, and businesses to manage multiple social media accounts, schedule posts, and analyze engagement - all from one intuitive dashboard.

Hosting Postiz on Railway gives you complete control over your content scheduling and social media management workflows. Instead of depending on third-party services that can restrict your data or require expensive subscriptions, self-hosting Postiz allows you to manage your automation on your own terms.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postiz | `ghcr.io/gitroomhq/postiz-app:v2.11.3` | Web service |
| Redis | `redis:8.2.1` | Database |
| temporal-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| temporal-ui | `temporalio/ui` | Web service |
| temporal-admin-tools | `temporalio/admin-tools` | Worker |
| elasticsearch-railway | [Shinyduo/elasticsearch-railway](https://github.com/Shinyduo/elasticsearch-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| temporal_server | `temporalio/auto-setup` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Postiz | 3000 | - |
| `RUN_CRON` | Postiz | true | - |
| `IS_GENERAL` | Postiz | true | - |
| `JWT_SECRET` | Postiz | (secret) | - |
| `NOT_SECURED` | Postiz | true | - |
| `BACK_END_PORT` | Postiz | 3000 | - |
| `STORAGE_PROVIDER` | Postiz | local | - |
| `UPLOAD_DIRECTORY` | Postiz | /uploads | - |
| `BACKEND_INTERNAL_URL` | Postiz | http://localhost:3000 | - |
| `DISABLE_REGISTRATION` | Postiz | false | - |
| `NEXT_PUBLIC_UPLOAD_DIRECTORY` | Postiz | /uploads | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | temporal-postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | temporal-postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | temporal-postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | temporal-postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | temporal-postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | temporal-ui | 8080 | - |
| `TEMPORAL_UI_PORT` | temporal-ui | 8080 | - |
| `TEMPORAL_CORS_ORIGINS` | temporal-ui | http://localhost:3000 | - |
| `PORT` | elasticsearch-railway | 9200 | - |
| `ES_JAVA_OPTS` | elasticsearch-railway | -Xms256m -Xmx512m | - |
| `ELASTIC_PASSWORD` | elasticsearch-railway | (secret) | - |
| `ELASTIC_USERNAME` | elasticsearch-railway | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB` | temporal_server | postgres12 | - |
| `DB_PORT` | temporal_server | 5432 | - |
| `ES_PORT` | temporal_server | 9200 | - |
| `ES_USER` | temporal_server | (secret) | - |
| `ENABLE_ES` | temporal_server | true | - |
| `ES_SCHEME` | temporal_server | http | - |
| `BIND_ON_IP` | temporal_server | 0.0.0.0 | - |
| `ES_VERSION` | temporal_server | v7 | - |
| `POSTGRES_USER` | temporal_server | (secret) | - |
| `TEMPORAL_ADDRESS` | temporal_server | 127.0.0.1:7233 | - |
| `DEFAULT_NAMESPACE` | temporal_server | default | - |
| `TEMPORAL_NAMESPACE` | temporal_server | default | - |
| `TEMPORAL_BROADCAST_ADDRESS` | temporal_server | 127.0.0.1 | - |
| `SKIP_DEFAULT_NAMESPACE_CREATION` | temporal_server | false | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/uploads`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/postiz)
