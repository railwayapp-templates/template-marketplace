# Deploy Static Bucket Server + GUI on Railway

Allow public GET on your buckets + and private file management.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/static-bucket-server-gui)

## About

An S3-compatible bucket file server with a password-protected web GUI for uploading, downloading, deleting, and managing files across multiple buckets. Includes a public file proxy, rate limiting, and friendly bucket name mapping.

Hosting the Static Bucket Server + GUI involves running a Node.js/Bun Express application that connects to an external S3-compatible storage provider. The server handles authentication, session management, and rate limiting in-memory by default, with optional Redis support for distributed deployments. Railway provides the compute environment, while your S3-compatible provider (Railway, AWS S3, MinIO, DigitalOcean Spaces, etc.) stores the actual files. Configuration is done entirely through environment variables, making Railway's variable management a natural fit.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| static | [signalor/static](https://github.com/signalor/static) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REGION` | - | Region where the bucket is stored. |
| `ENDPOINT` | - | The S3-compatible endpoint that the bucket is served at. |
| `NODE_ENV` | production | Change logging behavior |
| `REDIS_URL` | - | Enables cross-replica ratelimiting of auth endpoints. |
| `BUCKET_NAMES` | - | The names of the buckets you want to server/access. Separate by comma like "bucket1,bucket2" |
| `ACCESS_KEY_ID` | - | Access Key ID for the bucket. |
| `PRIVATE_TOKEN` | (secret) | Password to gain access to the GUI. Should be >32 characters long. |
| `SECRET_ACCESS_KEY` | (secret) | Secret Access Key for the bucket |
| `RATE_LIMIT_WINDOW_MS` | 1800000 | The window to reset RATE_LIMIT_MAX_REQUESTS counter. |
| `FRIENDLY_BUCKET_NAMES` | - | Rename the buckets so that they are accessible from prettier endpoints. Must be the same lengths as the BUCKET_NAMES env. Separate by comma like "documents,media" |
| `RATE_LIMIT_MAX_REQUESTS` | 10 | Max requests for WINDOW_MS milliseconds on the auth endpoint, across all replicas (to prevent region switching to bypass auth, only if REDIS_URL is provided) |

**Category:** Other · **Languages:** HTML, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/static-bucket-server-gui)
