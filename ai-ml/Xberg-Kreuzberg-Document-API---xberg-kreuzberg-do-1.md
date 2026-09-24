# Deploy Xberg / Kreuzberg Document API on Railway

CPU document extraction API with authenticated HTTPS access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xberg-kreuzberg-do-1)

## About

CPU document extraction API with authenticated HTTPS access.

**Deployment template.** Deployment incurs Railway charges. Supply your own required model, search and external-service credentials; no example provider credentials are included.

This template provisions 2 services in one Railway project, with image digests or upstream source revisions pinned, generated internal credentials, linked environment variables and the persistent paths listed below. Public HTTP routes use Railway HTTPS. SQL and internal dependency endpoints stay private. Keep stateful services single-replica and configure your own backup policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| extractor | `ghcr.io/xberg-io/xberg:1.1.2@sha256:33ce549f7730212336a60048335fc059be4a838bf415b96321906428c847ce60` | Worker |
| xberg | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `ACCESS_USER` | (secret) | Access user for xberg. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | 8000 | Upstream port for xberg. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/xberg-kreuzberg-do-1)
