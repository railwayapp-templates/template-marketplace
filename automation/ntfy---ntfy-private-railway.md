# Deploy ntfy on Railway

Private push notifications with durable auth and bucket-backed attachments

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ntfy-private-railway)

## About

ntfy is an HTTP-based pub/sub notification service with web, desktop, Android, and iOS clients. This template deploys a private-by-default ntfy `v2.27.0` server with persistent users, cached messages, and S3-compatible attachments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ntfy | [monotykamary/railway-template-ntfy](https://github.com/monotykamary/railway-template-ntfy) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `S3_BUCKET` | - | Railway Bucket name for attachments. |
| `S3_REGION` | - | Railway Bucket region. |
| `S3_ENDPOINT` | - | Railway Bucket S3-compatible endpoint. |
| `NTFY_ADMIN_USER` | (secret) | Initial administrator username. |
| `S3_ACCESS_KEY_ID` | - | Railway Bucket access key ID. |
| `NTFY_ADMIN_PASSWORD` | (secret) | Initial administrator password. Generated for every deployment. |
| `S3_SECRET_ACCESS_KEY` | (secret) | Railway Bucket secret access key. |

## Configuration

- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ntfy`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ntfy-private-railway)
