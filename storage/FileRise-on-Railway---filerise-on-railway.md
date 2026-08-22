# Deploy FileRise on Railway on Railway

Secure FileRise with persistent storage, closed setup, and generated keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/filerise-on-railway)

## About

FileRise is a lightweight self-hosted file manager with browser uploads,
folder permissions, WebDAV, and encrypted folders. This template deploys
FileRise `v3.26.1` as one digest-pinned service with one persistent `/data`
volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| filerise | [l4time/railway-filerise-template](https://github.com/l4time/railway-filerise-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `SECURE` | true |
| `SCAN_ON_START` | false |
| `TOTAL_UPLOAD_SIZE` | 10M |
| `CLAMAV_AUTO_UPDATE` | false |
| `VIRUS_SCAN_ENABLED` | false |
| `FILERISE_DAV_PASSWORD` | (secret) |
| `FILERISE_ADMIN_PASSWORD` | (secret) |
| `FR_WEBDAV_MAX_UPLOAD_BYTES` | 10485760 |
| `FILERISE_PERSISTENT_TOKENS_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/api/auth/checkAuth.php`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/filerise-on-railway)
