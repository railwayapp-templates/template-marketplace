# Deploy Airstation Private Radio on Railway

Private radio studio and music player with durable tracks and SQLite.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/airstation-private-radio)

## About

Private radio studio and music player with durable tracks and SQLite.

| Service | Access | Persistent storage |
| --- | --- | --- |
| airstation | Public HTTPS with owner authentication | None |
| app | Private Railway network | /data (SQLite metadata and original audio tracks) |

Railway terminates public TLS. Keep the application at one replica because it uses local persistent storage. Only the gateway has a public service domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| airstation | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | `cheatsnake/airstation:1.4.1@sha256:03914d06060e10b12045fee6080fba5838aafe528abeef8e5907ccfb2bbfafb2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | airstation | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | airstation | true | Owner auth for airstation. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | airstation | all | Owner scope for airstation. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | airstation | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | airstation | 7331 | Upstream port for airstation. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | airstation | (secret) | Generated access password. Keep private and preserve with backups. |
| `AIRSTATION_DB_DIR` | app | /data/database | Airstation db dir for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AIRSTATION_TMP_DIR` | app | /tmp/airstation | Airstation tmp dir for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AIRSTATION_JWT_SIGN` | app | - | Generated airstation jwt sign. Keep private and preserve with backups. |
| `AIRSTATION_HTTP_PORT` | app | 7331 | Airstation http port for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AIRSTATION_SECRET_KEY` | app | (secret) | Generated airstation secret key. Keep private and preserve with backups. |
| `AIRSTATION_TRACKS_DIR` | app | /data/tracks | Airstation tracks dir for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AIRSTATION_SECURE_COOKIE` | app | true | Airstation secure cookie for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/airstation-private-radio)
