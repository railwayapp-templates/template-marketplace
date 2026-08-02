# Deploy postiz Pro Stack One-click Deploy With S3 on Railway

postiz, Temporal, Redis & S3 social media automation. Postiz

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postiz-pro-stack-one-click-deploy)

## About

Postiz Pro Stack One-click Deploy is a complete self-hosted social media management and automation stack. It combines Postiz with PostgreSQL, Redis, Temporal, Elasticsearch, Temporal UI, private S3-compatible media storage, and a dedicated media proxy, all preconfigured for deployment on Railway.

Hosting modern Postiz releases requires more than deploying the application alone. Postiz uses PostgreSQL for application data, Redis for caching, and Temporal for scheduled posts and background workflows. Temporal also requires its own PostgreSQL database and Elasticsearch visibility store. This template provisions and connects the complete architecture automatically through Railway's private network.

Unlike basic Postiz templates, media files are stored in a private Railway S3-compatible bucket instead of the Postiz container filesystem. A dedicated media proxy securely serves uploaded files while keeping the storage bucket private. Postiz requires Temporal for scheduled workflows starting with version 2.12.0.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| temporal-ui | `temporalio/ui:2.34.0` | Web service |
| temporal-es | `elasticsearch:7.17.27` | Database |
| media-proxy | `ghcr.io/xavto/postiz-media-proxy:railway-s3-2026.07.2-rc.1` | Web service |
| temporal-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| postiz | `ghcr.io/xavto/postiz-railway:railway-s3-2026.07.2-rc.2` | Web service |
| postiz-redis | `redis:8.2.1` | Database |
| temporal | `ghcr.io/xavto/postiz-temporal:railway-s3-2026.07.2-rc.1` | Worker |
| postiz-db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TEMPORAL_ADDRESS` | temporal-ui | - | Temporal server address |
| `TEMPORAL_CORS_ORIGINS` | temporal-ui | - | Allowed Temporal UI origin |
| `ES_JAVA_OPTS` | temporal-es | -Xms256m -Xmx256m | Elasticsearch JVM heap size |
| `TAKE_FILE_OWNERSHIP` | temporal-es | true | Fix volume ownership at startup |
| `ES_SETTING_DISCOVERY_TYPE` | temporal-es | single-node | Run as a single-node cluster |
| `ES_SETTING_XPACK_SECURITY_ENABLED` | temporal-es | false | Disable Elasticsearch authentication |
| `ES_SETTING_CLUSTER_ROUTING_ALLOCATION_DISK_WATERMARK_LOW` | temporal-es | 512mb | Stop allocation below 512 MB free |
| `ES_SETTING_CLUSTER_ROUTING_ALLOCATION_DISK_WATERMARK_HIGH` | temporal-es | 256mb | Relocate shards below 256 MB free |
| `ES_SETTING_CLUSTER_ROUTING_ALLOCATION_DISK_THRESHOLD__ENABLED` | temporal-es | true | Enable disk space checks |
| `ES_SETTING_CLUSTER_ROUTING_ALLOCATION_DISK_WATERMARK_FLOOD__STAGE` | temporal-es | 128mb | Protect indices below 128 MB free |
| `PORT` | media-proxy | 8080 | Media proxy HTTP port |
| `S3_BUCKET` | media-proxy | - | S3 media bucket name |
| `S3_REGION` | media-proxy | - | S3 bucket region |
| `S3_ENDPOINT` | media-proxy | - | S3-compatible endpoint |
| `S3_ACCESS_KEY` | media-proxy | - | S3 access key ID |
| `S3_SECRET_KEY` | media-proxy | (secret) | S3 secret access key |
| `S3_FORCE_PATH_STYLE` | media-proxy | false | Use virtual-hosted S3 URLs |
| `PRESIGNED_URL_EXPIRATION_SECONDS` | media-proxy | 3600 | Signed URL lifetime in seconds |
| `POSTGRES_DB` | temporal-db | railway | Database created at startup |
| `DATABASE_URL` | temporal-db | - | Private PostgreSQL URL |
| `POSTGRES_USER` | temporal-db | (secret) | PostgreSQL superuser |
| `POSTGRES_PASSWORD` | temporal-db | (secret) | Generated database password |
| `DATABASE_PUBLIC_URL` | temporal-db | - | Public URL through TCP proxy |
| `PORT` | postiz | 3000 | Internal Postiz backend port |
| `MAIN_URL` | postiz | - | Main public Postiz URL |
| `RUN_CRON` | postiz | true | Run scheduled task workers |
| `REDIS_URL` | postiz | - | Redis connection URL |
| `S3_BUCKET` | postiz | - | S3 media bucket name |
| `S3_REGION` | postiz | - | S3 bucket region |
| `IS_GENERAL` | postiz | true | Enable self-hosted Postiz routes |
| `JWT_SECRET` | postiz | (secret) | Secret used to sign sessions |
| `S3_ENDPOINT` | postiz | - | S3-compatible bucket endpoint |
| `DATABASE_URL` | postiz | - | PostgreSQL connection URL |
| `FRONTEND_URL` | postiz | - | Public frontend URL |
| `S3_ACCESS_KEY` | postiz | - | S3 access key ID |
| `S3_BUCKET_URL` | postiz | - | Public media base URL |
| `S3_SECRET_KEY` | postiz | (secret) | S3 secret access key |
| `STORAGE_PROVIDER` | postiz | s3 | Store uploaded media in S3 |
| `TEMPORAL_ADDRESS` | postiz | - | Private Temporal server address |
| `TEMPORAL_NAMESPACE` | postiz | default | Temporal workflow namespace |
| `S3_FORCE_PATH_STYLE` | postiz | false | Use virtual-hosted S3 URLs |
| `BACKEND_INTERNAL_URL` | postiz | http://127.0.0.1:3000 | Internal backend URL for SSR |
| `DISABLE_REGISTRATION` | postiz | false | Set true after first signup |
| `NEXT_PUBLIC_BACKEND_URL` | postiz | - | Public backend API URL |
| `REDISHOST` | postiz-redis | - | Private Redis host |
| `REDISPORT` | postiz-redis | 6379 | Redis server port |
| `REDISUSER` | postiz-redis | default | Redis ACL username |
| `REDIS_URL` | postiz-redis | - | Private Redis connection URL |
| `REDISPASSWORD` | postiz-redis | (secret) | Client Redis password |
| `REDIS_PASSWORD` | postiz-redis | (secret) | Generated Redis password |
| `REDIS_PUBLIC_URL` | postiz-redis | - | Public URL through TCP proxy |
| `DB` | temporal | postgres12 | Temporal PostgreSQL driver |
| `DB_PORT` | temporal | 5432 | Temporal database port |
| `ES_PORT` | temporal | 9200 | Elasticsearch port |
| `ES_SEEDS` | temporal | - | Private Elasticsearch host |
| `ENABLE_ES` | temporal | true | Enable Elasticsearch visibility |
| `ES_VERSION` | temporal | v7 | Elasticsearch API version |
| `POSTGRES_PWD` | temporal | - | Temporal database password |
| `POSTGRES_USER` | temporal | (secret) | Temporal database username |
| `POSTGRES_SEEDS` | temporal | - | Private database host |
| `TEMPORAL_NAMESPACE` | temporal | default | Default Temporal namespace |
| `DYNAMIC_CONFIG_FILE_PATH` | temporal | config/dynamicconfig/development-sql.yaml | Temporal dynamic config file |
| `POSTGRES_DB` | postiz-db | railway | Database created at startup |
| `DATABASE_URL` | postiz-db | - | Private PostgreSQL URL |
| `POSTGRES_USER` | postiz-db | (secret) | PostgreSQL superuser |
| `POSTGRES_PASSWORD` | postiz-db | (secret) | Generated database password |
| `DATABASE_PUBLIC_URL` | postiz-db | - | Public URL through TCP proxy |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/elasticsearch/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/postiz-pro-stack-one-click-deploy)
