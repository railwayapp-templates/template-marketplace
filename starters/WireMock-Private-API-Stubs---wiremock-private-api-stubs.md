# Deploy WireMock Private API Stubs on Railway

Persistent HTTP API stubs behind generated owner access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wiremock-private-api-stubs)

## About

Persistent HTTP API stubs behind generated owner access.

**Validation scope: source review and static checks.** This template meets the selection criterion through a public marketplace gap: no matching listing was found on September 19, 2026 using `WireMock`, `Wire Mock`. Searches are bounded; private, unindexed and differently named listings may exist. The selection does not claim any competitor is broken.

| Service | Network | Persistent mount |
| --- | --- | --- |
| core | Private | /home/wiremock |
| wiremock | Public HTTPS | None |

The public gateway requires username **admin** and **ACCESS_PASSWORD** from the **wiremock** service. API clients can send `X-Template-Key: YOUR_ACCESS_PASSWORD`. Keep core and databases private. The gateway strips Basic Authorization, preserves Bearer authorization and WebSocket upgrades, and limits requests to 32 MiB. Verify native client compatibility before relying on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wiremock | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `wiremock/wiremock:3.13.2@sha256:0d4ecb3e4dc8213fd7a4d37d6a78f6e6b553a6d2e15bd51b0999781282ac61b3` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | wiremock | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | wiremock | true | Owner auth for wiremock. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | wiremock | all | Owner scope for wiremock. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | wiremock | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | wiremock | 8080 | Upstream port for wiremock. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | wiremock | (secret) | Generated access password. Keep private and preserve with backups. |
| `WIREMOCK_OPTIONS` | core | --port 8080 --disable-request-logging --max-request-journal-entries 1000 | Wiremock options for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/wiremock`

**Category:** Starters · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/wiremock-private-api-stubs)
