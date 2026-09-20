# Deploy DumbKan Private Kanban on Railway

A lightweight persistent Kanban board with generated owner access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dumbkan-private-kanban)

## About

A lightweight persistent Kanban board with generated owner access.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `DumbKan`, `Dumb Kan`, `DumbWare`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /app/data |
| dumbkan | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **dumbkan** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | `dumbwareio/dumbkan:latest@sha256:431e0d744afcc1f4353c3000f2092ed15a3fde80f583372571ed4dce56b77f6b` | Database |
| dumbkan | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | core | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `BASE_URL` | core | - | Base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `NODE_ENV` | core | production | Node.js runtime mode. Keep production for hosted deployments. |
| `DUMBKAN_PIN` | core | - | Generated ten-digit native PIN. The separate owner gateway must also remain enabled. |
| `ALLOWED_ORIGINS` | core | - | Allowed origins resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | dumbkan | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | dumbkan | true | Owner auth for dumbkan. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | dumbkan | all | Owner scope for dumbkan. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | dumbkan | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | dumbkan | 3000 | Upstream port for dumbkan. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | dumbkan | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/app/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/dumbkan-private-kanban)
