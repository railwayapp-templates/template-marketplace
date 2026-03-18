# Deploy MinIO - Isolated Services on Railway

S3-compatible object storage with isolated bucket and console services

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minio-isolated-services)

## About

### About Hosting MinIO — Isolated Services

MinIO is an open-source, high-performance, S3-compatible object storage system designed for cloud-native workloads.

This **Two Services** template deploys MinIO using **separate services** on Railway: one service dedicated to the **S3 Bucket API** and another dedicated to the **Web Console**. This architecture enables stronger security boundaries, better scalability, and clearer separation of responsibilities compared to a single-service deployment.

You can configure security-sensitive options such as STS token duration, expose only the Console publicly, and keep the Bucket service private within Railway’s internal network. Data is persisted using Railway volumes.

### Common Use Cases

* Production object storage with stricter security requirements
* Internal or private S3-compatible storage backends
* AI/ML pipelines requiring stable and isolated storage services
* Multi-application environments sharing a single storage backend
* Teams requiring controlled access to the MinIO Console

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| MinIO Bucket | [railwayapp-templates/minio](https://github.com/railwayapp-templates/minio) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | MinIO Console | 9090 |
| `PASSWORD` | MinIO Console | (secret) |
| `USERNAME` | MinIO Console | (secret) |
| `MINIO_ROOT_USER` | MinIO Bucket | (secret) |
| `MINIO_PUBLIC_PORT` | MinIO Bucket | 443 |
| `MINIO_PRIVATE_PORT` | MinIO Bucket | 9000 |
| `MINIO_STS_DURATION` | MinIO Bucket | 1h |
| `MINIO_ROOT_PASSWORD` | MinIO Bucket | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/minio-isolated-services)
