# Deploy Raneto Private Knowledge Base on Railway

Markdown knowledge base with browser editing and persistent pages.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/raneto-private-knowledge-base)

## About

Markdown knowledge base with browser editing and persistent pages.

| Service | Access | Persistent storage |
| --- | --- | --- |
| raneto | Public HTTPS with owner authentication | None |
| app | Private Railway network | /data (Markdown pages, page images, and login sessions) |

Railway terminates public TLS. Keep the application at one replica because it uses local persistent storage. Only the gateway has a public service domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| raneto | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | raneto | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | raneto | true | Owner auth for raneto. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | raneto | all | Owner scope for raneto. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | raneto | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | raneto | 8080 | Upstream port for raneto. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | raneto | (secret) | Generated access password. Keep private and preserve with backups. |
| `HOST` | app | 0.0.0.0 | HTTP bind address. Keep 0.0.0.0 so Railway can reach the service. |
| `PORT` | app | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `NODE_ENV` | app | production | Node.js runtime mode. Keep production for hosted deployments. |
| `PUBLIC_URL` | app | - | Public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SITE_TITLE` | app | My Knowledge Base | Site title for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SESSION_SECRET` | app | (secret) | Generated session secret. Keep private and preserve with backups. |
| `RANETO_PASSWORD` | app | (secret) | Generated raneto password. Keep private and preserve with backups. |
| `RANETO_USERNAME` | app | (secret) | Raneto username for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/raneto-private-knowledge-base)
