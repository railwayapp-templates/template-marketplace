# Deploy Jelu Reading Tracker on Railway

Reading lists, book metadata and reviews with persistent SQLite.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jelu-reading-tracker)

## About

Reading lists, book metadata and reviews with persistent SQLite.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `Jelu`, `Jelu books`, `bayang`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /data |
| jelu | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **jelu** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | `wabayang/jelu:0.87.3@sha256:4b9da0e532635501d1f10cee8480689a891f524173c20a359643fefdb29b9647` | Database |
| jelu | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SERVER_PORT` | core | 11111 | Server port for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `JELU_FILES_IMAGES` | core | /data/images/ | Jelu files images for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `JELU_DATABASE_PATH` | core | /data/database/ | Jelu database path for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `JELU_FILES_IMPORTS` | core | /data/imports/ | Jelu files imports for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | jelu | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | jelu | true | Owner auth for jelu. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | jelu | all | Owner scope for jelu. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | jelu | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | jelu | 11111 | Upstream port for jelu. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | jelu | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/jelu-reading-tracker)
