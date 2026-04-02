# Deploy Vaze on Railway

Self-Hosted file storage and hosting service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaze)

## About

Vaze is a self-hosted, local-first file storage and hosting service built with Next.js and SQLite. Deployed easily via Docker, it provides a clean web interface for managing files and a robust API—complete with an official NPM package—to serve as a reliable storage backend for your other applications.

Deploying Vaze on Railway is straightforward thanks to its Dockerized architecture. By using the template you'll simply deploy the official Docker image, but have everything set up for you.

Because Vaze uses SQLite for its internal database, there is no need to provision a separate, complex database service; everything is self-contained. Once the container is live and your custom domain is routed, visiting the web interface allows you to register the initial admin account instantly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Vaze | `darseen/vaze:latest` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BASE_URL` | - | The base URL of your Vaze instance. |
| `AUTH_SECRET` | (secret) | A secret key used to sign JWT tokens. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 3000
- **Volume:** `/app/apps/service/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/vaze)
