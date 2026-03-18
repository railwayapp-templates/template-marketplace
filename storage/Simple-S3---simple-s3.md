# Deploy Simple S3 on Railway

Deploy a S3-compatible storage service with a pre-named bucket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/simple-s3)

## About

This template deploys MinIO S3-compatible storage service. It's designed for simplicity, automatically creating a single, pre-named bucket upon startup. This allows you to quickly get a private, self-hosted S3-like service running on Railway for storing files, backups, or application assets.

Hosting this Simple S3 (MinIO) service on Railway is streamlined through this template. Upon deployment, Railway provisions a MinIO instance and automatically injects the necessary MINIO_ROOT_USER and MINIO_ROOT_PASSWORD as secure environment variables. The only required action is to define your desired bucket name in the MINIO_BUCKET variable. A persistent volume is automatically attached to the service, ensuring your data survives restarts and deployments. Railway also provides a public URL, giving you immediate access to the MinIO web console and the S3-compatible API endpoint for your applications to connect to.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Storage CLI | `minio/mc` | Database |
| Storage | `minio/minio` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MINIO_ROOT_USER` | Storage CLI | (secret) |
| `MINIO_ROOT_PASSWORD` | Storage CLI | (secret) |
| `PORT` | Storage | 9001 |
| `MINIO_ROOT_USER` | Storage | (secret) |
| `MINIO_PUBLIC_PORT` | Storage | 443 |
| `MINIO_PRIVATE_PORT` | Storage | 9000 |
| `MINIO_ROOT_PASSWORD` | Storage | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "sleep 30 && until /usr/bin/mc alias set minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}; do echo 'Waiting for MinIO server...' && sleep 5; done && /usr/bin/mc mb minio/${MINIO_BUCKET} --ignore-existing && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && exit 0"`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:9000 --console-address :9001 $RAILWAY_VOLUME_MOUNT_PATH"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/simple-s3)
