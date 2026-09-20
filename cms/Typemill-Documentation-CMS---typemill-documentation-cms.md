# Deploy Typemill Documentation CMS on Railway

Markdown documentation CMS with persistent content and settings.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typemill-documentation-cms)

## About

Markdown documentation CMS with persistent content and settings.

| Service | Access | Persistent storage |
| --- | --- | --- |
| typemill | Public HTTPS | None |
| app | Private | /data |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typemill | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | typemill | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | typemill | true | Require owner authentication for every application route. |
| `OWNER_SCOPE` | typemill | all | Protect all application routes. |
| `UPSTREAM_HOST` | typemill | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | typemill | 80 | Upstream port for typemill. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | typemill | (secret) | Generated access password. Keep private and preserve with backups. |
| `TYPEMILL_PROXY_DETECTION` | app | true | Typemill proxy detection for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/typemill-documentation-cms)
