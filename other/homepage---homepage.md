# Deploy homepage on Railway

Self-hosted app dashboard with 100+ service integrations. Single-conta

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homepage)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/homepage)

&gt; **Canonical code:** `homepage` — deploy URL: https://railway.com/new/template/homepage

![OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-homepage/main/og-image.svg)

Homepage is a modern, highly-configurable self-hosted application dashboard with 100+ service integrations. Deploy it on Railway in minutes to turn your stack into a beautiful start page.

Homepage runs as a single container with a persistent Railway volume for config (`/app/config`). Railway provides the compute, TLS at the edge, and a public URL. The service restarts automatically on failures via Railway's built-in health check. No external database or cache is needed — everything runs in one container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| homepage | `ghcr.io/gethomepage/homepage:v1.13.2` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/homepage)
