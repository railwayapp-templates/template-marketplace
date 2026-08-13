# Deploy MinIO - Cloud Native Object Storage on Railway

S3-compatible object storage with Console, isolated services and auto-init

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minio-railway-template)

## About

MinIO is an open-source, high-performance object storage server that is fully compatible with the Amazon S3 API. It provides a self-hosted alternative for storing unstructured data such as images, videos, backups, and application files, complete with a web-based Console for management.

![MinIO](https://imgur.com/3ilValT.png)

This template deploys MinIO using three isolated services on Railway: **Bucket** (S3 API), **Console** (web UI), and **Init** (one-shot helper that automatically creates the first bucket). The Bucket service stays on Railway’s private network for security, while the Console is exposed publicly. Persistent data is stored on a Railway volume mounted at `/data`. Root credentials are generated as secrets, and private/public endpoints are pre-configured so other services can connect securely without extra setup.

![MInIO](https://imgur.com/ICD1huh.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| Bucket | [railwayapp-templates/minio](https://github.com/railwayapp-templates/minio) | Database |
| Init | `minio/mc` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Console | 9090 |
| `PASSWORD` | Console | (secret) |
| `USERNAME` | Console | (secret) |
| `MINIO_ROOT_USER` | Bucket | (secret) |
| `MINIO_PUBLIC_PORT` | Bucket | 443 |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 |
| `MINIO_STS_DURATION` | Bucket | 1h |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) |
| `MINIO_BUCKET` | Init | init-bucket |
| `MINIO_ROOT_USER` | Init | (secret) |
| `MINIO_ROOT_PASSWORD` | Init | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `sh -c "echo Waiting for MinIO endpoint: $MINIO_ENDPOINT; until mc alias set local $MINIO_ENDPOINT $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD; do echo MinIO alias not ready yet...; sleep 3; done; until mc admin info local >/dev/null 2>&1; do echo MinIO server not ready yet...; sleep 3; done; until mc mb --ignore-existing local/$MINIO_BUCKET; do echo Bucket create failed, retrying...; sleep 3; done; echo Bucket ready: $MINIO_BUCKET; tail -f /dev/null"`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/minio-railway-template)
