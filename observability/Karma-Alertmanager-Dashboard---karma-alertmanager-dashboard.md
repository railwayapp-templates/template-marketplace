# Deploy Karma Alertmanager Dashboard on Railway

Group, inspect and silence alerts from your existing Alertmanager.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/karma-alertmanager-dashboard)

## About

Group, inspect and silence alerts from your existing Alertmanager.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Group, inspect and silence alerts from your existing Alertmanager.

| Service | Role | Persistent path |
| --- | --- | --- |
| `app` | Private application or dependency | `None` |
| `karma` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/prymitive/karma:v0.133@sha256:f5d0a0ff4062291f733980de56204b2073cfdd7d00e0444c910d78ca1478adf0` | Worker |
| karma | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | app | 8080 | Port for app; follows the upstream deployment configuration. |
| `LOG_CONFIG` | app | false | Log config for app; follows the upstream deployment configuration. |
| `LISTEN_PORT` | app | 8080 | Listen port for app; follows the upstream deployment configuration. |
| `LISTEN_ADDRESS` | app | 0.0.0.0 | Listen address for app; follows the upstream deployment configuration. |
| `ALERTMANAGER_URI` | app | - | Required operator-supplied alertmanager uri. |
| `ALERTMANAGER_NAME` | app | primary | Alertmanager name for app; follows the upstream deployment configuration. |
| `ALERTMANAGER_PROXY` | app | true | Alertmanager proxy for app; follows the upstream deployment configuration. |
| `PORT` | karma | 8080 | Port for karma; follows the upstream deployment configuration. |
| `OWNER_AUTH` | karma | true | Owner auth for karma; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | karma | all | Owner scope for karma; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | karma | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | karma | 8080 | Upstream port for karma; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | karma | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/health`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/karma-alertmanager-dashboard)
