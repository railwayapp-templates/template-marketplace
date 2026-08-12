# Deploy CheckCle on Railway

Deploy CheckCle with durable storage and generated admin credentials.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/checkcle-1)

## About

CheckCle is an open-source uptime, SSL, status-page, and server-monitoring platform. This template deploys stable release `v1.6.0` as one public Railway service with durable PocketBase storage and generated administrator credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| checkcle | [monotykamary/railway-template-checkcle](https://github.com/monotykamary/railway-template-checkcle) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CHECKCLE_ADMIN_EMAIL` | admin@example.com | Email address for the initial CheckCle administrator. |
| `CHECKCLE_ADMIN_PASSWORD` | (secret) | Generated password for the initial CheckCle administrator. Rotate it after first login. |
| `CHECKCLE_ENCRYPTION_KEY` | - | Generated key used to encrypt PocketBase settings. Do not change it after data is written. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/pb_data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/checkcle-1)
