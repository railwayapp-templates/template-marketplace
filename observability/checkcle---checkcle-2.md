# Deploy checkcle on Railway

CheckCle uptime and SSL checks. Generated admin password.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/checkcle-2)

## About

CheckCle is open-source uptime, SSL, DNS, and TCP monitoring. This template runs CheckCle v1.6.0 on Railway with a volume and a generated admin password.

The service builds from the public wrapper repo, listens on Railway's PORT, and stores PocketBase data at `/mnt/pb_data`. A health check calls `/api/health`.

Sign in with `CHECKCLE_ADMIN_EMAIL` and the generated `CHECKCLE_ADMIN_PASSWORD` from the service variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CheckCle | [9o4t/checkcle-railway](https://github.com/9o4t/checkcle-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CHECKCLE_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/pb_data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/checkcle-2)
