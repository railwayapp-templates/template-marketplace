# Deploy dograh on Railway

Open Source Voice Agent Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dograh)

## About

Dograh runs on Railway as a Docker-first multi-service stack with a browser-ready UI, FastAPI backend, and managed data dependencies.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:7.2.14` | Database |
| api | `dograhai/dograh-api:1.30.1` | Web service |
| minio | `minio/minio:RELEASE.2025-06-13T11-33-47Z` | Database |
| ui | `dograhai/dograh-ui:1.30.1` | Web service |
| postgres | `pgvector/pgvector:0.8.2-pg17-trixie` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | api | 8000 |
| `LOG_LEVEL` | api | INFO |
| `ARQ_WORKERS` | api | 1 |
| `ENVIRONMENT` | api | production |
| `MINIO_BUCKET` | api | voice-audio |
| `MINIO_SECURE` | api | false |
| `ENABLE_AWS_S3` | api | false |
| `OSS_JWT_SECRET` | api | (secret) |
| `FASTAPI_WORKERS` | api | 1 |
| `ENABLE_TELEMETRY` | api | true |
| `MINIO_SECRET_KEY` | api | (secret) |
| `PORT` | minio | 9000 |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `MINIO_API_CORS_ALLOW_ORIGIN` | minio | * |
| `PORT` | ui | 3010 |
| `NODE_ENV` | ui | oss |
| `ENABLE_TELEMETRY` | ui | true |
| `NEXT_PUBLIC_NODE_ENV` | ui | oss |
| `POSTGRES_DB` | postgres | postgres |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `minio server /data --console-address :9001`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/dograh)
