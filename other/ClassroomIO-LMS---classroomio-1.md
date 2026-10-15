# Deploy ClassroomIO LMS on Railway

Deploy and Selfhost ClassroomIO.com on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/classroomio-1)

## About

Hosting ClassroomIO means running three application services together: the **API** (backend, auth, business logic), the **Dashboard** (the web UI teachers and students use), and a **Jobs worker** that processes video, transcription, AI course generation, and email in the background. They depend on a **PostgreSQL** database and a **Redis** queue, plus S3-compatible object storage for media uploads and an SMTP provider for email. On Railway, Postgres and Redis are one-click plugins, and the three services build straight from the repository's Dockerfiles. Database schema setup runs automatically on the API's first boot — there's no manual migration step. Only the dashboard is exposed publicly; the API and worker stay on the private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| cio-storage | `chrislusf/seaweedfs:4.48` | Worker |
| cio-dashboard | `classroomio/dashboard:latest` | Worker |
| db | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| cio-jobs | `classroomio/jobs:edge` | Worker |
| db-studio | `ghcr.io/drizzle-team/gateway:1.3.0` | Worker |
| cio-api | `classroomio/api:edge` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | cio-storage | 9000 | - |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | cio-storage | (secret) | - |
| `PRIVATE_SERVER_KEY` | cio-dashboard | - | same value as cio-api |
| `PUBLIC_IS_SELFHOSTED` | cio-dashboard | true | - |
| `CSP_MEDIA_SRC_DOMAINS` | cio-dashboard | - | Optional broader override (custom domain): ALLOWED_EXTERNAL_DOMAINS=https://*.yourdomain.com,https://fonts.googleapis.com |
| `PRIVATE_APP_SUBDOMAINS` | cio-dashboard | app | Required so uploaded media (served from MinIO's public domain) isn't blocked by CSP: |
| `POSTGRES_DB` | db | railway | Default database created when image is started. |
| `DATABASE_URL` | db | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | db | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | db | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | db | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDIS_URL` | cio-jobs | - | Object storage → cio-minio (same as cio-api) |
| `SMTP_USER` | cio-jobs | (secret) | - |
| `SMTP_PASSWORD` | cio-jobs | (secret) | - |
| `OPENAI_API_KEY` | cio-jobs | (secret) | - |
| `PUBLIC_IS_SELFHOSTED` | cio-jobs | true | - |
| `CIO_DEPLOYMENT_METHOD` | cio-jobs | railway | - |
| `OBJECT_STORAGE_FORCE_PATH_STYLE` | cio-jobs | true | - |
| `OBJECT_STORAGE_MEDIA_PUBLIC_BASE_URL` | cio-jobs | - | Optional bucket overrides (defaults videos/documents/media): |
| `PORT` | db-studio | 4983 | - |
| `STORE_PATH` | db-studio | /app | - |
| `PORT` | cio-api | 3081 | - |
| `SMTP_USER` | cio-api | (secret) | - |
| `SMTP_SENDER` | cio-api | - | Object storage → cio-minio |
| `SMTP_PASSWORD` | cio-api | (secret) | - |
| `OPENAI_API_KEY` | cio-api | (secret) | - |
| `DASHBOARD_ORIGIN` | cio-api | - | Auth secrets (from Step 2) |
| `UNSPLASH_API_KEY` | cio-api | (secret) | - |
| `PUBLIC_SERVER_URL` | cio-api | - | only if api is public (add a public domain → target port = api $PORT) |
| `BETTER_AUTH_SECRET` | cio-api | (secret) | - |
| `PRIVATE_SERVER_KEY` | cio-api | <openssl rand -hex 32> | identical in cio-dashboard |
| `GOOGLE_CLIENT_SECRET` | cio-api | (secret) | - |
| `PUBLIC_IS_SELFHOSTED` | cio-api | true | Reference the dashboard service's Railway domain (custom domain? hardcode https://app.yourdomain.com) |
| `OBJECT_STORAGE_FORCE_PATH_STYLE` | cio-api | true | - |
| `OBJECT_STORAGE_SECRET_ACCESS_KEY` | cio-api | (secret) | - |
| `OBJECT_STORAGE_MEDIA_PUBLIC_BASE_URL` | cio-api | - | Optional |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'mkdir -p /etc/seaweedfs; printf "{\"identities\":[{\"name\":\"admin\",\"credentials\":[{\"accessKey\":\"%s\",\"secretKey\":\"%s\"}],\"actions\":[\"Admin\",\"Read\",\"Write\",\"List\",\"Tagging\"]},{\"name\":\"anonymous\",\"actions\":[\"Read:media\"]}]}" "$OBJECT_STORAGE_ACCESS_KEY_ID" "$OBJECT_STORAGE_SECRET_ACCESS_KEY" > /etc/seaweedfs/s3.json; (until wget -q -O /dev/null http://127.0.0.1:9000/healthz; do sleep 2; done; for b in videos documents media; do echo "s3.bucket.create -name $b" | weed shell -master=127.0.0.1:9333; done) & exec /entrypoint.sh server -s3 -s3.port=9000 -s3.config=/etc/seaweedfs/s3.json "-s3.allowedOrigins=*"'`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/classroomio-1)
