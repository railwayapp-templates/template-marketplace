# Deploy TimeTagger on Railway

Personal time tracking with generated credentials and persistent data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/timetagger)

## About

Personal time tracking with generated credentials and persistent data.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

One service with persistent /opt/_timetagger storage. This draft provisions one configured account, not a team subscription/billing system. Change ADMIN_PASSWORD in Railway to rotate the configured credential; keep it at least 16 characters and no more than 72 UTF-8 bytes. TimeTagger uses the GPL-3.0 license. Railway usage is separate from the upstream service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| timetagger | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_PASSWORD` | (secret) | Generated admin password. Keep private and preserve with backups. |
| `ADMIN_USERNAME` | (secret) | Admin username for timetagger. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `TIMETAGGER_BIND` | 0.0.0.0:8080 | Timetagger bind for timetagger. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `TIMETAGGER_DATADIR` | /opt/_timetagger | Timetagger datadir for timetagger. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `TIMETAGGER_LOG_LEVEL` | info | Timetagger log level for timetagger. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/_timetagger`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/timetagger)
