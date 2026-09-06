# Deploy S3 Storage One Click on Railway

Deploy S3 compatible object storage on Railway in one click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/s3-storage-one-click)

## About

MinIO is S3 compatible object storage. This template deploys it on Railway in one click with a persistent volume, generated credentials, an automatic `bucket`, a public web console, and an S3 API.

The template runs the official MinIO server on Railway. Object data is stored on a volume at `/data` so files survive redeploys. Root credentials are generated at deploy time. A startup script waits for MinIO and creates the `bucket` bucket if it does not exist. The public Railway URL is the MinIO console.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO | [pagetree/MinIO-S3-Storage](https://github.com/pagetree/MinIO-S3-Storage) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MINIO_ROOT_USER` | (secret) |
| `MINIO_ROOT_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/s3-storage-one-click)
