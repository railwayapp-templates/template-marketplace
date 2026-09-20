# Deploy DumbBudget Personal Finance on Railway

Manual budgets and transactions with persistent owner-protected data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dumbbudget-personal-finance)

## About

Manual budgets and transactions with persistent owner-protected data.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `DumbBudget`, `Dumb Budget`, `DumbWare`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /app/data |
| dumbbudget | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **dumbbudget** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dumbbudget | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `dumbwareio/dumbbudget:latest@sha256:e845d989765caceb07b48986764e6b06871d6788a749e7857bfbbea0ae4db5fc` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | dumbbudget | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | dumbbudget | true | Owner auth for dumbbudget. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | dumbbudget | all | Owner scope for dumbbudget. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | dumbbudget | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | dumbbudget | 3000 | Upstream port for dumbbudget. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | dumbbudget | (secret) | Generated access password. Keep private and preserve with backups. |
| `PORT` | core | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `BASE_URL` | core | - | Base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `CURRENCY` | core | USD | Currency for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `NODE_ENV` | core | production | Node.js runtime mode. Keep production for hosted deployments. |
| `DUMBBUDGET_PIN` | core | - | Generated ten-digit native PIN. The separate owner gateway must also remain enabled. |
| `ALLOWED_ORIGINS` | core | - | Allowed origins resolved automatically from the linked service. Keep this reference when using the included topology. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/dumbbudget-personal-finance)
