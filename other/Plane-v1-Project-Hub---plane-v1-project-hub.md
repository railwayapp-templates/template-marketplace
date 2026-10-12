# Deploy Plane v1 Project Hub on Railway

Issues, sprints, docs and roadmaps. Full Plane stack, no per-seat fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plane-v1-project-hub)

## About

Plane is an open-source project management tool for issues, cycles (sprints), modules, pages and roadmaps. This community template deploys the full Plane community edition on Railway as separate services from the official images, with Postgres, Redis, RabbitMQ and a Railway Bucket, behind one domain and with no per-seat fees.

A complete Plane install is more than one container: a Django API, Celery workers and a scheduler, a real-time server for collaborative pages, three front-end apps (main app, public spaces, instance admin) and a reverse proxy that serves them all from one origin. It also needs Postgres, Redis, RabbitMQ and S3-compatible storage. This template runs each process as its own Railway service on the private network, routes the public domain through a small Caddy router, stores uploads in a Railway Bucket using presigned URLs, runs migrations as a pre-deploy step and generates every secret. Instance settings such as SMTP and OAuth are managed in Plane's own admin UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| admin | `makeplane/plane-admin:v1.4.2` | Worker |
| api | `makeplane/plane-backend:v1.4.2` | Worker |
| RabbitMQ | `rabbitmq:3.13.7-management-alpine` | Database |
| space | `makeplane/plane-space:v1.4.2` | Worker |
| proxy | [baranberkay96/plane-railway](https://github.com/baranberkay96/plane-railway) (branch: main) (root: /services/proxy) | Web service |
| beat-worker | `makeplane/plane-backend:v1.4.2` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | `makeplane/plane-frontend:v1.4.2` | Worker |
| Redis | `redis:8.2` | Database |
| worker | `makeplane/plane-backend:v1.4.2` | Worker |
| live | `makeplane/plane-live:v1.4.2` | Worker |
| bucket-cors | `amazon/aws-cli:2.37.12` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | admin | 3000 | Port the app listens on (private network; proxy target). |
| `PORT` | api | 8000 | Gunicorn port (private network; proxy target). |
| `DEBUG` | api | 0 | Django debug mode off. |
| `WEB_URL` | api | - | Public URL of Plane (e-mail links, redirects). Update with a custom domain. |
| `AMQP_URL` | api | - | RabbitMQ broker for Celery jobs. |
| `REDIS_URL` | api | - | Redis for cache and sessions. |
| `USE_MINIO` | api | 0 | 0 = external S3 (Railway Bucket); browsers upload and download with presigned URLs. |
| `AWS_REGION` | api | - | Bucket region (Railway Bucket). |
| `SECRET_KEY` | api | (secret) | Django signing key (sessions, CSRF, password reset). Do not change after first boot. |
| `DATABASE_URL` | api | - | Postgres connection string (private network). |
| `FILE_SIZE_LIMIT` | api | 5242880 | Max upload size in bytes (5 MB, Plane default). Also enforced by the proxy. |
| `GUNICORN_WORKERS` | api | 2 | Gunicorn/uvicorn worker processes for the API. |
| `AWS_ACCESS_KEY_ID` | api | - | Bucket access key. |
| `API_KEY_RATE_LIMIT` | api | (secret) | Throttle for API-key requests. |
| `AWS_DEFAULT_REGION` | api | - | Region for boto3 clients created without an explicit region. |
| `AWS_S3_BUCKET_NAME` | api | - | Bucket name (Railway Bucket). |
| `AWS_S3_ENDPOINT_URL` | api | - | S3 endpoint (Railway Bucket). |
| `CORS_ALLOWED_ORIGINS` | api | - | Allowed browser origins; also used as CSRF trusted origins. Comma-separate extra domains. |
| `AWS_SECRET_ACCESS_KEY` | api | (secret) | Bucket secret key. |
| `LIVE_SERVER_SECRET_KEY` | api | (secret) | Shared secret between api and the live (collaboration) server. |
| `AUTHENTICATION_RATE_LIMIT` | api | 10/minute | Per-IP throttle for anonymous sign-in / magic-link endpoints. |
| `AMQP_URL` | RabbitMQ | - | Connection string for Celery (private network). |
| `RABBITMQ_NODENAME` | RabbitMQ | rabbit@localhost | Fixed node name so the data on the volume survives redeploys (container hostnames change). |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | Broker password (generated). |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | Broker user created on first boot. |
| `RABBITMQ_DEFAULT_VHOST` | RabbitMQ | plane | Broker virtual host. |
| `RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS` | RabbitMQ | +S 2:2 +SDio 2 | Limit Erlang schedulers to 2 (the VM otherwise sizes itself to the host's CPU count). |
| `PORT` | space | 3000 | Port the app listens on (private network; proxy target). |
| `PORT` | proxy | 8080 | Port Caddy listens on (public domain target). |
| `API_UPSTREAM` | proxy | - | API (/api, /auth, /static). |
| `WEB_UPSTREAM` | proxy | - | Main web app. |
| `LIVE_UPSTREAM` | proxy | - | Live collaboration server (/live). |
| `ADMIN_UPSTREAM` | proxy | - | Instance admin (/god-mode). |
| `SPACE_UPSTREAM` | proxy | - | Public spaces (/spaces). |
| `FILE_SIZE_LIMIT` | proxy | - | Max request body size in bytes (same as api). |
| `DEBUG` | beat-worker | - | Shared backend setting: references api.DEBUG (edit it there). |
| `WEB_URL` | beat-worker | - | Shared backend setting: references api.WEB_URL (edit it there). |
| `AMQP_URL` | beat-worker | - | Shared backend setting: references api.AMQP_URL (edit it there). |
| `REDIS_URL` | beat-worker | - | Shared backend setting: references api.REDIS_URL (edit it there). |
| `USE_MINIO` | beat-worker | - | Shared backend setting: references api.USE_MINIO (edit it there). |
| `AWS_REGION` | beat-worker | - | Shared backend setting: references api.AWS_REGION (edit it there). |
| `SECRET_KEY` | beat-worker | (secret) | Shared backend setting: references api.SECRET_KEY (edit it there). |
| `DATABASE_URL` | beat-worker | - | Shared backend setting: references api.DATABASE_URL (edit it there). |
| `FILE_SIZE_LIMIT` | beat-worker | - | Shared backend setting: references api.FILE_SIZE_LIMIT (edit it there). |
| `AWS_ACCESS_KEY_ID` | beat-worker | - | Shared backend setting: references api.AWS_ACCESS_KEY_ID (edit it there). |
| `API_KEY_RATE_LIMIT` | beat-worker | (secret) | Shared backend setting: references api.API_KEY_RATE_LIMIT (edit it there). |
| `AWS_DEFAULT_REGION` | beat-worker | - | Shared backend setting: references api.AWS_DEFAULT_REGION (edit it there). |
| `AWS_S3_BUCKET_NAME` | beat-worker | - | Shared backend setting: references api.AWS_S3_BUCKET_NAME (edit it there). |
| `AWS_S3_ENDPOINT_URL` | beat-worker | - | Shared backend setting: references api.AWS_S3_ENDPOINT_URL (edit it there). |
| `CORS_ALLOWED_ORIGINS` | beat-worker | - | Shared backend setting: references api.CORS_ALLOWED_ORIGINS (edit it there). |
| `AWS_SECRET_ACCESS_KEY` | beat-worker | (secret) | Shared backend setting: references api.AWS_SECRET_ACCESS_KEY (edit it there). |
| `LIVE_SERVER_SECRET_KEY` | beat-worker | (secret) | Shared backend setting: references api.LIVE_SERVER_SECRET_KEY (edit it there). |
| `AUTHENTICATION_RATE_LIMIT` | beat-worker | - | Shared backend setting: references api.AUTHENTICATION_RATE_LIMIT (edit it there). |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB. |
| `PORT` | web | 3000 | Port the app listens on (private network; proxy target). |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment. |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on. |
| `REDISUSER` | Redis | default | Username for authenticating with Redis. |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name. |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis. |
| `DEBUG` | worker | - | Shared backend setting: references api.DEBUG (edit it there). |
| `WEB_URL` | worker | - | Shared backend setting: references api.WEB_URL (edit it there). |
| `AMQP_URL` | worker | - | Shared backend setting: references api.AMQP_URL (edit it there). |
| `REDIS_URL` | worker | - | Shared backend setting: references api.REDIS_URL (edit it there). |
| `USE_MINIO` | worker | - | Shared backend setting: references api.USE_MINIO (edit it there). |
| `AWS_REGION` | worker | - | Shared backend setting: references api.AWS_REGION (edit it there). |
| `SECRET_KEY` | worker | (secret) | Shared backend setting: references api.SECRET_KEY (edit it there). |
| `DATABASE_URL` | worker | - | Shared backend setting: references api.DATABASE_URL (edit it there). |
| `FILE_SIZE_LIMIT` | worker | - | Shared backend setting: references api.FILE_SIZE_LIMIT (edit it there). |
| `AWS_ACCESS_KEY_ID` | worker | - | Shared backend setting: references api.AWS_ACCESS_KEY_ID (edit it there). |
| `API_KEY_RATE_LIMIT` | worker | (secret) | Shared backend setting: references api.API_KEY_RATE_LIMIT (edit it there). |
| `AWS_DEFAULT_REGION` | worker | - | Shared backend setting: references api.AWS_DEFAULT_REGION (edit it there). |
| `AWS_S3_BUCKET_NAME` | worker | - | Shared backend setting: references api.AWS_S3_BUCKET_NAME (edit it there). |
| `AWS_S3_ENDPOINT_URL` | worker | - | Shared backend setting: references api.AWS_S3_ENDPOINT_URL (edit it there). |
| `CORS_ALLOWED_ORIGINS` | worker | - | Shared backend setting: references api.CORS_ALLOWED_ORIGINS (edit it there). |
| `AWS_SECRET_ACCESS_KEY` | worker | (secret) | Shared backend setting: references api.AWS_SECRET_ACCESS_KEY (edit it there). |
| `LIVE_SERVER_SECRET_KEY` | worker | (secret) | Shared backend setting: references api.LIVE_SERVER_SECRET_KEY (edit it there). |
| `AUTHENTICATION_RATE_LIMIT` | worker | - | Shared backend setting: references api.AUTHENTICATION_RATE_LIMIT (edit it there). |
| `CELERY_WORKER_CONCURRENCY` | worker | 2 | Celery prefork processes (default would be one per host CPU, far too many on Railway). |
| `PORT` | live | 3000 | Port the live server listens on (private network; proxy target). |
| `REDIS_URL` | live | - | Redis pub/sub for collaborative editing. |
| `API_BASE_URL` | live | - | Private API URL used by the live server. |
| `LIVE_BASE_PATH` | live | /live | Path prefix routed by the proxy. |
| `LIVE_SERVER_SECRET_KEY` | live | (secret) | Shared secret with api. |
| `S3_REGION` | bucket-cors | - | Bucket region. |
| `BUCKET_NAME` | bucket-cors | - | Bucket to configure. |
| `S3_ENDPOINT` | bucket-cors | - | Bucket S3 endpoint. |
| `PUBLIC_ORIGIN` | bucket-cors | - | Plane's public origin (for the log line). |
| `AWS_ACCESS_KEY_ID` | bucket-cors | - | Bucket access key. |
| `CORS_CONFIGURATION` | bucket-cors | - | CORS rule letting browsers on Plane's domain upload to / read from the bucket with presigned URLs. Add custom domains to AllowedOrigins and redeploy this service. |
| `AWS_SECRET_ACCESS_KEY` | bucket-cors | (secret) | Bucket secret key. |

## Configuration

- **Start command:** `/bin/sh -c "sed -i -e 's/^worker_processes .*/worker_processes 2;/' -e 's/listen 3000;/listen 3000; listen [::]:3000;/' /etc/nginx/nginx.conf && nginx -t && exec nginx -g 'daemon off;'"`
- **Healthcheck:** `/god-mode/`
- **Start command:** `/bin/bash -c "sed 's/--bind 0.0.0.0:/--bind [::]:/' ./bin/docker-entrypoint-api.sh > /tmp/docker-entrypoint-api.sh && exec bash /tmp/docker-entrypoint-api.sh"`
- **Healthcheck:** `/api/instances/`
- **Volume:** `/var/lib/rabbitmq`
- **Healthcheck:** `/spaces/`
- **Healthcheck:** `/proxy-health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `./bin/docker-entrypoint-beat.sh`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/bash -c "python manage.py wait_for_db && python manage.py wait_for_migrations && exec celery -A plane worker -l info --concurrency ${CELERY_WORKER_CONCURRENCY:-2}"`
- **Healthcheck:** `/live/health`
- **Start command:** `/bin/sh -c "aws s3api put-bucket-cors --bucket $BUCKET_NAME --endpoint-url $S3_ENDPOINT --region $S3_REGION --cors-configuration \"$CORS_CONFIGURATION\" && echo 'Bucket CORS configured for' $PUBLIC_ORIGIN"`

**Category:** Other · **Tags:** plane, project-management, issues, jira-alternative, linear-alternative · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/plane-v1-project-hub)
