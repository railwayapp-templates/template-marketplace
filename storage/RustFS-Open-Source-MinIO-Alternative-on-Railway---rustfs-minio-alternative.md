# Deploy RustFS | Open-Source MinIO Alternative on Railway on Railway

Self Host RustFS. S3-compatible object storage with web console

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustfs-minio-alternative)

## About

Deploy RustFS on Railway to get a high-performance, S3-compatible object storage server running in minutes. RustFS is an open-source storage system written in Rust that delivers 2.3x faster performance than MinIO for small object payloads, making it ideal for AI/ML pipelines, data lakes, and media storage backends.

Self-host RustFS on Railway with this template, which pre-configures the RustFS server with persistent volume storage, a web-based admin console, S3 API access, and secure auto-generated credentials — ready to accept uploads via any S3-compatible client.

RustFS is an Apache 2.0 licensed, S3-compatible distributed object storage system built entirely in Rust. It solves the problem of needing fast, self-hosted object storage without the AGPL licensing restrictions of MinIO.

- **S3-compatible API** — works with any AWS SDK (boto3, aws-sdk-js, aws-sdk-rust), AWS CLI, rclone, and restic
- **Web admin console** — browser-based bucket management, user administration, and file browsing
- **Multi-part uploads** — handles large files with chunked parallel uploads
- **Presigned URLs** — generate temporary download/upload links for secure sharing
- **Event notifications** — webhook, MQTT, and NATS notification support for bucket events
- **Lifecycle management** — automated object expiration and storage tiering rules
- **AWS Signature v2/v4** — full authentication compatibility with existing S3 tooling
- **OIDC/SSO support** — integrate with external identity providers for console access

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RustFS | `rustfs/rustfs:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9001 | Railway routing port (console) |
| `RUSTFS_ADDRESS` | 0.0.0.0:9000 | S3 API bind address |
| `RUSTFS_VOLUMES` | /data | Object storage volume path |
| `RUSTFS_ACCESS_KEY` | - | Root S3 access key |
| `RUSTFS_SECRET_KEY` | (secret) | Root S3 secret key |
| `RUSTFS_CONSOLE_ENABLE` | true | Enable web admin console |
| `RUSTFS_OBS_USE_STDOUT` | true | Log to stdout for Railway |
| `RUSTFS_CONSOLE_ADDRESS` | 0.0.0.0:9001 | Web console bind address |
| `RUSTFS_OBS_LOGGER_LEVEL` | info | Log verbosity level |
| `RUSTFS_CORS_ALLOWED_ORIGINS` | * | CORS origins for S3 API |
| `RUSTFS_CONSOLE_CORS_ALLOWED_ORIGINS` | * | CORS origins for console |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/rustfs-minio-alternative)
