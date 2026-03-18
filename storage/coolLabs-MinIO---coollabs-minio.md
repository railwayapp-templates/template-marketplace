# Deploy coolLabs MinIO on Railway

Deploy and Host coolLabs MinIO with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/coollabs-minio)

## About

MinIO is a high-performance, S3-compatible object storage system that provides enterprise-grade infrastructure for managing unstructured data such as photos, videos, backups, and application assets. It maintains full Amazon S3 API compatibility, enabling seamless integration with existing tools and SDKs. **coolLabs MinIO** offers the same robust MinIO experience while maintaining a secure, continuously updated Docker image for simplified deployment on Railway.

Hosting MinIO provides a self-contained, high-performance storage server capable of handling uploads, backups, and static content delivery using S3-compatible APIs. It includes built-in encryption, fine-grained access policies, and multi-tenancy support. Railway enhances this with persistent volumes, automated scaling, and secure networking, ensuring reliable, production-grade deployments with minimal operational overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bucket | `ghcr.io/coollabsio/minio:latest` | Database |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Bucket | - | Internal port MinIO listens on |
| `MINIO_ROOT_USER` | Bucket | (secret) | Root username for MinIO access |
| `MINIO_PUBLIC_HOST` | Bucket | - | Publicly accessible domain for MinIO |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | HTTPS public port |
| `MINIO_PRIVATE_HOST` | Bucket | - | Private internal host domain |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | Internal MinIO port |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | Root password for MinIO |
| `MINIO_PUBLIC_ENDPOINT` | Bucket | - | Full public HTTPS endpoint |
| `MINIO_PRIVATE_ENDPOINT` | Bucket | - | Full internal HTTP endpoint |
| `MINIO_BROWSER_REDIRECT_URL` | Bucket | - | Redirect URL for MinIO browser console |
| `PORT` | Console | 9090 | Port where the MinIO Console service runs |
| `PASSWORD` | Console | (secret) | Root password for the MinIO Bucket instance |
| `USERNAME` | Console | (secret) | Root username for the MinIO Bucket instance |
| `CONSOLE_MINIO_SERVER` | Console | - | Internal endpoint URL for the MinIO Bucket server |

## Configuration

- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/coollabs-minio)
