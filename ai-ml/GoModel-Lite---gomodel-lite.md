# Deploy GoModel Lite on Railway

Single-instance AI gateway with SQLite and OpenAI/Anthropic APIs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gomodel-lite)

## About

GoModel is a lightweight, open-source AI gateway with OpenAI-compatible and Anthropic-compatible APIs. Connect applications to multiple model providers through one endpoint, with streaming, model routing, and a built-in dashboard. Manage provider access, create application API keys, and track token usage and estimated costs in one place.

**Choose this template if…** you want the simplest GoModel setup: one service, persistent data, and no separate database to manage. For shared caching and multiple GoModel instances, choose [GoModel](https://railway.com/deploy/gomodel).

Lite uses the same GoModel software in a single-instance setup. SQLite on an attached volume stores usage history, managed keys, and configuration. HTTPS and an administrator key are configured automatically. No provider key is needed to deploy; bring your own provider access to make model requests. Redeployments briefly interrupt service; configure [volume backups](https://docs.railway.com/volumes/backups) before relying on it for production.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GoModel | `enterpilot/gomodel:0.1.90` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP listener port. Must match the public domain target port; Railway handles HTTPS. |
| `SQLITE_PATH` | /app/data/gomodel.db | SQLite database for usage, audit metadata, managed keys, and admin state. Keep this path inside the attached volume. |
| `ADMIN_UI_ENABLED` | true | Change to false and redeploy to hide only the dashboard while retaining the authenticated admin API. Requires ADMIN_ENDPOINTS_ENABLED=true. |
| `GOMODEL_MASTER_KEY` | - | Generated administrator key. Retrieve from this service’s Railway Variables tab to sign in to /admin/dashboard. Keep private; use separate application keys. |
| `LOGGING_LOG_BODIES` | false | Do not persist full prompts/responses in audit logs. Usage and metadata remain enabled. This does not disable response caching. |
| `ADMIN_ENDPOINTS_ENABLED` | true | Change to false and redeploy to disable both the admin API and dashboard, regardless of ADMIN_UI_ENABLED. The model API remains available. |

## Configuration

- **Healthcheck:** `/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/gomodel-lite)
