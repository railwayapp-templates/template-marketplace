# Deploy Ghostlight AI app on Railway

The railway template to run Ghostlight AI companions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghostlight-ai-app)

## About

Ghostlight AI Companion is a private, self-hosted AI companion template for creating one memory-aware companion per deployment. It supports package-gated features, customer build-pack import, companion dashboards, memory, media tools, support tickets, provider checks, and a factory-to-customer delivery workflow for Ghostlight companion builds.

Hosting Ghostlight AI Companion on Railway gives you a full private deployment for one customer and one companion. The app runs with its own database, environment variables, provider keys, storage, and dashboard. In factory mode, the seller imports the customer’s build pack, checks provider readiness, verifies the setup, and prepares the deployment. Once setup is complete, the deployment switches into customer mode so the buyer only sees their safe companion dashboard, support, export, media, memory, and package-specific tools.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ghostlight AI Companions | [jcsnowfox/ghostlight-personalized-AI-companion](https://github.com/jcsnowfox/ghostlight-personalized-AI-companion) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `GIPHY_API_KEY` | Ghostlight AI Companions | (secret) | - |
| `ADMIN_PASSWORD` | Ghostlight AI Companions | (secret) | - |
| `ADMIN_USERNAME` | Ghostlight AI Companions | (secret) | - |
| `GETIMG_API_KEY` | Ghostlight AI Companions | (secret) | - |
| `SUPPORT_EMAIL_TO` | Ghostlight AI Companions | jcsnowfox@gmail.com | - |
| `DISCORD_BOT_TOKEN` | Ghostlight AI Companions | (secret) | - |
| `ELEVENLABS_API_KEY` | Ghostlight AI Companions | (secret) | - |
| `FISH_AUDIO_API_KEY` | Ghostlight AI Companions | (secret) | - |
| `OPENROUTER_API_KEY` | Ghostlight AI Companions | (secret) | - |
| `SUPPORT_EMAIL_FROM` | Ghostlight AI Companions | noreply | - |
| `SUPPORT_DISCORD_CHANNEL_ID` | Ghostlight AI Companions | 1515620388728733806 | - |
| `SUPPORT_DISCORD_WEBHOOK_URL` | Ghostlight AI Companions | https://discord.com/api/webhooks/1515640097649856564/MhDhEdQ1YQOVQh_QK6cIwhY2btAQ4QmPFBY9zpNZT3CVK-biGBZf8UnAUhK7_zL7Ptdd | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, CSS, HTML, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/ghostlight-ai-app)
