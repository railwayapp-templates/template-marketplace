# Deploy Marker PDF to Markdown API on Railway

Authenticated CPU API for converting digital PDFs to Markdown.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/marker-pdf-to-markdown-api)

## About

Authenticated CPU API for converting digital PDFs to Markdown.

**Deployment template.** Deployment incurs Railway charges. Supply your own required model, search and external-service credentials; no example provider credentials are included.

This template provisions 2 services in one Railway project, with image digests or upstream source revisions pinned, generated internal credentials, linked environment variables and the persistent paths listed below. Public HTTP routes use Railway HTTPS. SQL and internal dependency endpoints stay private. Keep stateful services single-replica and configure your own backup policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| marker | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Database |
| marker-api | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_KEY` | marker | (secret) | Generated API authentication key, or a reference to the shared internal API key. Keep private and preserve matching references. |
| `HF_HOME` | marker | /data/huggingface | Hf home for marker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `TORCH_DEVICE` | marker | cpu | Torch device for marker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `XDG_CACHE_HOME` | marker | /data/cache | Xdg cache home for marker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | marker-api | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `ACCESS_USER` | marker-api | (secret) | Access user for marker-api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | marker-api | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | marker-api | 8000 | Upstream port for marker-api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | marker-api | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/marker-pdf-to-markdown-api)
