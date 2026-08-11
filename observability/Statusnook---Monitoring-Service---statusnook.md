# Deploy Statusnook - Monitoring Service on Railway

Self-hosted status page for service health, incidents, and alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/statusnook)

## About

Statusnook is a self-hosted status page and monitoring application for sharing service health information with users. It provides service health summaries, incident and maintenance timelines, and opt-in notifications through email and Slack. It is designed to make monitoring and communicating service availability straightforward.

Hosting Statusnook on Railway involves deploying the official `goksan/statusnook:latest` Docker image as a Railway service. The application listens on HTTP port `8000`, which should be exposed through Railway's public networking so visitors can access the status page. Statusnook stores application data in `/app/statusnook-data`, so a persistent Railway Volume should be mounted at this path to preserve data across deployments and restarts. Railway provides the container infrastructure, persistent storage, public HTTPS access, and domain management needed to run the status page without maintaining a separate server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| statusnook:latest | `goksan/statusnook:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/statusnook-data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/statusnook)
