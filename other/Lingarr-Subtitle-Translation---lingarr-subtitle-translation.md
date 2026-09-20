# Deploy Lingarr Subtitle Translation on Railway

A private subtitle translation service with persistent SQLite settings.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lingarr-subtitle-translation)

## About

A private subtitle translation service with persistent SQLite settings.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `Lingarr`, `Lingarr subtitles`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /app/config |
| lingarr | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **lingarr** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lingarr | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `ghcr.io/lingarr-translate/lingarr:1.3.0@sha256:12473f6f40beac1bb91ffadc7d8c7f1c2a0cd99ba336e4bf2c1dfa617c27a763` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | lingarr | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | lingarr | true | Owner auth for lingarr. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | lingarr | all | Owner scope for lingarr. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | lingarr | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | lingarr | 9876 | Upstream port for lingarr. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | lingarr | (secret) | Generated access password. Keep private and preserve with backups. |
| `DB_CONNECTION` | core | sqlite | Db connection for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ASPNETCORE_URLS` | core | http://+:9876 | Aspnetcore urls for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_HANGFIRE_SQLITE_PATH` | core | /app/config/Hangfire.db | Db hangfire sqlite path for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/lingarr-subtitle-translation)
