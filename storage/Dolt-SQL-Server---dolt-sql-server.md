# Deploy Dolt SQL Server on Railway

Versioned MySQL-compatible SQL with persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dolt-sql-server)

## About

Versioned MySQL-compatible SQL with persistent storage.

**Deployment template.** Deployment incurs Railway charges. Supply your own required model, search and external-service credentials; no example provider credentials are included.

This template provisions 1 services in one Railway project, with image digests or upstream source revisions pinned, generated internal credentials, linked environment variables and the persistent paths listed below. Public HTTP routes use Railway HTTPS. SQL and internal dependency endpoints stay private. Keep stateful services single-replica and configure your own backup policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dolt | `dolthub/dolt-sql-server:2.3.2@sha256:38d5e900583267f35e36ad738e13f202e62860b351aa4c088dceaf7dbaed7ab6` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DOLT_USER` | (secret) | Dolt user for dolt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DATABASE_URL` | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `DOLT_DATABASE` | app | Dolt database for dolt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DOLT_PASSWORD` | (secret) | Generated dolt password. Keep private and preserve with backups. |
| `DOLT_ROOT_HOST` | localhost | Dolt root host for dolt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DOLT_USER_HOST` | % | Dolt user host for dolt. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DOLT_ROOT_PASSWORD` | (secret) | Generated dolt root password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/var/lib/dolt`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/dolt-sql-server)
