# Deploy instatic on Railway

Self-hosted CMS with visual editing and static publishing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/instatic-1)

## About

Instatic runs on Railway as a Docker image-backed web service with a persistent volume for the SQLite database, uploads, plugin packages, and published assets. Railway provides HTTPS, public networking, health checks, and simple one-click template deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/corebunch/instatic:0.0.10` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `STATIC_DIR` | /app/dist |
| `UPLOADS_DIR` | /app/storage/uploads |
| `DATABASE_URL` | sqlite:/app/storage/data/cms.db |
| `INSTATIC_SECRET_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/instatic-1)
