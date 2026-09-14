# Deploy Vespa Search Starter on Railway

Single-node search with a starter document schema and protected API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vespa-search-starter)

## About

Single-node search with a starter document schema and protected API.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Two services: one Vespa node and an owner gateway. Data persists at /opt/vespa/var. The starter package is deployed only once; a marker prevents redeploys from overwriting an operator schema. This is a single-node example with no replication or high availability. Allocate sufficient memory/CPU for Vespa and measure it; no low-cost monthly estimate is provided. Runtime startup, hostname mapping and application activation still require verification. Apache-2.0 upstream license.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vespa | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | vespa | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | vespa | true | Owner auth for vespa. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | vespa | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | vespa | 8080 | Upstream port for vespa. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | vespa | (secret) | Generated access password. Keep private and preserve with backups. |
| `VESPA_CONFIGSERVERS` | core | localhost | Vespa configservers for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/vespa/var`

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/vespa-search-starter)
