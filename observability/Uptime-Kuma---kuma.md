# Deploy Uptime Kuma on Railway

Self-hosted uptime monitoring with alerts and beautiful status pages.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kuma)

## About

Uptime Kuma is a self-hosted monitoring platform for websites, APIs, servers, ports, and other services. It provides uptime checks, alerts, response-time tracking, and customizable status pages through a clean web interface, making it a practical alternative to hosted uptime-monitoring services.

Hosting Uptime Kuma on Railway gives you a persistent monitoring service without managing a separate virtual machine or server manually.

This template runs the official Uptime Kuma Docker image, exposes the web interface on port `3001`, and stores application data in a persistent Railway volume mounted at `/app/data`.

The deployment includes `RAILWAY_RUN_UID=0` to avoid permission issues when the non-root Uptime Kuma container writes to Railway-mounted storage.

After deployment, generate a Railway public domain, open the Uptime Kuma dashboard, create the administrator account, and start adding websites, APIs, TCP ports, or other services that you want to monitor.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| uptime-kuma | `louislam/uptime-kuma:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3001 | Web interface port used by Uptime Kuma |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/kuma)
