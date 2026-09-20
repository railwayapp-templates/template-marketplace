# Deploy Redoc Private API Documentation on Railway

Readable OpenAPI documentation with a persistent, replaceable schema.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redoc-private-api-documentation)

## About

Readable OpenAPI documentation with a persistent, replaceable schema.

Redoc renders a searchable API reference from an OpenAPI document. The private core serves on port 8080. A generated password protects the public gateway. The `/data` volume stores `openapi.json`; the starter document is copied only when that file is absent.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redoc | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | redoc | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | redoc | true | Owner auth for redoc. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | redoc | all | Owner scope for redoc. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | redoc | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | redoc | 8080 | Upstream port for redoc. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | redoc | (secret) | Generated access password. Keep private and preserve with backups. |
| `PORT` | core | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/redoc-private-api-documentation)
