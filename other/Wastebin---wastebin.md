# Deploy Wastebin on Railway

Lightweight Rust pastebin with SQLite persistence and authenticated access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wastebin)

## About

Lightweight Rust pastebin with SQLite persistence and authenticated access.

| Service | Access | Persistent storage |
| --- | --- | --- |
| wastebin | Public HTTPS | None |
| app | Private | /data |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wastebin | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | `quxfoo/wastebin:3.7.2@sha256:8ad3a7b7a757b3df9483c3e512ae98fd8e2a0c785205dd1dd20ac521fca91479` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | wastebin | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | wastebin | true | Require owner authentication for every application route. |
| `OWNER_SCOPE` | wastebin | all | Protect all application routes. |
| `UPSTREAM_HOST` | wastebin | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | wastebin | 8088 | Upstream port for wastebin. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | wastebin | (secret) | Generated access password. Keep private and preserve with backups. |
| `TMPDIR` | app | /data | Tmpdir for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `WASTEBIN_BASE_URL` | app | - | Wastebin base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `WASTEBIN_SIGNING_KEY` | app | - | Generated wastebin signing key. Keep private and preserve with backups. |
| `WASTEBIN_ADDRESS_PORT` | app | [::]:8088 | Wastebin address port for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `WASTEBIN_DATABASE_PATH` | app | /data/state.db | Wastebin database path for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `WASTEBIN_MAX_BODY_SIZE` | app | 1048576 | Wastebin max body size for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `WASTEBIN_PASSWORD_SALT` | app | (secret) | Generated wastebin password salt. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/wastebin)
