# Deploy Novu Community Edition on Railway

Notification workflows with API, workers, dashboard, and WebSockets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/novu-community-edition)

## About

Novu Community Edition 3.19.0 supplies an API, worker, WebSocket service, and dashboard with MongoDB, authenticated Redis, and private S3-compatible storage. The four application images use the same version from the current Community Edition deployment source.

Release tested on Railway. See the validation scope below for verified workflows and remaining limitations.

The template defines 7 services with pinned container digests, generated deployment secrets, explicit service references, and persistent volumes for stateful dependencies. Repository-backed adapters build from `codex/remaining-template-drafts`. Railway terminates HTTPS for the public endpoints; databases and internal workers have no public TCP proxies. Fresh initialization was tested in an isolated Railway project. Each deployment has its own database and storage resources. Backups are not scheduled by this template, and filesystem-backed services should remain single-replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| storage | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Database |
| ws | `ghcr.io/novuhq/novu/ws:3.19.0@sha256:00aa8b9f080da2af443269af672c00b7561556d7adb4b097b4e54c2127de61e5` | Web service |
| mongodb | `mongo:8.0.17@sha256:9814652e33f0cf8b9fddea8b46dfc9d8e19b130dcfdd7b510ca58bb0d40c8b71` | Database |
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |
| api | `ghcr.io/novuhq/novu/api:3.19.0@sha256:5cd2a586888b48885cb9ad91fb3cd25a38e6f70bb99d38d48f4d475b57bf544a` | Web service |
| novu | `ghcr.io/novuhq/novu/dashboard:3.19.0@sha256:15a7773e01658f671e56fb9f0ddc8f043008bb0cfea2d6c5d1a0a60c722bf6e1` | Web service |
| worker | `ghcr.io/novuhq/novu/worker:3.19.0@sha256:2fa72651958986570f3929df0079908a6a4c65f945cf8fa69d973c707ce4ac81` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `S3_BUCKET` | storage | novu | Private bucket created on first startup; changing this does not move existing objects. |
| `MINIO_ROOT_USER` | storage | (secret) | Generated minio root user. Keep private and preserve with backups. |
| `MINIO_ROOT_PASSWORD` | storage | (secret) | Generated minio root password. Keep private and preserve with backups. |
| `PORT` | ws | 3002 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `NODE_ENV` | ws | production | Node.js runtime mode. Keep production for hosted deployments. |
| `MONGO_URL` | ws | - | Mongo url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `S3_REGION` | ws | us-east-1 | S3 region for ws. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `JWT_SECRET` | ws | (secret) | Jwt secret resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_HOST` | ws | - | Private Redis/Valkey hostname supplied by the redis service reference. |
| `REDIS_PORT` | ws | 6379 | Private Redis/Valkey port. Keep 6379. |
| `API_ROOT_URL` | ws | - | Api root url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_DB_INDEX` | ws | 2 | Redis db index for ws. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_PASSWORD` | ws | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `S3_BUCKET_NAME` | ws | novu | S3 bucket name for ws. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_LOCAL_STACK` | ws | - | S3 local stack resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AWS_ACCESS_KEY_ID` | ws | - | Aws access key id resolved automatically from the linked service. Keep this reference when using the included topology. |
| `NEW_RELIC_ENABLED` | ws | false | New relic enabled for ws. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MONGO_MAX_POOL_SIZE` | ws | 10 | Mongo max pool size for ws. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MONGO_MIN_POOL_SIZE` | ws | 1 | Mongo min pool size for ws. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AWS_SECRET_ACCESS_KEY` | ws | (secret) | Aws secret access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_CACHE_SERVICE_HOST` | ws | - | Redis cache service host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_CACHE_SERVICE_PORT` | ws | 6379 | Redis cache service port for ws. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SUBSCRIBER_WIDGET_JWT_EXPIRATION_TIME` | ws | 15d | Subscriber widget jwt expiration time for ws. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MONGO_INITDB_ROOT_PASSWORD` | mongodb | (secret) | Generated mongo initdb root password. Keep private and preserve with backups. |
| `MONGO_INITDB_ROOT_USERNAME` | mongodb | (secret) | Mongo initdb root username for mongodb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `PORT` | api | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `NODE_ENV` | api | production | Node.js runtime mode. Keep production for hosted deployments. |
| `MONGO_URL` | api | - | Mongo url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `S3_REGION` | api | us-east-1 | S3 region for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `JWT_SECRET` | api | (secret) | Generated jwt secret. Keep private and preserve with backups. |
| `REDIS_HOST` | api | - | Private Redis/Valkey hostname supplied by the redis service reference. |
| `REDIS_PORT` | api | 6379 | Private Redis/Valkey port. Keep 6379. |
| `API_ROOT_URL` | api | - | Api root url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `IS_V2_ENABLED` | api | true | Is v2 enabled for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `FRONT_BASE_URL` | api | - | Front base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `IS_SELF_HOSTED` | api | true | Is self hosted for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_DB_INDEX` | api | 2 | Redis db index for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_PASSWORD` | api | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `S3_BUCKET_NAME` | api | novu | S3 bucket name for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_LOCAL_STACK` | api | - | S3 local stack resolved automatically from the linked service. Keep this reference when using the included topology. |
| `NOVU_SECRET_KEY` | api | (secret) | Generated novu secret key. Keep private and preserve with backups. |
| `AWS_ACCESS_KEY_ID` | api | - | Aws access key id resolved automatically from the linked service. Keep this reference when using the included topology. |
| `NEW_RELIC_ENABLED` | api | false | New relic enabled for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MONGO_MAX_POOL_SIZE` | api | 10 | Mongo max pool size for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MONGO_MIN_POOL_SIZE` | api | 1 | Mongo min pool size for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `STORE_ENCRYPTION_KEY` | api | - | Exactly 32 generated characters for encrypting provider credentials; retain with MongoDB backups. |
| `AWS_SECRET_ACCESS_KEY` | api | (secret) | Aws secret access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_CACHE_SERVICE_HOST` | api | - | Redis cache service host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_CACHE_SERVICE_PORT` | api | 6379 | Redis cache service port for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MONGO_AUTO_CREATE_INDEXES` | api | true | Mongo auto create indexes for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `IS_API_IDEMPOTENCY_ENABLED` | api | false | Is api idempotency enabled for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `IS_API_RATE_LIMITING_ENABLED` | api | false | Is api rate limiting enabled for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `IS_NEW_MESSAGES_API_RESPONSE_ENABLED` | api | true | Is new messages api response enabled for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SUBSCRIBER_WIDGET_JWT_EXPIRATION_TIME` | api | 15d | Subscriber widget jwt expiration time for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | novu | 4000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `VITE_API_HOSTNAME` | novu | - | Vite api hostname resolved automatically from the linked service. Keep this reference when using the included topology. |
| `VITE_WEBSOCKET_HOSTNAME` | novu | - | Vite websocket hostname resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | worker | 3004 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `NODE_ENV` | worker | production | Node.js runtime mode. Keep production for hosted deployments. |
| `MONGO_URL` | worker | - | Mongo url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `S3_REGION` | worker | us-east-1 | S3 region for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_HOST` | worker | - | Private Redis/Valkey hostname supplied by the redis service reference. |
| `REDIS_PORT` | worker | 6379 | Private Redis/Valkey port. Keep 6379. |
| `API_ROOT_URL` | worker | - | Api root url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_DB_INDEX` | worker | 2 | Redis db index for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_PASSWORD` | worker | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `S3_BUCKET_NAME` | worker | novu | S3 bucket name for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_LOCAL_STACK` | worker | - | S3 local stack resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AWS_ACCESS_KEY_ID` | worker | - | Aws access key id resolved automatically from the linked service. Keep this reference when using the included topology. |
| `NEW_RELIC_ENABLED` | worker | false | New relic enabled for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MONGO_MAX_POOL_SIZE` | worker | 10 | Mongo max pool size for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MONGO_MIN_POOL_SIZE` | worker | 1 | Mongo min pool size for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `STORE_ENCRYPTION_KEY` | worker | - | Store encryption key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AWS_SECRET_ACCESS_KEY` | worker | (secret) | Aws secret access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_CACHE_SERVICE_HOST` | worker | - | Redis cache service host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_CACHE_SERVICE_PORT` | worker | 6379 | Redis cache service port for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `BROADCAST_QUEUE_CHUNK_SIZE` | worker | 100 | Broadcast queue chunk size for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MULTICAST_QUEUE_CHUNK_SIZE` | worker | 100 | Multicast queue chunk size for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `IS_EMAIL_INLINE_CSS_DISABLED` | worker | false | Is email inline css disabled for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `IS_USE_MERGED_DIGEST_ID_ENABLED` | worker | false | Is use merged digest id enabled for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SUBSCRIBER_WIDGET_JWT_EXPIRATION_TIME` | worker | 15d | Subscriber widget jwt expiration time for worker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/v1/health-check`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/db`
- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`
- **Healthcheck:** `/`

**Category:** Automation · **Languages:** JavaScript, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/novu-community-edition)
