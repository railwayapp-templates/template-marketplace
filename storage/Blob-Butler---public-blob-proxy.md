# Deploy Blob Butler on Railway

Run a lightweight Bun-powered proxy that exposes s3 bucket to the public

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/public-blob-proxy)

## About

Blob Butler is a lightweight Bun-powered proxy that serves files from private Railway Storage Buckets over public HTTP endpoints. It authenticates with your bucket and streams files with caching header without any need of presigned URLs.

Blob Butler deploys as a Bun HTTP service on Railway. The template includes an attached S3-compatible storage bucket, with all credentials injected automatically. The service proxies incoming HTTP requests to the bucket, streaming objects directly to clients and applying cache headers. No additional configuration is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| blob-butler | [byteception/blob-butler](https://github.com/byteception/blob-butler) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `S3_BUCKET` | - | Railway Storage bucket name |
| `S3_REGION` | - | Bucket region |
| `S3_ENDPOINT` | - | Railway Storage endpoint URL |
| `CACHE_MAX_AGE` | - | Cache-Control max-age in seconds (default: 86400 = 24 hours) |
| `S3_ACCESS_KEY_ID` | - | Bucket access key ID |
| `S3_SECRET_ACCESS_KEY` | (secret) | Bucket secret access key |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/public-blob-proxy)
