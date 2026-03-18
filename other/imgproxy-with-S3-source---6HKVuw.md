# Deploy imgproxy with S3 source on Railway

imgproxy with S3 source for fast image delivery

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/6HKVuw)

## About

This template for Railway sets up imgproxy with an S3 source, enabling efficient and fast image delivery. By utilizing imgproxy, images are dynamically resized and optimized on-the-fly, ensuring quick loading times and reduced bandwidth usage. The integration with S3 provides a scalable and reliable storage solution, perfect for handling large volumes of images. Ideal for developers seeking a streamlined and performant image processing pipeline.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| Bucket | `minio/minio:latest` | Database |
| Bucket Creator | `minio/mc` | Database |
| imgproxy | `darthsim/imgproxy:v3.18.2` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Console | 9090 |
| `PASSWORD` | Console | (secret) |
| `USERNAME` | Console | (secret) |
| `MINIO_BUCKET` | Bucket | images |
| `MINIO_ROOT_USER` | Bucket | (secret) |
| `MINIO_PUBLIC_PORT` | Bucket | 443 |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) |
| `MINIO_ROOT_USER` | Bucket Creator | (secret) |
| `MINIO_ROOT_PASSWORD` | Bucket Creator | (secret) |
| `IMGPROXY_TTL` | imgproxy | 31536000 |
| `IMGPROXY_USE_S3` | imgproxy | true |
| `IMGPROXY_USE_ETAG` | imgproxy | true |
| `IMGPROXY_S3_REGION` | imgproxy | us-east-1 |
| `AWS_SECRET_ACCESS_KEY` | imgproxy | (secret) |
| `IMGPROXY_MAX_SRC_RESOLUTION` | imgproxy | 16.8 |

## Configuration

- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "sleep 10 && /usr/bin/mc config host add minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && /usr/bin/mc mb minio/${MINIO_BUCKET} && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && exit 0"`
- **Healthcheck:** `/health`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/6HKVuw)
