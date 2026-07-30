# Deploy Piney - AI Character Studio on Railway

SillyTavern Character Card Workstation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/piney)

## About

Piney (Little Brother Xu) is a dedicated workstation designed for managing SillyTavern character cards, world info, and chat logs. It offers deep analysis of V2/V3 card specs, AI-assisted content generation, token usage analytics, interactive chat replay, image gallery management with ComfyUI and NovelAI metadata parsing, and automated data backups.

Hosting Piney on Railway provides a containerized environment using its official prebuilt Docker image. Railway runs the application process, handles inbound HTTP routing, and manages TLS termination automatically.

Because Piney processes and stores character card specifications, world info databases, custom assets, and system configurations locally, persistent storage is required to prevent data loss across container redeployments. Railway provisions a persistent volume mounted directly to the application container, ensuring data durability. Networking is established by configuring an HTTP proxy to map external web traffic to Piney's internal service port. The application runs as a standalone server instance without needing external database services like PostgreSQL or Redis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Piney | `ghcr.io/andclear/piney:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Bind to all network interfaces. |
| `PORT` | 9696 | Internal application listening port. |
| `RUN_MODE` | server | Mode of operation for the Piney application server. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/piney)
