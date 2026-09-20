# Deploy Errbit on Railway

Airbrake-compatible error tracking with MongoDB and generated owner access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/errbit)

## About

Airbrake-compatible error tracking with MongoDB and generated owner access.

| Service | Access | Persistent storage |
| --- | --- | --- |
| mongo | Private | /data/db |
| errbit | Public HTTPS | None |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongo | `mongo:8.0@sha256:4968f22d0c6c10ef29952f3e807f62872ba22b3312f25803564fbfc08255efc2` | Database |
| errbit | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo | (secret) | Generated mongo initdb root password. Keep private and preserve with backups. |
| `MONGO_INITDB_ROOT_USERNAME` | mongo | (secret) | Mongo initdb root username for mongo. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | errbit | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `MONGO_URL` | errbit | - | Mongo url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `RAILS_ENV` | errbit | production | Rails env for errbit. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ERRBIT_HOST` | errbit | - | Errbit host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SECRET_KEY_BASE` | errbit | (secret) | Generated application signing secret. Preserve across restarts and backup restores. |
| `ERRBIT_ADMIN_USER` | errbit | (secret) | Errbit admin user for errbit. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `RAILS_MAX_THREADS` | errbit | 2 | Maximum Rails request threads. Tune with available memory and database capacity. |
| `ERRBIT_ADMIN_EMAIL` | errbit | - | Required initial administrator email address. |
| `ERRBIT_USE_GRAVATAR` | errbit | false | Errbit use gravatar for errbit. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ERRBIT_ADMIN_PASSWORD` | errbit | (secret) | Generated errbit admin password. Keep private and preserve with backups. |
| `GITHUB_AUTHENTICATION` | errbit | false | Github authentication for errbit. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `GOOGLE_AUTHENTICATION` | errbit | false | Google authentication for errbit. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Volume:** `/data/db`
- **Healthcheck:** `/users/sign_in`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/errbit)
