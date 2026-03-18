# Deploy MinIO Latest on Railway

S3 compatible File Storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/minio-latest)

## About

MinIO is the world's fastest object storage server, and this template deploys the absolute latest version directly from the official GitHub source. It gives developers immediate access to bleeding-edge S3 features and performance optimizations. Perfect for builders who need total control, transparency, and zero vendor lock-in for their data infrastructure.

Hosting MinIO from source puts you in the driver's seat of your storage infrastructure. Rather than relying on a pre-packaged release cycle, this deployment compiles the server environment from scratch using the most recent commits. This approach is ideal for developers who need to test the latest patches, audit the code for security compliance, or compile for specific hardware architectures (like ARM64 or specialized edge devices). despite being a "source build," MinIO remains lightweight—compiling down to a single, static binary that creates a high-performance private cloud on anything from a startup's VPS to enterprise bare metal.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO-Console | [iqbalexperience/MinIO](https://github.com/iqbalexperience/MinIO) (branch: main) (root: /Console) | Web service |
| MinIO-Bucket | [iqbalexperience/MinIO](https://github.com/iqbalexperience/MinIO) (branch: main) (root: /Bucket) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | MinIO-Console | 9090 |
| `PASSWORD` | MinIO-Console | (secret) |
| `USERNAME` | MinIO-Console | (secret) |
| `MINIO_ROOT_USER` | MinIO-Bucket | (secret) |
| `MINIO_PUBLIC_PORT` | MinIO-Bucket | 443 |
| `MINIO_PRIVATE_PORT` | MinIO-Bucket | 9000 |
| `MINIO_ROOT_PASSWORD` | MinIO-Bucket | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/minio-latest)
