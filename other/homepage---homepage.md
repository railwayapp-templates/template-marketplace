# Deploy homepage on Railway

Homepage — modern, self-hosted dashboard for your services and bookmarks.

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

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOG_LEVEL` | info | Server log verbosity: info, debug, warn, or error. |
| `HOMEPAGE_PORT` | 3000 | Port Homepage listens on (default: 3000). Railway injects PORT for routing. |
| `HOMEPAGE_VAR_TITLE` | - | Custom dashboard title (e.g., My Dashboard). Leave empty for default. |
| `HOMEPAGE_VAR_LANGUAGE` | - | Dashboard language code (e.g., en, fr, de). Leave empty for browser default. |
| `HOMEPAGE_VAR_DEFAULT_THEME` | dark | Default theme: dark, light, neon, or glassmorphism. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/homepage)
