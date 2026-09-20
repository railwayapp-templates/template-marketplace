# Deploy Grimoire Bookmark Workspace on Railway

Local-first bookmarks and search in a private persistent workspace.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grimoire-bookmark-workspace)

## About

Local-first bookmarks and search in a private persistent workspace.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `Grimoire`, `grimoire bookmarks`, `littleimp`, `little imp`, `goniszewski`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /data |
| grimoire | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **grimoire** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grimoire | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | grimoire | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | grimoire | true | Owner auth for grimoire. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | grimoire | all | Owner scope for grimoire. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | grimoire | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | grimoire | 3210 | Upstream port for grimoire. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | grimoire | (secret) | Generated access password. Keep private and preserve with backups. |
| `HOME` | core | /data | Home for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `HOST` | core | 0.0.0.0 | HTTP bind address. Keep 0.0.0.0 so Railway can reach the service. |
| `PORT` | core | 3210 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `DATA_DIR` | core | /data | Data dir for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `NODE_ENV` | core | production | Node.js runtime mode. Keep production for hosted deployments. |
| `LOG_FORMAT` | core | json | Log format for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `CORS_ORIGINS` | core | - | Cors origins resolved automatically from the linked service. Keep this reference when using the included topology. |
| `XDG_CONFIG_HOME` | core | /data/config | Xdg config home for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LITTLEIMP_IN_CONTAINER` | core | 1 | Littleimp in container for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/grimoire-bookmark-workspace)
