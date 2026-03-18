# Deploy public-buckets on Railway

Make your Railway Buckets public and geo-distributed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/public-buckets)

## About

![cdn-s3-go](https://upd-dev.t3.storage.dev/uploads/cdn-s3-go.webp)

Railway Buckets provide an excellent offering to store static files, however there are 2 major limitations:
* They are not public-accessible
* They are not geo distributed (region of the bucket is fixed)

**public-buckets** template deploys a webserver that and wraps any S3 compatible buckets and makes a CDN like access layer. It's geo distributed, generates pre-signed URLs to avoid exposing buckets to public, and most importantly - utilizes `HTTP 302` redirects to return content without proxying the data.

Deploying a Go based docker image, that can be replicated across regions, as it's a stateless gateway. The gateway manages auth to Railway Buckets and acts like a public CDN layer. There is a Redis cache involved, but completely optional, it is included in the template by default, but can be removed in few clicks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| webserver | `xlab/cdn-s3-go:v1` | Web service |
| url-cache | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CDN_URL_CACHE_REDIS` | webserver | - | Redis connection string for pre-signed URL caching. |
| `CDN_BUCKET_PUBLIC_NAMES` | webserver | example | Comma-separated list of public bucket names. |
| `CDN_BUCKET_REGION_ALIASES` | webserver | us | Comma-separated list of region aliases. |
| `CDN_BUCKET_PATH_PREFIX_example_us` | webserver | - | Controls whether files are not in the root of the bucket, but in prefix (e.g. /public) |
| `CDN_BUCKET_SECRET_ACCESS_KEY_example_us` | webserver | (secret) | - |
| `REDISPORT` | url-cache | 6379 | - |
| `REDISUSER` | url-cache | default | - |
| `REDIS_URL` | url-cache | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | url-cache | (secret) | - |
| `REDIS_PASSWORD` | url-cache | (secret) | - |
| `REDIS_PUBLIC_URL` | url-cache | - | Connection string for connecting to redis externally |

## Configuration

- **Start command:** `/app/cdn-s3-go start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/public-buckets)
