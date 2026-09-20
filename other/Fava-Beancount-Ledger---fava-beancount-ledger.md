# Deploy Fava Beancount Ledger on Railway

A private Beancount web ledger with a persistent starter journal.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fava-beancount-ledger)

## About

A private Beancount web ledger with a persistent starter journal.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `Fava`, `Fava Beancount`, `Beancount`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /data |
| fava | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **fava** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |
| fava | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `FAVA_HOST` | core | 0.0.0.0 | Fava host for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `FAVA_PORT` | core | 5000 | Fava port for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | fava | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | fava | true | Owner auth for fava. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | fava | all | Owner scope for fava. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | fava | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | fava | 5000 | Upstream port for fava. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | fava | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/fava-beancount-ledger)
