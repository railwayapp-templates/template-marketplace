# Deploy Yaade API Workspace on Railway

A private collaborative API client with persistent request collections.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yaade-api-workspace)

## About

A private collaborative API client with persistent request collections.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `Yaade`, `Yaade API`, `EsperoTech`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /app/data |
| yaade | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **yaade** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| yaade | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `esperotech/yaade:latest@sha256:24d2d692d948bb09c69d55171cdd9d1bfd9dff041d485fb170430365903226b9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | yaade | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | yaade | true | Owner auth for yaade. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | yaade | all | Owner scope for yaade. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | yaade | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | yaade | 9339 | Upstream port for yaade. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | yaade | (secret) | Generated access password. Keep private and preserve with backups. |
| `YAADE_ADMIN_USERNAME` | core | (secret) | Yaade admin username for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/yaade-api-workspace)
