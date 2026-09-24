# Deploy Restfox API Workspace on Railway

A browser API client with collections, environments and a request proxy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/restfox-api-workspace)

## About

A browser API client with collections, environments and a request proxy.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

A browser API client with collections, environments and a request proxy.

| Service | Role | Persistent path |
| --- | --- | --- |
| `app` | Private application or dependency | `None` |
| `restfox` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| restfox | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | `flawiddsouza/restfox:0.40.0@sha256:ed62ac9830dbd0ec052e22c67c32715f0d14b8b4adb28c3d27fe020a28ae22e3` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | restfox | 8080 | Port for restfox; follows the upstream deployment configuration. |
| `OWNER_AUTH` | restfox | true | Owner auth for restfox; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | restfox | all | Owner scope for restfox; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | restfox | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | restfox | 4004 | Upstream port for restfox; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | restfox | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `PORT` | app | 4004 | Port for app; follows the upstream deployment configuration. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/restfox-api-workspace)
