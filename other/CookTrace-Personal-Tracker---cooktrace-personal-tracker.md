# Deploy CookTrace Personal Tracker on Railway

Private recipes and meal planning with SQLite and uploads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cooktrace-personal-tracker)

## About

Private recipes and meal planning with SQLite and uploads.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Private recipes and meal planning with SQLite and uploads.

| Service | Role | Persistent path |
| --- | --- | --- |
| `core` | Private application or dependency | `/data` |
| `cooktrace` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | `traceapps/cooktrace:latest@sha256:f9566d2c7cfbda57c3a9e56fb33e7e643ef0cf80fc8bb4c925f7e16464dfa144` | Database |
| cooktrace | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | core | 3003 | Port for core; follows the upstream deployment configuration. |
| `DB_PATH` | core | /data/db/cooktrace.db | Db path for core; follows the upstream deployment configuration. |
| `LOG_LEVEL` | core | info | Log level for core; follows the upstream deployment configuration. |
| `JWT_SECRET` | core | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `UPLOADS_PATH` | core | /data/uploads | Uploads path for core; follows the upstream deployment configuration. |
| `TOKEN_ENC_KEY` | core | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `PORT` | cooktrace | 8080 | Port for cooktrace; follows the upstream deployment configuration. |
| `OWNER_AUTH` | cooktrace | true | Owner auth for cooktrace; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | cooktrace | all | Owner scope for cooktrace; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | cooktrace | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | cooktrace | 3003 | Upstream port for cooktrace; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | cooktrace | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/cooktrace-personal-tracker)
