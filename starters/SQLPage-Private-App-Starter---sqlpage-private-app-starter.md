# Deploy SQLPage Private App Starter on Railway

A private SQL-driven web app with persistent pages and SQLite.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sqlpage-private-app-starter)

## About

A private SQL-driven web app with persistent pages and SQLite.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `SQLPage`, `SQL Page`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /data |
| sqlpage | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **sqlpage** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sqlpage | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | sqlpage | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | sqlpage | true | Owner auth for sqlpage. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | sqlpage | all | Owner scope for sqlpage. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | sqlpage | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | sqlpage | 8080 | Upstream port for sqlpage. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | sqlpage | (secret) | Generated access password. Keep private and preserve with backups. |
| `DATABASE_URL` | core | sqlite:///data/app.db?mode=rwc | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `SQLPAGE_WEB_ROOT` | core | /data/www | Sqlpage web root for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SQLPAGE_CONFIGURATION_DIRECTORY` | core | /data/config | Sqlpage configuration directory for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/sqlpage-private-app-starter)
