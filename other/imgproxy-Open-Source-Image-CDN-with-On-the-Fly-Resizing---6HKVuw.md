# Deploy imgproxy | Open Source Image CDN with On-the-Fly Resizing on Railway

Resize and convert images on the fly from signed URLs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/6HKVuw)

## About

imgproxy resizes, crops and converts images on the fly from a signed URL. Store one original, serve every size and format from it — WebP and AVIF included — without a build step, a cron job or a folder full of thumbnails.

Four services that make a complete image pipeline: imgproxy itself, S3-compatible object storage for the originals, a web console to upload and browse them, and a one-shot initializer that creates the bucket on first boot. imgproxy reads from the bucket over the private network and is the only thing that needs to be fast.

URL signing is on, with a generated key and salt.

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

[View on Railway →](https://railway.com/deploy/6HKVuw)
