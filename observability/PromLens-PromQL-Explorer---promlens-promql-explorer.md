# Deploy PromLens PromQL Explorer on Railway

Build and explain PromQL queries with persistent shared query links.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/promlens-promql-explorer)

## About

Build and explain PromQL queries with persistent shared query links.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Build and explain PromQL queries with persistent shared query links.

| Service | Role | Persistent path |
| --- | --- | --- |
| `app` | Private application or dependency | `/data` |
| `promlens` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| promlens | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | `prom/promlens:v0.4.0@sha256:4a377d1a0eaaa2f77deec3d60c12c657aab5fdbb430ccd0dbe762127fd804bab` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port for promlens; follows the upstream deployment configuration. |
| `OWNER_AUTH` | true | Owner auth for promlens; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | all | Owner scope for promlens; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | 8080 | Upstream port for promlens; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/promlens --web.listen-address=0.0.0.0:8080 --shared-links.sql.driver=sqlite --shared-links.sql.dsn=/data/links.db`
- **Volume:** `/data`

**Category:** Observability · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/promlens-promql-explorer)
