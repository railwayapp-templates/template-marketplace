# Deploy Swagger Editor Private API Designer on Railway

Design and validate OpenAPI and AsyncAPI documents in your browser.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swagger-editor-private-api-designer)

## About

Design and validate OpenAPI and AsyncAPI documents in your browser.

Swagger Editor is a browser editor for OpenAPI and AsyncAPI specifications. The unprivileged upstream image serves its static application on private port 8080; the public gateway requires the generated owner password. Editing happens in the browser. There is no server database or file volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| swagger-editor | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `swaggerapi/swagger-editor:v5.8.8-unprivileged@sha256:b56bd6a78cd9ba59378353d47bb07b689c18879c677b65fa62710daeac5af80f` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | true | Owner auth for swagger-editor. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | all | Owner scope for swagger-editor. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | 8080 | Upstream port for swagger-editor. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/swagger-editor-private-api-designer)
