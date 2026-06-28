# Deploy changedetection.io on Railway

Self-hosted website change monitoring with 60+ notification channels.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/changedetectionio-1)

## About

changedetection.io is a self-hosted, open-source web page change detection, monitoring, and notification service. Deploy it on Railway in minutes to start tracking changes on any website — no external database required.

changedetection.io runs as a single container using SQLite for storage. Railway provides the compute, TLS at the edge, and a public URL. The service scales down to zero when idle and automatically restarts on failures via Railway's built-in health check.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| changedetection.io | [INAPP-Mobile/railway-changedetection.io](https://github.com/INAPP-Mobile/railway-changedetection.io) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/changedetectionio-1)
