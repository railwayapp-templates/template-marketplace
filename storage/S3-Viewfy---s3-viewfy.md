# Deploy S3 Viewfy on Railway

Modern, self-hosted application for managing files on any S3 object storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/s3-viewfy)

## About

S3 Viewfy is a modern, self-hosted web file manager for any S3-compatible object storage. Browse, upload, download, and delete files through a premium UI with built-in authentication, light/dark mode, and zero credential exposure.

S3 Viewfy is deployed as a Docker container, making it straightforward to host on Railway. The app requires environment variables for S3 connection (endpoint, access key, secret key, region) and optionally for authentication (username, password). Railway auto-detects the Dockerfile, builds the image, and assigns a public URL. The app is fully stateless — no databases or persistent volumes are needed. All data lives in your S3 bucket. Credentials stay server-side and are never exposed to the browser, ensuring secure operation on public deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| s3-viewfy | `oktayparlak/s3-viewfy` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `S3_BUCKET` | example | Bucket Name |
| `S3_REGION` | auto | Bucket Region |
| `S3_ENDPOINT` | https://example.com | Bucket Endpoint |
| `AUTH_PASSWORD` | (secret) | Password for Login |
| `AUTH_USERNAME` | (secret) | Username for login |
| `S3_ACCESS_KEY_ID` | example_key | Access key for authentication |
| `S3_FORCE_PATH_STYLE` | true | Use path-style URLs. Set to `false` for AWS virtual-hosted style. |
| `S3_SECRET_ACCESS_KEY` | (secret) | Secret key for authentication |

**Category:** Storage

[View on Railway →](https://railway.com/deploy/s3-viewfy)
