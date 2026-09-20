# Deploy Titra Project Time Tracking on Railway

Project time tracking with private authenticated MongoDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/titra-project-time-tracking)

## About

Project time tracking with private authenticated MongoDB.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `Titra`, `Titra time`, `titraio`, `kromit`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| mongodb | Private | /data/db |
| core | Private | None |
| titra | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **titra** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongodb | `mongo:7.0@sha256:9854f7139445d766a9523571d6f047530c45547460ffcf8259eb2bf4264632ca` | Database |
| core | `titraio/titra:v1.1.0@sha256:27394f9604f9bcf008370c1f933c3729c868c89b0e7d8ca4271914569549042a` | Worker |
| titra | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGO_INITDB_ROOT_PASSWORD` | mongodb | (secret) | Generated mongo initdb root password. Keep private and preserve with backups. |
| `MONGO_INITDB_ROOT_USERNAME` | mongodb | (secret) | Mongo initdb root username for mongodb. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | core | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `ROOT_URL` | core | - | Root url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `MONGO_URL` | core | - | Mongo url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `PORT` | titra | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | titra | true | Owner auth for titra. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | titra | all | Owner scope for titra. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | titra | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | titra | 3000 | Upstream port for titra. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | titra | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data/db`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/titra-project-time-tracking)
