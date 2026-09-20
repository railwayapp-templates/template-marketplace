# Deploy DumbDrop Private File Inbox on Railway

A persistent file-upload inbox protected by gateway and generated PIN.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dumbdrop-private-file-inbox)

## About

A persistent file-upload inbox protected by gateway and generated PIN.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `DumbDrop`, `Dumb Drop`, `DumbWare`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /app/uploads |
| dumbdrop | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **dumbdrop** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dumbdrop | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `dumbwareio/dumbdrop:latest@sha256:8a377413d4e041410ec734deb1ad085caa3adfeebeab0f6f342272d234b86e52` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | dumbdrop | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | dumbdrop | true | Owner auth for dumbdrop. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | dumbdrop | all | Owner scope for dumbdrop. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | dumbdrop | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | dumbdrop | 3000 | Upstream port for dumbdrop. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | dumbdrop | (secret) | Generated access password. Keep private and preserve with backups. |
| `PORT` | core | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `BASE_URL` | core | - | Base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `NODE_ENV` | core | production | Node.js runtime mode. Keep production for hosted deployments. |
| `UPLOAD_DIR` | core | /app/uploads | Upload dir for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AUTO_UPLOAD` | core | false | Auto upload for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DUMBDROP_PIN` | core | - | Generated ten-digit native PIN. The separate owner gateway must also remain enabled. |
| `MAX_FILE_SIZE` | core | 25 | Max file size for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ALLOWED_ORIGINS` | core | - | Allowed origins resolved automatically from the linked service. Keep this reference when using the included topology. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/dumbdrop-private-file-inbox)
