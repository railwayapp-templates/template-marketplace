# Deploy Andromeda - Blobs on Railway

S3/R2 bucket and blob manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/andromeda-blobs)

## About

Andromeda - Blobs is a self-hosted browser, CLI, and TUI for S3-compatible blob storage, written in Go. Built for Cloudflare R2 but works with any S3-compatible endpoint (AWS S3, MinIO, Backblaze B2). The `blobs server` mode serves a password-protected web UI for browsing buckets, uploading, presigned downloads, and optional permanent public URLs.

Hosting Andromeda - Blobs means running `blobs server`, a single Go binary that serves a session-protected web UI over HTTP. The app is a front end to your existing S3-compatible object storage — buckets and objects live in that storage, not in Blobs — so a small SQLite file holds only local session/config state. Deployment needs a persistent volume for that file plus environment variables: a login password and S3 credentials (generic endpoint or R2 shortcut). On Railway, the included Dockerfile builds the image, a persistent volume holds the SQLite file, and environment variables configure storage access. No managed database service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Blobs | `ghcr.io/stevedylandev/andromeda/apps/blobs` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `S3_REGION` | auto | S3 region |
| `S3_ENDPOINT` | - | Full S3 endpoint URL |
| `R2_ACCOUNT_ID` | - | Cloudflare account ID |
| `BLOBS_PASSWORD` | (secret) | Password for login |
| `R2_ACCESS_KEY_ID` | - | Fallback for S3_ACCESS_KEY_ID |
| `S3_ACCESS_KEY_ID` | - | Access key ID |
| `BLOBS_PUBLIC_URLS` | - | When set, detail page shows permanent public URL |
| `BLOBS_COOKIE_SECURE` | true | Set true behind HTTPS |
| `BLOBS_MAX_UPLOAD_MB` | 100 | Single-shot upload cap (MB) |
| `R2_SECRET_ACCESS_KEY` | (secret) | Fallback for S3_SECRET_ACCESS_KEY |
| `S3_SECRET_ACCESS_KEY` | (secret) | Secret access key |
| `BLOBS_PRESIGN_TTL_SECONDS` | 3600 | Presigned download URL lifetime (sec) |

**Category:** Other

[View on Railway →](https://railway.com/deploy/andromeda-blobs)
