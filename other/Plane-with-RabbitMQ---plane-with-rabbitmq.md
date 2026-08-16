# Deploy Plane with RabbitMQ on Railway

Plane v1.4 with PostgreSQL, Redis, RabbitMQ, and MinIO.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plane-with-rabbitmq)

## About

Plane is an open-source project-management platform for issues, cycles, modules, pages, analytics, and real-time team collaboration.

This template deploys the Plane Community Edition `v1.4.1` application services behind one Caddy `2.11.4` HTTPS origin. PostgreSQL stores application records, Redis supports cache and transient state, RabbitMQ carries background jobs, and MinIO persists uploads and attachments.

Only the `Plane` proxy receives a public HTTP domain. Web, API, admin, spaces, live collaboration, PostgreSQL, Redis, RabbitMQ, and object-storage traffic use Railway private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Space | `makeplane/plane-space:v1.4.1@sha256:741cd5d6bbfaa94bac4a28837d5fab3f7459b014a6c9066728a3b3cfe76fc6c8` | Worker |
| API | `makeplane/plane-backend:v1.4.1@sha256:631f42fc01c1db5e7759c2e5ceffffa5fa2afd4b0ee7c8bc92cde9f1a6a0ec8f` | Worker |
| Migrator | `makeplane/plane-backend:v1.4.1@sha256:631f42fc01c1db5e7759c2e5ceffffa5fa2afd4b0ee7c8bc92cde9f1a6a0ec8f` | Worker |
| Admin | `makeplane/plane-admin:v1.4.1@sha256:db215110ef79ab4048334086c891e1499f4c0d30724030a884f6fb61df162d8d` | Worker |
| Live | `makeplane/plane-live:v1.4.1@sha256:02fd23645fa0f84a68ccfdbab8ba6ceaac5deca6c482bff041880b02295ae76c` | Worker |
| RabbitMQ | `rabbitmq:3.13.7-management-alpine@sha256:606d8c0d6b3c18d1da9afc53bc7cdb2a8d5486df91b5a9830e9e07626c9ae281` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Web | `makeplane/plane-frontend:v1.4.1@sha256:577604d9d2d2cf7b055e5d5ecca84b26c70d70b6b6d87803488c412b9725907b` | Worker |
| Plane | [monotykamary/plane-caddy-proxy](https://github.com/monotykamary/plane-caddy-proxy) | Web service |
| Bucket | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| Redis | `redis:8.2.8` | Database |
| Worker | `makeplane/plane-backend:v1.4.1@sha256:631f42fc01c1db5e7759c2e5ceffffa5fa2afd4b0ee7c8bc92cde9f1a6a0ec8f` | Worker |
| Beat Worker | `makeplane/plane-backend:v1.4.1@sha256:631f42fc01c1db5e7759c2e5ceffffa5fa2afd4b0ee7c8bc92cde9f1a6a0ec8f` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Space | 3001 | Port the Spaces service listens on; exposed only internally. |
| `WEB_URL` | Space | - | Public Plane base URL used for generating absolute links. |
| `HOSTNAME` | Space | :: | IPv6 bind address; allows listening on all interfaces. |
| `SECRET_KEY` | Space | (secret) | Shared secret for cryptographic signing across services. |
| `PORT` | API | 8000 | Port to listen and export to. |
| `DEBUG` | API | 0 | Disable Django debug mode. |
| `WEB_URL` | API | - | Public Plane origin. |
| `AMQP_URL` | API | - | Private RabbitMQ connection. |
| `REDIS_URL` | API | - | Private Redis connection. |
| `USE_MINIO` | API | 1 | Use the bundled private MinIO service. |
| `APP_DOMAIN` | API | - | Public Plane hostname. |
| `AWS_REGION` | API | - | Optional S3 signing region. |
| `MACHINE_ID` | API | - | Unique machine ID. |
| `REDIS_HOST` | API | - | Private Redis host. |
| `REDIS_PORT` | API | 6379 | Private Redis port. |
| `SECRET_KEY` | API | (secret) | Generated Django signing key. |
| `BUCKET_NAME` | API | uploads | Attachment bucket name used by the proxy. |
| `APP_BASE_URL` | API | - | Public Plane application origin. |
| `DATABASE_URL` | API | - | Private PostgreSQL connection. |
| `SITE_ADDRESS` | API | :80 | Proxy site address metadata. |
| `LIVE_BASE_URL` | API | - | Public Plane origin for Live. |
| `ADMIN_BASE_URL` | API | - | Public Plane origin for God Mode. |
| `LIVE_BASE_PATH` | API | /live | Live collaboration path. |
| `SPACE_BASE_URL` | API | - | Public Plane origin for Spaces. |
| `ADMIN_BASE_PATH` | API | /god-mode | God Mode path. |
| `FILE_SIZE_LIMIT` | API | 5242880 | Maximum upload size in bytes. |
| `MINIO_ROOT_USER` | API | (secret) | MinIO access key reference. |
| `SPACE_BASE_PATH` | API | /spaces | Spaces path. |
| `GUNICORN_WORKERS` | API | 1 | API worker count suitable for the initial Railway allocation. |
| `LISTEN_HTTP_PORT` | API | 80 | Proxy HTTP port metadata. |
| `AWS_ACCESS_KEY_ID` | API | - | Private MinIO access key. |
| `LISTEN_HTTPS_PORT` | API | 443 | Proxy HTTPS port metadata. |
| `API_KEY_RATE_LIMIT` | API | (secret) | Default API key rate limit. |
| `AWS_S3_BUCKET_NAME` | API | uploads | Attachment bucket name. |
| `MINIO_ENDPOINT_SSL` | API | 0 | Use HTTP on Railway private networking. |
| `AWS_S3_ENDPOINT_URL` | API | - | Private MinIO S3 endpoint. |
| `MINIO_ROOT_PASSWORD` | API | (secret) | MinIO secret key reference. |
| `WEBHOOK_ALLOWED_IPS` | API | - | Optional webhook IP allowlist. |
| `CORS_ALLOWED_ORIGINS` | API | - | Allow browser requests from the public proxy origin. |
| `AWS_SECRET_ACCESS_KEY` | API | (secret) | Private MinIO secret key. |
| `SIGNED_URL_EXPIRATION` | API | 3600 | Signed attachment URL lifetime in seconds. |
| `WEBHOOK_ALLOWED_HOSTS` | API | - | Optional webhook host allowlist. |
| `HARD_DELETE_AFTER_DAYS` | API | 60 | Retention before hard deletion. |
| `LIVE_SERVER_SECRET_KEY` | API | (secret) | Shared Live authentication key. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | API | true | Enable Railway private IPv6 networking. |
| `DEBUG` | Migrator | 0 | Disable Django debug mode. |
| `WEB_URL` | Migrator | - | Public Plane origin. |
| `AMQP_URL` | Migrator | - | Private RabbitMQ connection. |
| `REDIS_URL` | Migrator | - | Private Redis connection. |
| `USE_MINIO` | Migrator | 1 | Use the bundled private MinIO service. |
| `APP_DOMAIN` | Migrator | - | Public Plane hostname. |
| `AWS_REGION` | Migrator | - | Optional S3 signing region. |
| `REDIS_HOST` | Migrator | - | Private Redis host. |
| `REDIS_PORT` | Migrator | 6379 | Private Redis port. |
| `SECRET_KEY` | Migrator | (secret) | Shared generated Django signing key. |
| `BUCKET_NAME` | Migrator | uploads | Attachment bucket name used by the proxy. |
| `APP_BASE_URL` | Migrator | - | Public Plane application origin. |
| `DATABASE_URL` | Migrator | - | Private PostgreSQL connection. |
| `SITE_ADDRESS` | Migrator | :80 | Proxy site address metadata. |
| `LIVE_BASE_URL` | Migrator | - | Public Plane origin for Live. |
| `ADMIN_BASE_URL` | Migrator | - | Public Plane origin for God Mode. |
| `LIVE_BASE_PATH` | Migrator | /live | Live collaboration path. |
| `SPACE_BASE_URL` | Migrator | - | Public Plane origin for Spaces. |
| `ADMIN_BASE_PATH` | Migrator | /god-mode | God Mode path. |
| `FILE_SIZE_LIMIT` | Migrator | 5242880 | Maximum upload size in bytes. |
| `MINIO_ROOT_USER` | Migrator | (secret) | MinIO access key reference. |
| `SPACE_BASE_PATH` | Migrator | /spaces | Spaces path. |
| `GUNICORN_WORKERS` | Migrator | 1 | API worker count suitable for the initial Railway allocation. |
| `LISTEN_HTTP_PORT` | Migrator | 80 | Proxy HTTP port metadata. |
| `AWS_ACCESS_KEY_ID` | Migrator | - | Private MinIO access key. |
| `LISTEN_HTTPS_PORT` | Migrator | 443 | Proxy HTTPS port metadata. |
| `API_KEY_RATE_LIMIT` | Migrator | (secret) | Default API key rate limit. |
| `AWS_S3_BUCKET_NAME` | Migrator | uploads | Attachment bucket name. |
| `MINIO_ENDPOINT_SSL` | Migrator | 0 | Use HTTP on Railway private networking. |
| `AWS_S3_ENDPOINT_URL` | Migrator | - | Private MinIO S3 endpoint. |
| `MINIO_ROOT_PASSWORD` | Migrator | (secret) | MinIO secret key reference. |
| `WEBHOOK_ALLOWED_IPS` | Migrator | - | Optional webhook IP allowlist. |
| `CORS_ALLOWED_ORIGINS` | Migrator | - | Allow browser requests from the public proxy origin. |
| `AWS_SECRET_ACCESS_KEY` | Migrator | (secret) | Private MinIO secret key. |
| `SIGNED_URL_EXPIRATION` | Migrator | 3600 | Signed attachment URL lifetime in seconds. |
| `WEBHOOK_ALLOWED_HOSTS` | Migrator | - | Optional webhook host allowlist. |
| `HARD_DELETE_AFTER_DAYS` | Migrator | 60 | Retention before hard deletion. |
| `LIVE_SERVER_SECRET_KEY` | Migrator | (secret) | Shared Live authentication key. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Migrator | true | Enable Railway private IPv6 networking. |
| `PORT` | Admin | 3000 | Port the admin panel listens on. |
| `WEB_URL` | Admin | - | Public Plane URL for constructing absolute admin links. |
| `HOSTNAME` | Admin | :: | IPv6 bind-all address. |
| `REDIS_URL` | Admin | - | Redis instance for cache and background operations. |
| `USE_MINIO` | Admin | 1 | Whether to use Minio instead of AWS S3 for storage (Railway template defaults to Minio). |
| `SECRET_KEY` | Admin | (secret) | Shared secret for crypto operations. |
| `DATABASE_URL` | Admin | - | Internal Postgres connection. |
| `AWS_S3_BUCKET_NAME` | Admin | uploads | Bucket where Plane stores files and attachments. |
| `CORS_ALLOWED_ORIGINS` | Admin | - | Allowed origins for admin-initiated API calls. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Admin | true | Alpine networking fix. |
| `PORT` | Live | 3000 | Internal Live collaboration port. |
| `AMQP_URL` | Live | - | Private RabbitMQ connection. |
| `REDIS_URL` | Live | - | Redis connection string for presence events and transient state. |
| `REDIS_HOST` | Live | - | Redis hostname for pub/sub fanout. |
| `REDIS_PORT` | Live | - | Redis port. |
| `API_BASE_URL` | Live | - | Private Plane API endpoint. |
| `LIVE_SERVER_SECRET_KEY` | Live | (secret) | Secret used for authenticating live events. |
| `USER` | RabbitMQ | - | Service username. |
| `VHOST` | RabbitMQ | - | Same vhost as above. |
| `PASSWORD` | RabbitMQ | (secret) | Service password. |
| `RABBITMQ_HOST` | RabbitMQ | - | Private hostname of RabbitMQ. |
| `RABBITMQ_PORT` | RabbitMQ | 5672 | Private port. |
| `RABBITMQ_VHOST` | RabbitMQ | - | Same vhost as above. |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | Default RabbitMQ password. |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | Default RabbitMQ username. |
| `RABBITMQ_DEFAULT_VHOST` | RabbitMQ | plane | Default vhost for Plane queues. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private URL for Postgres. |
| `PORT` | Web | 3000 | Port the Plane frontend listens on internally. |
| `WEB_URL` | Web | - | Public domain for the frontend. |
| `HOSTNAME` | Web | :: | IPv6 bind-all address. |
| `NEXT_PUBLIC_DEPLOY_URL` | Web | - | Public URL injected into the frontend bundle at build time. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Web | true | Alpine networking fix for frontend container. |
| `PORT` | Plane | 80 | Exported PORT for public networking. |
| `BUCKET_NAME` | Plane | - | Object-storage bucket name used for file uploads in Plane. |
| `API_ENDPOINT` | Plane | - | Internal API endpoint for all backend requests. |
| `WEB_ENDPOINT` | Plane | - | Internal frontend endpoint for serving Plane UI assets. |
| `LIVE_ENDPOINT` | Plane | - | Internal Live service endpoint used for live updates. |
| `ADMIN_ENDPOINT` | Plane | - | Internal admin dashboard endpoint. |
| `BUCKET_ENDPOINT` | Plane | - | Private endpoint to S3 bucket. |
| `SPACES_ENDPOINT` | Plane | - | Internal Spaces service endpoint used for workspace storage. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Plane | true | Enables Alpine networking workaround for faster private network provisioning. |
| `PORT` | Bucket | - | Internal Minio port for S3-compatible API. |
| `MINIO_ROOT_USER` | Bucket | (secret) | Generated Minio root user. |
| `MINIO_PRIVATE_HOST` | Bucket | - | Internal private domain for Minio service. |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | Private port for Minio API. |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | Generated Minio root password. |
| `MINIO_PRIVATE_ENDPOINT` | Bucket | - | Private Minio S3 endpoint used by Plane. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PRIVATE_URL` | Redis | - | Private Redis URL. |
| `DEBUG` | Worker | 0 | Disable Django debug mode. |
| `WEB_URL` | Worker | - | Public Plane origin. |
| `AMQP_URL` | Worker | - | Private RabbitMQ connection. |
| `REDIS_URL` | Worker | - | Private Redis connection. |
| `USE_MINIO` | Worker | 1 | Use the bundled private MinIO service. |
| `APP_DOMAIN` | Worker | - | Public Plane hostname. |
| `AWS_REGION` | Worker | - | Optional S3 signing region. |
| `REDIS_HOST` | Worker | - | Private Redis host. |
| `REDIS_PORT` | Worker | 6379 | Private Redis port. |
| `SECRET_KEY` | Worker | (secret) | Shared generated Django signing key. |
| `BUCKET_NAME` | Worker | uploads | Attachment bucket name used by the proxy. |
| `APP_BASE_URL` | Worker | - | Public Plane application origin. |
| `DATABASE_URL` | Worker | - | Private PostgreSQL connection. |
| `SITE_ADDRESS` | Worker | :80 | Proxy site address metadata. |
| `LIVE_BASE_URL` | Worker | - | Public Plane origin for Live. |
| `ADMIN_BASE_URL` | Worker | - | Public Plane origin for God Mode. |
| `LIVE_BASE_PATH` | Worker | /live | Live collaboration path. |
| `SPACE_BASE_URL` | Worker | - | Public Plane origin for Spaces. |
| `ADMIN_BASE_PATH` | Worker | /god-mode | God Mode path. |
| `FILE_SIZE_LIMIT` | Worker | 5242880 | Maximum upload size in bytes. |
| `MINIO_ROOT_USER` | Worker | (secret) | MinIO access key reference. |
| `SPACE_BASE_PATH` | Worker | /spaces | Spaces path. |
| `GUNICORN_WORKERS` | Worker | 1 | API worker count suitable for the initial Railway allocation. |
| `LISTEN_HTTP_PORT` | Worker | 80 | Proxy HTTP port metadata. |
| `AWS_ACCESS_KEY_ID` | Worker | - | Private MinIO access key. |
| `LISTEN_HTTPS_PORT` | Worker | 443 | Proxy HTTPS port metadata. |
| `API_KEY_RATE_LIMIT` | Worker | (secret) | Default API key rate limit. |
| `AWS_S3_BUCKET_NAME` | Worker | uploads | Attachment bucket name. |
| `MINIO_ENDPOINT_SSL` | Worker | 0 | Use HTTP on Railway private networking. |
| `AWS_S3_ENDPOINT_URL` | Worker | - | Private MinIO S3 endpoint. |
| `MINIO_ROOT_PASSWORD` | Worker | (secret) | MinIO secret key reference. |
| `WEBHOOK_ALLOWED_IPS` | Worker | - | Optional webhook IP allowlist. |
| `CORS_ALLOWED_ORIGINS` | Worker | - | Allow browser requests from the public proxy origin. |
| `AWS_SECRET_ACCESS_KEY` | Worker | (secret) | Private MinIO secret key. |
| `SIGNED_URL_EXPIRATION` | Worker | 3600 | Signed attachment URL lifetime in seconds. |
| `WEBHOOK_ALLOWED_HOSTS` | Worker | - | Optional webhook host allowlist. |
| `HARD_DELETE_AFTER_DAYS` | Worker | 60 | Retention before hard deletion. |
| `LIVE_SERVER_SECRET_KEY` | Worker | (secret) | Shared Live authentication key. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | Enable Railway private IPv6 networking. |
| `DEBUG` | Beat Worker | 0 | Disable Django debug mode. |
| `WEB_URL` | Beat Worker | - | Public Plane origin. |
| `AMQP_URL` | Beat Worker | - | Private RabbitMQ connection. |
| `REDIS_URL` | Beat Worker | - | Private Redis connection. |
| `USE_MINIO` | Beat Worker | 1 | Use the bundled private MinIO service. |
| `APP_DOMAIN` | Beat Worker | - | Public Plane hostname. |
| `AWS_REGION` | Beat Worker | - | Optional S3 signing region. |
| `REDIS_HOST` | Beat Worker | - | Private Redis host. |
| `REDIS_PORT` | Beat Worker | 6379 | Private Redis port. |
| `SECRET_KEY` | Beat Worker | (secret) | Shared generated Django signing key. |
| `BUCKET_NAME` | Beat Worker | uploads | Attachment bucket name used by the proxy. |
| `APP_BASE_URL` | Beat Worker | - | Public Plane application origin. |
| `DATABASE_URL` | Beat Worker | - | Private PostgreSQL connection. |
| `SITE_ADDRESS` | Beat Worker | :80 | Proxy site address metadata. |
| `LIVE_BASE_URL` | Beat Worker | - | Public Plane origin for Live. |
| `ADMIN_BASE_URL` | Beat Worker | - | Public Plane origin for God Mode. |
| `LIVE_BASE_PATH` | Beat Worker | /live | Live collaboration path. |
| `SPACE_BASE_URL` | Beat Worker | - | Public Plane origin for Spaces. |
| `ADMIN_BASE_PATH` | Beat Worker | /god-mode | God Mode path. |
| `FILE_SIZE_LIMIT` | Beat Worker | 5242880 | Maximum upload size in bytes. |
| `MINIO_ROOT_USER` | Beat Worker | (secret) | MinIO access key reference. |
| `SPACE_BASE_PATH` | Beat Worker | /spaces | Spaces path. |
| `GUNICORN_WORKERS` | Beat Worker | 1 | API worker count suitable for the initial Railway allocation. |
| `LISTEN_HTTP_PORT` | Beat Worker | 80 | Proxy HTTP port metadata. |
| `AWS_ACCESS_KEY_ID` | Beat Worker | - | Private MinIO access key. |
| `LISTEN_HTTPS_PORT` | Beat Worker | 443 | Proxy HTTPS port metadata. |
| `API_KEY_RATE_LIMIT` | Beat Worker | (secret) | Default API key rate limit. |
| `AWS_S3_BUCKET_NAME` | Beat Worker | uploads | Attachment bucket name. |
| `MINIO_ENDPOINT_SSL` | Beat Worker | 0 | Use HTTP on Railway private networking. |
| `AWS_S3_ENDPOINT_URL` | Beat Worker | - | Private MinIO S3 endpoint. |
| `MINIO_ROOT_PASSWORD` | Beat Worker | (secret) | MinIO secret key reference. |
| `WEBHOOK_ALLOWED_IPS` | Beat Worker | - | Optional webhook IP allowlist. |
| `CORS_ALLOWED_ORIGINS` | Beat Worker | - | Allow browser requests from the public proxy origin. |
| `AWS_SECRET_ACCESS_KEY` | Beat Worker | (secret) | Private MinIO secret key. |
| `SIGNED_URL_EXPIRATION` | Beat Worker | 3600 | Signed attachment URL lifetime in seconds. |
| `WEBHOOK_ALLOWED_HOSTS` | Beat Worker | - | Optional webhook host allowlist. |
| `HARD_DELETE_AFTER_DAYS` | Beat Worker | 60 | Retention before hard deletion. |
| `LIVE_SERVER_SECRET_KEY` | Beat Worker | (secret) | Shared Live authentication key. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Beat Worker | true | Enable Railway private IPv6 networking. |

## Configuration

- **Start command:** `npx react-router-serve ./build/server/index.js`
- **Start command:** `./bin/docker-entrypoint-api.sh`
- **Start command:** `./bin/docker-entrypoint-migrator.sh`
- **Start command:** `nginx -g 'daemon off;'`
- **Volume:** `/var/lib/rabbitmq`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Start command:** `./bin/docker-entrypoint-worker.sh`
- **Start command:** `./bin/docker-entrypoint-beat.sh`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/plane-with-rabbitmq)
