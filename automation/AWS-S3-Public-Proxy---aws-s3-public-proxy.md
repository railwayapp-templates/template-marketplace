# Deploy AWS S3 Public Proxy on Railway

Deploy and Host AWS S3 Public Proxy with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aws-s3-public-proxy)

## About

AWS S3 Public Proxy is a tiny Go HTTP server that publicly serves read-only objects from a private S3-compatible bucket. It accepts `GET /` from anonymous callers and streams the object bytes back with a `200` response — no presigned URLs, no redirects, and no way to list, upload, or delete.

Railway Buckets (and most S3-compatible providers) are private by default — clients can't fetch objects without valid SigV4-signed credentials, which you never want to ship to a browser or a mobile app. This template runs a minimal Go proxy that holds the credentials server-side, accepts only `GET`/`HEAD` requests, and streams the bytes through. Stable URLs (`https:///path/to/file.pdf`) map 1:1 to S3 keys and are safe to share, bookmark, or put behind a CDN.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AWS S3 Public Proxy | [FournyP/aws-s3-public-proxy-railway-template](https://github.com/FournyP/aws-s3-public-proxy-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP listen port. Railway injects this automatically — leave unset unless running locally. Default 8080. |
| `CACHE_CONTROL` | - | Value of the Cache-Control response header returned to clients and CDNs. Default: public, max-age=300. |
| `AWS_ENDPOINT_URL` | - | S3-compatible API endpoint. For Railway Buckets, reference AWS_ENDPOINT_URL (e.g. https://t3.storageapi.dev). For real AWS, use https://s3.<region>.amazonaws.com.  |
| `AWS_ACCESS_KEY_ID` | - | S3 access key ID. Reference your bucket's AWS_ACCESS_KEY_ID so credentials stay in sync. |
| `AWS_DEFAULT_REGION` | auto | Bucket region. Use auto for Railway Buckets, or an AWS region like us-east-1 / eu-west-3. |
| `AWS_S3_BUCKET_NAME` | - | Name of the bucket whose objects will be publicly served. Reference your bucket's AWS_S3_BUCKET_NAME. |
| `S3_FORCE_PATH_STYLE` | - | Set to true for path-style addressing (required by some MinIO setups). Leave false for Railway Buckets and AWS S3. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | S3 secret access key. Reference your bucket's AWS_SECRET_ACCESS_KEY. Treat as sensitive. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/aws-s3-public-proxy)
