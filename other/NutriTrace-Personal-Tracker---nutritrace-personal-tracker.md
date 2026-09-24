# Deploy NutriTrace Personal Tracker on Railway

Private nutrition and food records with SQLite and uploads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nutritrace-personal-tracker)

## About

Private nutrition and food records with SQLite and uploads.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Private nutrition and food records with SQLite and uploads.

| Service | Role | Persistent path |
| --- | --- | --- |
| `core` | Private application or dependency | `/data` |
| `nutritrace` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | `traceapps/nutritrace:latest@sha256:c6f5b9e8aeee3e3288edb61177502c489dd5cfef0c1640be597a1cf768e8d000` | Database |
| nutritrace | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | core | 3001 | Port for core; follows the upstream deployment configuration. |
| `DB_PATH` | core | /data/db/nutritrace.db | Db path for core; follows the upstream deployment configuration. |
| `LOG_LEVEL` | core | info | Log level for core; follows the upstream deployment configuration. |
| `JWT_SECRET` | core | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `UPLOADS_PATH` | core | /data/uploads | Uploads path for core; follows the upstream deployment configuration. |
| `TOKEN_ENC_KEY` | core | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `PORT` | nutritrace | 8080 | Port for nutritrace; follows the upstream deployment configuration. |
| `OWNER_AUTH` | nutritrace | true | Owner auth for nutritrace; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | nutritrace | all | Owner scope for nutritrace; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | nutritrace | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | nutritrace | 3001 | Upstream port for nutritrace; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | nutritrace | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/nutritrace-personal-tracker)
