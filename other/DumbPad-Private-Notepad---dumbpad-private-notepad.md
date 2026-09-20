# Deploy DumbPad Private Notepad on Railway

Autosaving Markdown notes with generated PIN and persistent files.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dumbpad-private-notepad)

## About

Autosaving Markdown notes with generated PIN and persistent files.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `DumbPad`, `Dumb Pad`, `DumbWare`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /app/data |
| dumbpad | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **dumbpad** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | `dumbwareio/dumbpad:1.0.4@sha256:03e4216d7842958287bccf6c51dde1c41735b35235844fb87c70b4443143ada6` | Database |
| dumbpad | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | core | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `BASE_URL` | core | - | Base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `NODE_ENV` | core | production | Node.js runtime mode. Keep production for hosted deployments. |
| `DUMBPAD_PIN` | core | - | Generated ten-digit native PIN. The separate owner gateway must also remain enabled. |
| `ALLOWED_ORIGINS` | core | - | Allowed origins resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | dumbpad | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | dumbpad | true | Owner auth for dumbpad. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | dumbpad | all | Owner scope for dumbpad. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | dumbpad | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | dumbpad | 3000 | Upstream port for dumbpad. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | dumbpad | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/app/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/dumbpad-private-notepad)
