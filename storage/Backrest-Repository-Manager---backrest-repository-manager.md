# Deploy Backrest Repository Manager on Railway

Manage restic repositories, browse snapshots and restore files privately.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/backrest-repository-manager)

## About

Manage restic repositories, browse snapshots and restore files privately.

Backrest 1.14.1 wraps restic with a browser interface for repositories, snapshots, maintenance and restores. This deployment is useful as a private console for remote restic repositories or data explicitly staged in this service.

| Service | Access | Persistent storage |
| --- | --- | --- |
| core | Private | /data |
| backrest | Public HTTPS | None |

Railway terminates public TLS. Keep volume-backed services at one replica. Database and core application ports are private; only the generated owner gateway is public.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | `ghcr.io/garethgeorge/backrest:v1.14.1@sha256:b852979754281026230cc69fb11428e6d57c9a97784ab4a444ffc7934c53a215` | Database |
| backrest | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | core | UTC | Tz for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `BACKREST_DATA` | core | /data/state | Backrest data for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `BACKREST_PORT` | core | [::]:9898 | Backrest port for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `XDG_CACHE_HOME` | core | /tmp/cache | Xdg cache home for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `BACKREST_CONFIG` | core | /data/config.json | Backrest config for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `XDG_CONFIG_HOME` | core | /data/config | Xdg config home for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `BACKREST_RESTIC_COMMAND` | core | /bin/restic | Backrest restic command for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | backrest | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | backrest | true | Owner auth for backrest. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | backrest | all | Owner scope for backrest. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | backrest | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | backrest | 9898 | Upstream port for backrest. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | backrest | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/backrest-repository-manager)
