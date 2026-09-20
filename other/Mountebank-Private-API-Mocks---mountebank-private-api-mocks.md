# Deploy Mountebank Private API Mocks on Railway

Persistent service mocks with protected administration and private ports.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mountebank-private-api-mocks)

## About

Persistent service mocks with protected administration and private ports.

Mountebank creates programmable test doubles called imposters. The owner gateway exposes only its administrative HTTP API and documentation on core port 2525. Mock ports created by an imposter remain private to the Railway environment. All imposter data is persisted in `/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mountebank | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | true | Owner auth for mountebank. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | all | Owner scope for mountebank. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | 2525 | Upstream port for mountebank. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/mountebank-private-api-mocks)
