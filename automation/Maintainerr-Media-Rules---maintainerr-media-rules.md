# Deploy Maintainerr Media Rules on Railway

Media-library review rules with persistent configuration and owner access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/maintainerr-media-rules)

## About

Media-library review rules with persistent configuration and owner access.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `Maintainerr`, `Maintainerr Plex`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /opt/data |
| maintainerr | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **maintainerr** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |
| maintainerr | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | core | UTC | Tz for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | maintainerr | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | maintainerr | true | Owner auth for maintainerr. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | maintainerr | all | Owner scope for maintainerr. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | maintainerr | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | maintainerr | 6246 | Upstream port for maintainerr. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | maintainerr | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/opt/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/maintainerr-media-rules)
