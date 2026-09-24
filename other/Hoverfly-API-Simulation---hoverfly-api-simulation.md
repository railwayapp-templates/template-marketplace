# Deploy Hoverfly API Simulation on Railway

Capture and simulate API behavior with authenticated administration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hoverfly-api-simulation)

## About

Capture and simulate API behavior with authenticated administration.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Capture and simulate API behavior with authenticated administration.

| Service | Role | Persistent path |
| --- | --- | --- |
| `app` | Private application or dependency | `None` |
| `hoverfly` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `spectolabs/hoverfly:v1.12.15@sha256:0ac2a55a94a394d82911d512bb70f23c412c666e7cdd3e22f45088b07a901f05` | Worker |
| hoverfly | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | app | 8888 | Port for app; follows the upstream deployment configuration. |
| `AdminPort` | app | 8888 | Adminport for app; follows the upstream deployment configuration. |
| `ProxyPort` | app | 8500 | Proxyport for app; follows the upstream deployment configuration. |
| `HoverflyAdmin` | app | owner | Hoverflyadmin for app; follows the upstream deployment configuration. |
| `HoverflySecret` | app | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `HoverflyAdminPass` | app | - | Generated per-deployment secret. Keep private and preserve with backups. |
| `HoverflyAuthEnabled` | app | true | Hoverflyauthenabled for app; follows the upstream deployment configuration. |
| `PORT` | hoverfly | 8080 | Port for hoverfly; follows the upstream deployment configuration. |
| `OWNER_AUTH` | hoverfly | true | Owner auth for hoverfly; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | hoverfly | all | Owner scope for hoverfly; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | hoverfly | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | hoverfly | 8888 | Upstream port for hoverfly; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | hoverfly | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/api/health`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/hoverfly-api-simulation)
