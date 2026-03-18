# Deploy Nx Custom Cache on Railway

Nx Custom Cache Server (Deno + S3)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/-bmO7p)

## About

**Nx Remote Cache Server (Deno + S3)**

This template provides a self-hosted Nx remote cache server, built with Deno and using Amazon S3 (or compatible) as the backend. It follows the official Nx Custom Remote Cache specification and offers a fast and secure caching layer for distributed builds.

---

### ✨ Features

* Fully compatible with [Nx Custom Remote Cache API](https://nx.dev/recipes/running-tasks/self-hosted-caching#build-your-own-caching-server)
* Amazon S3-compatible storage support (e.g. MinIO)
* Secure access via Bearer token
* Streaming file uploads/downloads for performance
* Docker image available for easy deployment

---

### 🧬 Environment Variables

| Variable                | Description                           |
| ----------------------- | ------------------------------------- |
| `AWS_REGION`            | AWS region                            |
| `AWS_ACCESS_KEY_ID`     | AWS access key                        |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key                        |
| `S3_BUCKET_NAME`        | Bucket name                           |
| `S3_ENDPOINT_URL`       | S3-compatible endpoint                |
| `NX_CACHE_ACCESS_TOKEN` | Shared secret token for auth          |
| `PORT` (optional)       | Port to run the server (default 3000) |

---

### 🚀 Quick Start (Railway CLI)

1. Click "Deploy" or use Railway CLI.
2. Set your environment variables (see above).
3. The app will start and listen on the specified port (default: 3000).

---

### 📚 Usage with Nx

Set these in your Nx workspace:

```bash
NX_SELF_HOSTED_REMOTE_CACHE_SERVER=https://your-deployment.up.railway.app
NX_SELF_HOSTED_REMOTE_CACHE_ACCESS_TOKEN=your-secure-token
```

---

### ✍️ Author

* [Igor Katsuba](https://x.com/katsuba_igor)

---

### 📄 License

MIT

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO Bucket Creator | `minio/mc:RELEASE.2025-04-08T15-39-49Z` | Database |
| MinIO | `minio/minio:RELEASE.2025-04-08T15-41-24Z` | Database |
| nx-cache-server | `ghcr.io/ikatsuba/nx-cache-server:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_BUCKET` | MinIO Bucket Creator | - | MinIO Bucket |
| `MINIO_ENDPOINT` | MinIO Bucket Creator | - | MinIO Endpoint |
| `MINIO_ROOT_USER` | MinIO Bucket Creator | (secret) | MinIO Root User |
| `MINIO_ROOT_PASSWORD` | MinIO Bucket Creator | (secret) | MinIO Root Password |
| `PORT` | MinIO | 9000 | MinIO Port |
| `MINIO_BUCKET` | MinIO | nx-cloud | MinIO Bucket |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO Root User |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | MinIO Root Password |
| `AWS_REGION` | nx-cache-server | us-east-1 | - |
| `AWS_SECRET_ACCESS_KEY` | nx-cache-server | (secret) | - |
| `NX_CACHE_ACCESS_TOKEN` | nx-cache-server | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "sleep 10 && /usr/bin/mc config host add minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && /usr/bin/mc mb minio/${MINIO_BUCKET} && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && exit 0"`
- **Start command:** `/bin/sh -c "minio server --address [::]:$PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/-bmO7p)
