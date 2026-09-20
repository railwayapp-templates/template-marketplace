# Deploy SolidInvoice Billing Workspace on Railway

Quotes and invoices with private MySQL and protected installation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/solidinvoice-billing-workspace)

## About

Quotes and invoices with private MySQL and protected installation.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `SolidInvoice`, `Solid Invoice`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| mysql | Private | /var/lib/mysql |
| core | Private | /etc/solidinvoice |
| solidinvoice | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **solidinvoice** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysql | `mysql:8.0@sha256:7dcddc01f13bab2f15cde676d44d01f61fc9f99fe7785e86196dfc07d358ae2b` | Database |
| solidinvoice | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `solidinvoice/solidinvoice:3.0.1@sha256:ae7c0e155cb5e515b49c83a4d2c003dc07d30b48952b6fd87b27e66e1d56b162` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_USER` | mysql | (secret) | Mysql user for mysql. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_DATABASE` | mysql | solidinvoice | Mysql database for mysql. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MYSQL_PASSWORD` | mysql | (secret) | Generated mysql password. Keep private and preserve with backups. |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) | Generated mysql root password. Keep private and preserve with backups. |
| `PORT` | solidinvoice | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | solidinvoice | true | Owner auth for solidinvoice. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | solidinvoice | all | Owner scope for solidinvoice. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | solidinvoice | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | solidinvoice | 8765 | Upstream port for solidinvoice. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | solidinvoice | (secret) | Generated access password. Keep private and preserve with backups. |
| `SOLIDINVOICE_ENV` | core | prod | Solidinvoice env for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SOLIDINVOICE_DEBUG` | core | 0 | Solidinvoice debug for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SETUP_DATABASE_HOST` | core | - | Copy this private host into the protected database installer; not an application configuration key. |
| `SETUP_DATABASE_NAME` | core | solidinvoice | Use this database name in the installer. |
| `SETUP_DATABASE_PORT` | core | 3306 | Use this port in the database installer. |
| `SETUP_DATABASE_USER` | core | (secret) | Use this restricted database user in the installer. |
| `SETUP_DATABASE_PASSWORD` | core | (secret) | Copy this generated password into the protected installer; keep it private. |
| `SOLIDINVOICE_CONFIG_DIR` | core | /etc/solidinvoice | Solidinvoice config dir for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/solidinvoice`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/solidinvoice-billing-workspace)
