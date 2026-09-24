# Deploy AppFlowy Cloud on Railway

Collaborative workspace backend with private data and public file URLs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appflowy-cloud-1)

## About

AppFlowy Cloud 0.18.3 is paired with worker 0.18.3, the digest-pinned administration service, GoTrue, web client 0.17.1, PostgreSQL/pgvector, Redis, S3-compatible storage, and a routing gateway. Storage receives a public HTTPS endpoint so signed upload/download URLs can be reached by clients.

Release tested on Railway for the workflows below. The unlicensed server reports a one-user and three-guest limit; review upstream licensing before planning a team deployment.

The template defines 9 services with pinned container digests, generated deployment secrets, explicit service references, and persistent volumes for stateful dependencies. Repository-backed adapters build from `main`. Railway terminates HTTPS for the public endpoints; databases and internal workers have no public TCP proxies. Services initialize independently; wait for database migrations and the cloud API before opening the frontend. Each deployment has its own database and storage resources. Backups are not scheduled by this template, and filesystem-backed services should remain single-replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `appflowyinc/appflowy_web:0.17.1@sha256:dedc8ded52c89500bbc7db48fa80e04687b97e1e2623d687ecaa47b3dae895b4` | Worker |
| storage | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |
| worker | `appflowyinc/appflowy_worker:0.18.3@sha256:68749ee2cac1e08173b1430376e09b99b30be74fb8dc5e7a576a90437702dc58` | Worker |
| postgres | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Database |
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |
| admin | `appflowyinc/admin_frontend:latest@sha256:600f3b98197e41a34e504aaaa4db361cc864682f94b31090daeff5223e4c59e8` | Worker |
| cloud | `appflowyinc/appflowy_cloud:0.18.3@sha256:de5e3e1eaaa7482c85cfce6adeb9e8e2a7f41b65c1e7301d5ce06d33b6c80b1e` | Worker |
| gotrue | `appflowyinc/gotrue:latest@sha256:647abb4fc8925fc5fee8e2f4dc307559a55751a7b72f3257592959c93c952f5a` | Worker |
| appflowy | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | web | 80 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `APPFLOWY_BASE_URL` | web | - | Appflowy base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_WS_BASE_URL` | web | - | Appflowy ws base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_GOTRUE_BASE_URL` | web | - | Appflowy gotrue base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | storage | 9000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `S3_BUCKET` | storage | appflowy | Private bucket created on first startup; changing this does not move existing objects. |
| `MINIO_ROOT_USER` | storage | (secret) | Generated minio root user. Keep private and preserve with backups. |
| `MINIO_ROOT_PASSWORD` | storage | (secret) | Generated minio root password. Keep private and preserve with backups. |
| `RUST_LOG` | worker | info | Rust log for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_S3_BUCKET` | worker | appflowy | Appflowy s3 bucket for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_S3_REGION` | worker | us-east-1 | Appflowy s3 region for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_ENVIRONMENT` | worker | production | Appflowy environment for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_S3_MINIO_URL` | worker | - | Appflowy s3 minio url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_S3_USE_MINIO` | worker | true | Appflowy s3 use minio for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_S3_ACCESS_KEY` | worker | - | Appflowy s3 access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_S3_SECRET_KEY` | worker | (secret) | Appflowy s3 secret key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_S3_CREATE_BUCKET` | worker | true | Appflowy s3 create bucket for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_WORKER_REDIS_URL` | worker | - | Appflowy worker redis url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_WORKER_ENVIRONMENT` | worker | production | Appflowy worker environment for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_WORKER_DATABASE_URL` | worker | - | Appflowy worker database url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_WORKER_DATABASE_NAME` | worker | appflowy | Appflowy worker database name for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_WORKER_IMPORT_TICK_INTERVAL` | worker | 30 | Appflowy worker import tick interval for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APP_DB` | postgres | appflowy | Application database created during first initialization of an empty PostgreSQL volume. |
| `APP_USER` | postgres | (secret) | Dedicated application database role created during first initialization. |
| `POSTGRES_DB` | postgres | postgres | Initial PostgreSQL database name, or the matching database selected by the application. |
| `APP_PASSWORD` | postgres | (secret) | Generated password for the application database role. Preserve it with your backups. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `ENABLE_VECTOR` | postgres | true | Initialize the pgvector extension for applications that require vector storage. Keep the supplied value. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `ALLOW_APP_DATABASE_CREATION` | postgres | false | Grant database and role creation privileges required by ToolJet. Keep false for other applications. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `ADMIN_FRONTEND_REDIS_URL` | admin | - | Admin frontend redis url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ADMIN_FRONTEND_GOTRUE_URL` | admin | - | Admin frontend gotrue url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ADMIN_FRONTEND_PATH_PREFIX` | admin | /console | Admin frontend path prefix for admin. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ADMIN_FRONTEND_APPFLOWY_CLOUD_URL` | admin | - | Admin frontend appflowy cloud url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `RUST_LOG` | cloud | info | Rust log for cloud. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_WEB_URL` | cloud | - | Appflowy web url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_BASE_URL` | cloud | - | Appflowy base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_REDIS_URI` | cloud | - | Appflowy redis uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_S3_BUCKET` | cloud | appflowy | Appflowy s3 bucket for cloud. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_S3_REGION` | cloud | us-east-1 | Appflowy s3 region for cloud. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_ENVIRONMENT` | cloud | production | Appflowy environment for cloud. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_DATABASE_URL` | cloud | - | Appflowy database url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_S3_MINIO_URL` | cloud | - | Appflowy s3 minio url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_S3_USE_MINIO` | cloud | true | Appflowy s3 use minio for cloud. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_S3_ACCESS_KEY` | cloud | - | Appflowy s3 access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_S3_SECRET_KEY` | cloud | (secret) | Appflowy s3 secret key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_ACCESS_CONTROL` | cloud | true | Appflowy access control for cloud. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_GOTRUE_JWT_EXP` | cloud | 7200 | Appflowy gotrue jwt exp for cloud. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_GOTRUE_BASE_URL` | cloud | - | Appflowy gotrue base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_INDEXER_ENABLED` | cloud | false | Optional AI indexer is not included in this draft. |
| `APPFLOWY_S3_CREATE_BUCKET` | cloud | true | Appflowy s3 create bucket for cloud. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_GOTRUE_JWT_SECRET` | cloud | (secret) | Appflowy gotrue jwt secret resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APPFLOWY_DATABASE_MAX_CONNECTIONS` | cloud | 20 | Appflowy database max connections for cloud. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APPFLOWY_S3_PRESIGNED_URL_ENDPOINT` | cloud | - | Appflowy s3 presigned url endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | gotrue | 9999 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DATABASE_URL` | gotrue | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `GOTRUE_JWT_EXP` | gotrue | 7200 | Gotrue jwt exp for gotrue. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GOTRUE_SITE_URL` | gotrue | appflowy-flutter:// | Gotrue site url for gotrue. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `API_EXTERNAL_URL` | gotrue | - | Api external url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `GOTRUE_DB_DRIVER` | gotrue | postgres | Gotrue db driver for gotrue. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GOTRUE_JWT_SECRET` | gotrue | (secret) | Generated gotrue jwt secret. Keep private and preserve with backups. |
| `GOTRUE_ADMIN_EMAIL` | gotrue | - | Required service-administrator email. This is not the end-user AppFlowy account; sign up separately in the app. |
| `GOTRUE_ADMIN_PASSWORD` | gotrue | (secret) | Generated gotrue admin password. Keep private and preserve with backups. |
| `GOTRUE_DISABLE_SIGNUP` | gotrue | false | Gotrue disable signup for gotrue. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GOTRUE_URI_ALLOW_LIST` | gotrue | - | Gotrue uri allow list resolved automatically from the linked service. Keep this reference when using the included topology. |
| `GOTRUE_MAILER_AUTOCONFIRM` | gotrue | true | No SMTP is configured. Email confirmation is bypassed until you configure delivery. |
| `GOTRUE_JWT_ADMIN_GROUP_NAME` | gotrue | supabase_admin | Gotrue jwt admin group name for gotrue. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GOTRUE_MAILER_URLPATHS_RECOVERY` | gotrue | /gotrue/verify | Gotrue mailer urlpaths recovery for gotrue. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GOTRUE_MAILER_URLPATHS_CONFIRMATION` | gotrue | /gotrue/verify | Gotrue mailer urlpaths confirmation for gotrue. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | appflowy | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `API_HOST` | appflowy | - | Api host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `WEB_HOST` | appflowy | - | Web host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AUTH_HOST` | appflowy | - | Auth host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ADMIN_HOST` | appflowy | - | Admin host resolved automatically from the linked service. Keep this reference when using the included topology. |

## Configuration

- **Healthcheck:** `/minio/health/live`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Healthcheck:** `/healthz`

**Category:** CMS · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/appflowy-cloud-1)
