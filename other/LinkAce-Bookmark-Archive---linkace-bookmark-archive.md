# Deploy LinkAce Bookmark Archive on Railway

Bookmarks with SQLite search, persistent storage and protected setup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/linkace-bookmark-archive)

## About

Bookmarks with SQLite search, persistent storage and protected setup.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `LinkAce`, `Link Ace`, `Kovah`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /data |
| linkace | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **linkace** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| linkace | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | linkace | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | linkace | true | Owner auth for linkace. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | linkace | all | Owner scope for linkace. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | linkace | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | linkace | 80 | Upstream port for linkace. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | linkace | (secret) | Generated access password. Keep private and preserve with backups. |
| `APP_ENV` | core | production | App env for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APP_KEY` | core | - | Generated app key. Keep private and preserve with backups. |
| `APP_URL` | core | - | App url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APP_DEBUG` | core | false | App debug for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_DATABASE` | core | /data/database.sqlite | Db database for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_CONNECTION` | core | sqlite | Db connection for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `TRUSTED_PROXIES` | core | * | Trusted proxies for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `QUEUE_CONNECTION` | core | sync | Queue connection for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APP_SEARCH_DRIVER` | core | database | App search driver for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/linkace-bookmark-archive)
