# Deploy Plane with RabbitMQ on Railway

Deploy and Host Plane with RabbitMQ with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/plane-with-rabbitmq)

## About

<p align="center">
  <img width="420" src="https://media.docs.plane.so/logo/plane_github_readme.png">
</p>

Plane is an open-source project-management system that unifies issue tracking, cycles, roadmaps, analytics, and documentation into a coherent, highly interactive interface. It aims to replace fragmented workflows by providing a single, extensible platform that remains operationally lightweight while still supporting complex product and engineering practices.

Self-hosting Plane entails deploying a multi-service stack consisting of its Next.js frontend, Django backend, worker processes, and a backing PostgreSQL database. The system also requires persistent storage for user-generated content and compatibility with background task execution. Railway’s managed runtime simplifies this otherwise brittle setup: services deploy from source or containers, environment variables propagate cleanly, and scaling is automatic. The result is a maintainable deployment with minimal operational surface area, suitable for production use without maintaining a bespoke infrastructure footprint. 

<p>
  <img src="https://media.docs.plane.so/GitHub-readme/github-top.webp">
</p>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Space | `makeplane/plane-space` | Web service |
| API | `makeplane/plane-backend` | Web service |
| Migrator | `makeplane/plane-backend` | Worker |
| Admin | `makeplane/plane-admin` | Web service |
| Live | `makeplane/plane-live` | Worker |
| RabbitMQ | `rabbitmq:3.13.6-management-alpine` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Web | `makeplane/plane-frontend` | Web service |
| Plane | [monotykamary/plane-caddy-proxy](https://github.com/monotykamary/plane-caddy-proxy) | Web service |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| Bucket | `ghcr.io/coollabsio/minio` | Database |
| Redis | `redis:8.2.1` | Database |
| Worker | `makeplane/plane-backend` | Worker |
| Beat Worker | `makeplane/plane-backend` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Space | 3001 | Port the Spaces service listens on; exposed only internally. |
| `WEB_URL` | Space | - | Public Plane base URL used for generating absolute links. |
| `HOSTNAME` | Space | :: | IPv6 bind address; allows listening on all interfaces. |
| `SECRET_KEY` | Space | (secret) | Shared secret for cryptographic signing across services. |
| `PORT` | API | 8000 | Port to listen and export to. |
| `WEB_URL` | API | - | Public Plane domain. |
| `REDIS_URL` | API | - | Private Redis URL. |
| `USE_MINIO` | API | 1 | 1 |
| `MACHINE_ID` | API | - | Unique machine ID. |
| `SECRET_KEY` | API | (secret) | Unique secret key. |
| `DATABASE_URL` | API | - | Private Postgres URL. |
| `GUNICORN_WORKERS` | API | 4 | Number of gunicorn workers to run at once. |
| `AWS_S3_BUCKET_NAME` | API | uploads | S3 bucket name. |
| `CORS_ALLOWED_ORIGINS` | API | - | Whitelist CORS origins to allow cross upload. |
| `LIVE_SERVER_SECRET_KEY` | API | (secret) | ecret used for authenticating live events. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | API | true | Workaround for Alpine-based images. |
| `DEBUG` | Migrator | 0 | Django debug mode. |
| `WEB_URL` | Migrator | - | Needed because the migrator boots the Django context. |
| `AMQP_URL` | Migrator | - | URL to connect to RabbitMQ for live events. |
| `REDIS_URL` | Migrator | - | Redis connection string for presence events and transient state. |
| `USE_MINIO` | Migrator | 1 | Use Railway Minio bucket. |
| `APP_DOMAIN` | Migrator | ${Plane.RAILWAY_PUBLIC_DOMAIN} | Domain used for migrations involving absolute URLs. |
| `REDIS_HOST` | Migrator | - | Redis hostname for pub/sub fanout. |
| `REDIS_PORT` | Migrator | - | Redis port. |
| `SECRET_KEY` | Migrator | (secret) | Same shared signing key. |
| `BUCKET_NAME` | Migrator | uploads | - |
| `DATABASE_URL` | Migrator | - | Private Postgres URL for migrations. |
| `SITE_ADDRESS` | Migrator | :80 | - |
| `FILE_SIZE_LIMIT` | Migrator | 5242880 | Max file upload size (5 MB). |
| `MINIO_ROOT_USER` | Migrator | (secret) | Minio access key. |
| `GUNICORN_WORKERS` | Migrator | 1 | Irrelevant for migrator but required in env template. |
| `LISTEN_HTTP_PORT` | Migrator | 80 | Required env var but unused in migrator. |
| `AWS_ACCESS_KEY_ID` | Migrator | - | S3-compatible access key. |
| `LISTEN_HTTPS_PORT` | Migrator | 443 | - |
| `API_KEY_RATE_LIMIT` | Migrator | (secret) | Default rate limit, used by API config loading. |
| `AWS_S3_BUCKET_NAME` | Migrator | uploads | Bucket name for attachments. |
| `MINIO_ENDPOINT_SSL` | Migrator | 0 | Railway Minio is HTTP inside private network. |
| `AWS_S3_ENDPOINT_URL` | Migrator | - | Private Minio endpoint. |
| `MINIO_ROOT_PASSWORD` | Migrator | (secret) | Minio secret key. |
| `CORS_ALLOWED_ORIGINS` | Migrator | - | Required for Django settings bootstrap. |
| `AWS_SECRET_ACCESS_KEY` | Migrator | (secret) | S3-compatible secret key. |
| `LIVE_SERVER_SECRET_KEY` | Migrator | (secret) | Loaded in Django settings. |
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
| `AMQP_URL` | Live | - | URL to connect to RabbitMQ for live events. |
| `REDIS_URL` | Live | - | Redis connection string for presence events and transient state. |
| `REDIS_HOST` | Live | - | Redis hostname for pub/sub fanout. |
| `REDIS_PORT` | Live | - | Redis port. |
| `API_BASE_URL` | Live | - | Internal API endpoint used by the Live server for real-time sync. |
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
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
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
| `PORT` | Console | 9090 | Port for the Minio Console (management UI). |
| `PORT` | Bucket | - | Internal Minio port for S3-compatible API. |
| `MINIO_ROOT_USER` | Bucket | (secret) | Generated Minio root user. |
| `MINIO_PUBLIC_HOST` | Bucket | - | Public domain used to expose Minio (if enabled). |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | Public Minio port. |
| `MINIO_PRIVATE_HOST` | Bucket | - | Internal private domain for Minio service. |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | Private port for Minio API. |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | Generated Minio root password. |
| `MINIO_PUBLIC_ENDPOINT` | Bucket | - | Public Minio S3 endpoint. |
| `MINIO_PRIVATE_ENDPOINT` | Bucket | - | Private Minio S3 endpoint used by Plane. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `REDIS_PRIVATE_URL` | Redis | - | Private Redis URL. |
| `AMQP_URL` | Worker | - | URL to connect to RabbitMQ for live events. |
| `REDIS_URL` | Worker | - | Private Redis URL. |
| `SECRET_KEY` | Worker | (secret) | Secret key generated from API. |
| `DATABASE_URL` | Worker | - | Private Postgres URL. |
| `LIVE_SERVER_SECRET_KEY` | Worker | (secret) | ecret used for authenticating live events. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | Workaround for Alpine-based images. |
| `AMQP_URL` | Beat Worker | - | URL to connect to RabbitMQ for live events. |
| `REDIS_URL` | Beat Worker | - | Redis instance used for background jobs and task queue. |
| `SECRET_KEY` | Beat Worker | (secret) | Shared secret key for cryptographic signing. |
| `DATABASE_URL` | Beat Worker | - | Internal Postgres connection string. |
| `LIVE_SERVER_SECRET_KEY` | Beat Worker | (secret) | ecret used for authenticating live events. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Beat Worker | true | Alpine networking fix. |

## Configuration

- **Start command:** `node space/server.js space`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "python manage.py wait_for_db && python manage.py migrate && python manage.py register_instance ${MACHINE_ID} && python manage.py configure_instance && python manage.py create_bucket && python manage.py clear_cache; gunicorn -w ${GUNICORN_WORKERS} -k uvicorn.workers.UvicornWorker plane.asgi:application --bind [::]:${PORT} --max-requests 1200 --max-requests-jitter 1000 --access-logfile -"`
- **Start command:** `./bin/docker-entrypoint-migrator.sh`
- **Start command:** `node admin/server.js admin`
- **TCP Proxies:** 5672
- **Volume:** `/var/lib/rabbitmq`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node web/server.js web`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Start command:** `/bin/sh -c "minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Start command:** `/bin/sh -c "python manage.py wait_for_db && python manage.py wait_for_migrations && celery -A plane worker -l info --concurrency 4"`
- **Start command:** `./bin/docker-entrypoint-beat.sh`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/plane-with-rabbitmq)
