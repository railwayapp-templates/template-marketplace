# Deploy MockServer Private Expectations on Railway

HTTP mock expectations with bounded logs and persistent configuration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mockserver-private-expectations)

## About

HTTP mock expectations with bounded logs and persistent configuration.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `MockServer`, `Mock Server`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /config |
| mockserver | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **mockserver** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mockserver | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mockserver | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | mockserver | true | Owner auth for mockserver. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | mockserver | all | Owner scope for mockserver. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | mockserver | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | mockserver | 1080 | Upstream port for mockserver. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | mockserver | (secret) | Generated access password. Keep private and preserve with backups. |
| `MOCKSERVER_SERVER_PORT` | core | 1080 | Mockserver server port for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MOCKSERVER_MAX_LOG_ENTRIES` | core | 1000 | Mockserver max log entries for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MOCKSERVER_MAX_EXPECTATIONS` | core | 1000 | Mockserver max expectations for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MOCKSERVER_PERSIST_EXPECTATIONS` | core | true | Mockserver persist expectations for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MOCKSERVER_INITIALIZATION_JSON_PATH` | core | /config/expectations.json | Mockserver initialization json path for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MOCKSERVER_PERSISTED_EXPECTATIONS_PATH` | core | /config/expectations.json | Mockserver persisted expectations path for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Starters · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/mockserver-private-expectations)
