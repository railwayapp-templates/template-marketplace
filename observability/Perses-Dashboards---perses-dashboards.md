# Deploy Perses Dashboards on Railway

Observability dashboards with persistent storage and owner access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/perses-dashboards)

## About

Observability dashboards with persistent storage and owner access.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Two services. Perses runs privately with native auth disabled and every public application route protected by the owner gateway. This is a shared-owner workspace, not per-user RBAC. File database and extracted plugins persist on /data; ENCRYPTION_KEY must remain exactly 32 alphanumeric characters and be preserved with backups. Upstream plugin archives are included. This template does not collect or store metrics itself; supply a datasource. Apache-2.0 upstream license.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Database |
| perses | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ENCRYPTION_KEY` | core | - | Generated Formbricks encryption key. Back it up securely; changing it can make encrypted data unreadable. |
| `PORT` | perses | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | perses | true | Owner auth for perses. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | perses | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | perses | 8080 | Upstream port for perses. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | perses | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/perses-dashboards)
