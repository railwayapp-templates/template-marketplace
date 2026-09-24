# Deploy Hoodik Personal Cloud on Railway

Private encrypted browser file storage with persistent local data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hoodik-personal-cloud)

## About

Private encrypted browser file storage with persistent local data.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Private encrypted browser file storage with persistent local data.

| Service | Role | Persistent path |
| --- | --- | --- |
| `core` | Private application or dependency | `/data` |
| `hoodik` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | `hudik/hoodik:v2.5.5@sha256:28165c43a7f36875cfb3d5782d3aaa5242e249b7f25a34f88a96f30eb75b8800` | Database |
| hoodik | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | core | 5443 | Port for core; follows the upstream deployment configuration. |
| `APP_URL` | core | - | Resolved from the linked service; preserve this reference for the included topology. |
| `DATA_DIR` | core | /data | Data dir for core; follows the upstream deployment configuration. |
| `HTTP_PORT` | core | 5443 | Http port for core; follows the upstream deployment configuration. |
| `JWT_SECRET` | core | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `MAILER_TYPE` | core | none | Mailer type for core; follows the upstream deployment configuration. |
| `HTTP_ADDRESS` | core | 0.0.0.0 | Http address for core; follows the upstream deployment configuration. |
| `SSL_DISABLED` | core | true | Ssl disabled for core; follows the upstream deployment configuration. |
| `COOKIE_SECURE` | core | true | Cookie secure for core; follows the upstream deployment configuration. |
| `STORAGE_PROVIDER` | core | local | Storage provider for core; follows the upstream deployment configuration. |
| `PORT` | hoodik | 8080 | Port for hoodik; follows the upstream deployment configuration. |
| `OWNER_AUTH` | hoodik | true | Owner auth for hoodik; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | hoodik | all | Owner scope for hoodik; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | hoodik | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | hoodik | 5443 | Upstream port for hoodik; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | hoodik | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/api/readiness`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/hoodik-personal-cloud)
