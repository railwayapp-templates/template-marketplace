# Deploy Mikochi File Browser on Railway

Private file browsing, uploads, downloads, and media streaming.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mikochi-file-browser)

## About

Private file browsing, uploads, downloads, and media streaming.

| Service | Access | Persistent storage |
| --- | --- | --- |
| mikochi | Public HTTPS with owner authentication | None |
| app | Private Railway network | /data (the browsable file library) |

Railway terminates public TLS. Keep the application at one replica because it uses local persistent storage. Only the gateway has a public service domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `zer0tonin/mikochi:1.11.0@sha256:09872bae1554ca9c291e33be2bbff2e0d7bbe265082d2355ef28662f7bab5320` | Database |
| mikochi | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | app | 0.0.0.0:8080 | HTTP bind address. Keep 0.0.0.0 so Railway can reach the service. |
| `NO_AUTH` | app | false | No auth for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DATA_DIR` | app | /data | Data dir for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PASSWORD` | app | (secret) | Generated password. Keep private and preserve with backups. |
| `USERNAME` | app | (secret) | Username for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | mikochi | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | mikochi | true | Owner auth for mikochi. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | mikochi | all | Owner scope for mikochi. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | mikochi | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | mikochi | 8080 | Upstream port for mikochi. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | mikochi | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/mikochi-file-browser)
