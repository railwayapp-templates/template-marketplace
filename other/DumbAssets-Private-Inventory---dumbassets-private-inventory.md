# Deploy DumbAssets Private Inventory on Railway

Asset records, receipts and warranties with generated owner access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dumbassets-private-inventory)

## About

Asset records, receipts and warranties with generated owner access.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `DumbAssets`, `Dumb Assets`, `DumbWare`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /app/data |
| dumbassets | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **dumbassets** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | `dumbwareio/dumbassets:1.0.11@sha256:1bbe3a1c4aa404f3cbd9641cbf7ef24dfd3f4f09a92570eecc88d48de31517ab` | Database |
| dumbassets | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | core | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DEBUG` | core | false | Debug for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `BASE_URL` | core | - | Base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `NODE_ENV` | core | production | Node.js runtime mode. Keep production for hosted deployments. |
| `DEMO_MODE` | core | false | Demo mode for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DUMBASSETS_PIN` | core | - | Generated ten-digit native PIN. The separate owner gateway must also remain enabled. |
| `ALLOWED_ORIGINS` | core | - | Allowed origins resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | dumbassets | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | dumbassets | true | Owner auth for dumbassets. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | dumbassets | all | Owner scope for dumbassets. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | dumbassets | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | dumbassets | 3000 | Upstream port for dumbassets. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | dumbassets | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/app/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/dumbassets-private-inventory)
