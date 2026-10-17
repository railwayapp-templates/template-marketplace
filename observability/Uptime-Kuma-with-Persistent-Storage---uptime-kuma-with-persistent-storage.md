# Deploy Uptime Kuma with Persistent Storage on Railway

Uptime checks, alerts and status pages with persistent monitor data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptime-kuma-with-persistent-storage)

## About

Uptime checks, alerts and status pages with persistent monitor data.

Deploying this template creates Uptime Kuma in your Railway project. The application receives an HTTPS domain automatically. Database and Redis services, when included, use private networking and generated credentials. Persistent data is stored on the included volumes or object storage, so application redeploys do not discard it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Uptime Kuma | `louislam/uptime-kuma@sha256:9912da7d7d9b6ddc0c2d904beb84d24689c1ed9c33b81419eb9008663a92a329` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3001 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/uptime-kuma-with-persistent-storage)
