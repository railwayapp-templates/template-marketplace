# Deploy Plane (Self-Hosted Jira/Linear Alternative) on Railway

Self-hosted Jira/Linear alternative for issue tracking. [Updated Aug '26]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plane-self-hosted-jiralinear-alternative)

## About

Plane is an open-source project and issue tracker — a self-hosted Jira or Linear alternative that you fully own. Plan work with issues, cycles (sprints) and modules, track progress on boards, spreadsheet and Gantt views, write specs in Pages, and manage initiatives across projects. This template deploys the complete Plane Community stack — the API server, background worker, beat scheduler, the web, admin and public "spaces" front-ends, a real-time collaboration server, PostgreSQL, Redis (Valkey), RabbitMQ and an S3-compatible MinIO object store, all behind a single Caddy reverse proxy — each pinned to a verified upstream image and wired over Railway's private network so it comes up working on the first deploy.

Plane is a multi-service application: a Django REST API, Celery worker and beat processes, three Next.js front-ends (the main app, the admin "god-mode" panel and public shared views), and a Hocuspocus live server, backed by PostgreSQL, Redis/Valkey, RabbitMQ and MinIO. Only one service — the proxy — is exposed publicly; it routes `/`, `/spaces`, `/god-mode`, `/api`, `/live` and file storage to the right internal service over Railway's private network. This template configures every connection string, generates fresh app secrets on each deploy, runs database migrations automatically on first boot (with retry-on-boot resilience), and attaches persistent volumes to Postgres, Redis, RabbitMQ and MinIO. When the app loads you open `/god-mode` to create the instance admin, then sign up as the first workspace owner.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | `makeplane/plane-backend:v1.4.1` | Worker |
| admin | `makeplane/plane-admin:v1.4.1` | Worker |
| beat | `makeplane/plane-backend:v1.4.1` | Worker |
| rabbitmq | `rabbitmq:3.13.6-management-alpine` | Database |
| proxy | `makeplane/plane-proxy:v1.4.1` | Web service |
| postgres | `postgres:15.7-alpine` | Database |
| minio | `minio/minio:RELEASE.2025-04-08T15-41-24Z` | Database |
| valkey | `valkey/valkey:7.2.11-alpine` | Database |
| web | `makeplane/plane-frontend:v1.4.1` | Worker |
| space | `makeplane/plane-space:v1.4.1` | Worker |
| worker | `makeplane/plane-backend:v1.4.1` | Worker |
| live | `makeplane/plane-live:v1.4.1` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | api | 8000 |
| `DEBUG` | api | 0 |
| `USE_MINIO` | api | 1 |
| `AWS_REGION` | api | us-east-1 |
| `SECRET_KEY` | api | (secret) |
| `FILE_SIZE_LIMIT` | api | 5242880 |
| `GUNICORN_WORKERS` | api | 1 |
| `AWS_ACCESS_KEY_ID` | api | plane-minio |
| `API_KEY_RATE_LIMIT` | api | (secret) |
| `AWS_S3_BUCKET_NAME` | api | uploads |
| `MINIO_ENDPOINT_SSL` | api | 0 |
| `AWS_SECRET_ACCESS_KEY` | api | (secret) |
| `LIVE_SERVER_SECRET_KEY` | api | (secret) |
| `PORT` | admin | 3000 |
| `DEBUG` | beat | 0 |
| `USE_MINIO` | beat | 1 |
| `AWS_REGION` | beat | us-east-1 |
| `SECRET_KEY` | beat | (secret) |
| `FILE_SIZE_LIMIT` | beat | 5242880 |
| `GUNICORN_WORKERS` | beat | 1 |
| `AWS_ACCESS_KEY_ID` | beat | plane-minio |
| `API_KEY_RATE_LIMIT` | beat | (secret) |
| `AWS_S3_BUCKET_NAME` | beat | uploads |
| `MINIO_ENDPOINT_SSL` | beat | 0 |
| `AWS_SECRET_ACCESS_KEY` | beat | (secret) |
| `LIVE_SERVER_SECRET_KEY` | beat | (secret) |
| `RABBITMQ_DEFAULT_USER` | rabbitmq | (secret) |
| `RABBITMQ_DEFAULT_VHOST` | rabbitmq | plane |
| `PORT` | proxy | 8080 |
| `BUCKET_NAME` | proxy | uploads |
| `CADDYFILE_B64` | proxy | OnskUE9SVH0gewoJcmVxdWVzdF9ib2R5IHsKCQltYXhfc2l6ZSB7JEZJTEVfU0laRV9MSU1JVH0KCX0KCXJlZGlyIC9zcGFjZXMgL3NwYWNlcy8gcGVybWFuZW50CglyZXZlcnNlX3Byb3h5IC9zcGFjZXMvKiB7JFNQQUNFX1VQU1RSRUFNfQoJcmVkaXIgL2dvZC1tb2RlIC9nb2QtbW9kZS8gcGVybWFuZW50CglyZXZlcnNlX3Byb3h5IC9nb2QtbW9kZS8qIHskQURNSU5fVVBTVFJFQU19CglyZXZlcnNlX3Byb3h5IC9saXZlLyogeyRMSVZFX1VQU1RSRUFNfQoJcmV2ZXJzZV9wcm94eSAvYXBpLyogeyRBUElfVVBTVFJFQU19CglyZXZlcnNlX3Byb3h5IC9hdXRoLyogeyRBUElfVVBTVFJFQU19CglyZXZlcnNlX3Byb3h5IC9zdGF0aWMvKiB7JEFQSV9VUFNUUkVBTX0KCXJldmVyc2VfcHJveHkgL3skQlVDS0VUX05BTUV9LyogeyRNSU5JT19VUFNUUkVBTX0KCXJldmVyc2VfcHJveHkgL3skQlVDS0VUX05BTUV9IHskTUlOSU9fVVBTVFJFQU19CglyZXZlcnNlX3Byb3h5IC8qIHskV0VCX1VQU1RSRUFNfQp9Cg== |
| `FILE_SIZE_LIMIT` | proxy | 5242880 |
| `POSTGRES_DB` | postgres | plane |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `PORT` | web | 3000 |
| `PORT` | space | 3000 |
| `DEBUG` | worker | 0 |
| `USE_MINIO` | worker | 1 |
| `AWS_REGION` | worker | us-east-1 |
| `SECRET_KEY` | worker | (secret) |
| `FILE_SIZE_LIMIT` | worker | 5242880 |
| `GUNICORN_WORKERS` | worker | 1 |
| `AWS_ACCESS_KEY_ID` | worker | plane-minio |
| `API_KEY_RATE_LIMIT` | worker | (secret) |
| `AWS_S3_BUCKET_NAME` | worker | uploads |
| `MINIO_ENDPOINT_SSL` | worker | 0 |
| `AWS_SECRET_ACCESS_KEY` | worker | (secret) |
| `LIVE_SERVER_SECRET_KEY` | worker | (secret) |
| `PORT` | live | 3000 |
| `LIVE_SERVER_SECRET_KEY` | live | (secret) |

## Configuration

- **Start command:** `./bin/docker-entrypoint-api.sh`
- **Start command:** `./bin/docker-entrypoint-beat.sh`
- **Volume:** `/var/lib/rabbitmq`
- **Start command:** `sh -c 'echo "$CADDYFILE_B64" | base64 -d > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh postgres -c 'max_connections=1000'`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'minio server /data --console-address ":9090"'`
- **Volume:** `/data`
- **Start command:** `./bin/docker-entrypoint-worker.sh`

**Category:** Other

[View on Railway →](https://railway.com/deploy/plane-self-hosted-jiralinear-alternative)
