# Deploy Stoplight Prism OpenAPI Mock Server on Railway

Generate mock API responses from a persistent OpenAPI specification.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stoplight-prism-openapi-mock-server)

## About

Generate mock API responses from a persistent OpenAPI specification.

Stoplight Prism serves mock HTTP responses defined by an OpenAPI document. The private core listens on port 4010; the owner gateway provides HTTPS. The `/data` volume holds `openapi.json`, seeded only on first startup. The template uses the published 5.15.10 image because the later source release did not have a corresponding image tag when reviewed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |
| prism | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | true | Owner auth for prism. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | all | Owner scope for prism. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | 4010 | Upstream port for prism. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/stoplight-prism-openapi-mock-server)
