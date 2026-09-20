# Deploy OliveTin Private Action Panel on Railway

A protected command panel with two harmless starter actions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/olivetin-private-action-panel)

## About

A protected command panel with two harmless starter actions.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `OliveTin`, `Olive Tin`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /config |
| olivetin | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **olivetin** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| olivetin | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | olivetin | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | olivetin | true | Owner auth for olivetin. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | olivetin | all | Owner scope for olivetin. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | olivetin | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | olivetin | 1337 | Upstream port for olivetin. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | olivetin | (secret) | Generated access password. Keep private and preserve with backups. |
| `PORT` | core | 1337 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Automation · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/olivetin-private-action-panel)
