# Deploy CTFreak Task Scheduler on Railway

Schedule remote commands and workflows with durable execution history.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ctfreak-task-scheduler)

## About

Schedule remote commands and workflows with durable execution history.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Schedule remote commands and workflows with durable execution history.

| Service | Role | Persistent path |
| --- | --- | --- |
| `app` | Private application or dependency | `/data` |
| `ctfreak` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ctfreak | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | `jypsoftware/ctfreak:1.40.0@sha256:cfa6fd13e81894b9d50b5a206168b711952ba1b51b6c5d820c9982bb228368b9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ctfreak | 8080 | Port for ctfreak; follows the upstream deployment configuration. |
| `OWNER_AUTH` | ctfreak | true | Owner auth for ctfreak; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | ctfreak | all | Owner scope for ctfreak; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | ctfreak | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | ctfreak | 6700 | Upstream port for ctfreak; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | ctfreak | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `TZ` | app | UTC | Tz for app; follows the upstream deployment configuration. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/ctfreak-task-scheduler)
