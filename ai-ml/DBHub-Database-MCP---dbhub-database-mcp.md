# Deploy DBHub Database MCP on Railway

Read-only database MCP tools and web UI behind an owner gateway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dbhub-database-mcp)

## About

Read-only database MCP tools and web UI behind an owner gateway.

| Service | Access | Persistent storage |
| --- | --- | --- |
| dbhub | Public HTTPS | None |
| app | Private | None |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dbhub | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | dbhub | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | dbhub | true | Require owner authentication for every application route. |
| `OWNER_SCOPE` | dbhub | all | Protect all application routes. |
| `UPSTREAM_HOST` | dbhub | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | dbhub | 8080 | Upstream port for dbhub. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | dbhub | (secret) | Generated access password. Keep private and preserve with backups. |
| `DSN` | app | - | Required connection string for your existing database. Use a database user with read-only privileges. |
| `PORT` | app | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `TRANSPORT` | app | http | Transport for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DBHUB_HOST` | app | 0.0.0.0 | Dbhub host for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DBHUB_ALLOWED_HOSTS` | app | - | Dbhub allowed hosts resolved automatically from the linked service. Keep this reference when using the included topology. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/dbhub-database-mcp)
