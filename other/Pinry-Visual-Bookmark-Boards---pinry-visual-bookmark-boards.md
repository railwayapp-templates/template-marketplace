# Deploy Pinry Visual Bookmark Boards on Railway

Private image bookmarks and visual boards with generated administrator.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pinry-visual-bookmark-boards)

## About

Private image bookmarks and visual boards with generated administrator.

| Service | Access | Persistent storage |
| --- | --- | --- |
| pinry | Public HTTPS with owner authentication | None |
| app | Private Railway network | /data (SQLite, media, generated static assets, and persistent settings) |

Railway terminates public TLS. Keep the application at one replica because it uses local persistent storage. Only the gateway has a public service domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |
| pinry | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PUBLIC_URL` | app | - | Public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ADMIN_EMAIL` | app | - | Required email address for the initial Pinry administrator. Only used when the database has no users; email delivery is not configured. |
| `ADMIN_PASSWORD` | app | (secret) | Generated admin password. Keep private and preserve with backups. |
| `ADMIN_USERNAME` | app | (secret) | Admin username for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PINRY_SECRET_KEY` | app | (secret) | Generated pinry secret key. Keep private and preserve with backups. |
| `PORT` | pinry | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | pinry | true | Owner auth for pinry. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | pinry | all | Owner scope for pinry. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | pinry | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | pinry | 80 | Upstream port for pinry. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | pinry | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/pinry-visual-bookmark-boards)
