# Deploy MinIO on Railway

Open source object storage with an S3 compatible API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/SMKOEA)

## About

MinIO is a high-performance, S3-compatible object storage system that provides enterprise-grade data storage infrastructure. It offers a simple, scalable solution for storing unstructured data like photos, videos, documents, backups, and container images, with full Amazon S3 API compatibility for seamless integration with existing applications and tools.

Hosting MinIO gives you access to a powerful object storage server that handles file uploads, data archiving, content distribution, and backup storage with S3-compatible APIs. MinIO offers high-performance data operations, built-in encryption, access control policies, and multi-tenancy support. The platform excels at storing large files, serving static assets, managing media content, and providing scalable storage backends for applications. MinIO deployments benefit from Railway's persistent volume storage, automatic scaling, and secure networking. Railway provides comprehensive logging and monitoring for your storage operations while ensuring data persistence and availability.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bucket | [railwayapp-templates/minio](https://github.com/railwayapp-templates/minio) | Web service |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Bucket | - | The port the Bucket runs on internally |
| `MINIO_ROOT_USER` | Bucket | (secret) | Root MinIO user |
| `MINIO_PUBLIC_HOST` | Bucket | - | Public Bucket host |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | Public Bucket port |
| `MINIO_PRIVATE_HOST` | Bucket | - | Private Bucket host |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | Private Bucket port |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | Root MinIO password |
| `MINIO_PUBLIC_ENDPOINT` | Bucket | - | Public Bucket endpoint |
| `MINIO_PRIVATE_ENDPOINT` | Bucket | - | Private Bucket endpoint |
| `MINIO_BROWSER_REDIRECT_URL` | Bucket | - | Ensure the browser receives a valid reachable URL |
| `PORT` | Console | 9090 | The port the Console runs on internally |
| `PASSWORD` | Console | (secret) | The password to login to the Console |
| `USERNAME` | Console | (secret) | The username to login to the Console |
| `CONSOLE_MINIO_SERVER` | Console | - | The domain of the Minio server |

## Configuration

- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/SMKOEA)
