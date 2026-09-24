# Deploy Elasticvue Search Cluster Console on Railway

Inspect Elasticsearch clusters, indices and queries in your browser.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/elasticvue-search-cluster-console)

## About

Inspect Elasticsearch clusters, indices and queries in your browser.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Inspect Elasticsearch clusters, indices and queries in your browser.

| Service | Role | Persistent path |
| --- | --- | --- |
| `app` | Private application or dependency | `None` |
| `elasticvue` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `cars10/elasticvue:1.16.0@sha256:b58979ac03402d95e1d91dcd581c0fe24f9135cc645ab56b39181ca024071018` | Worker |
| elasticvue | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port for elasticvue; follows the upstream deployment configuration. |
| `OWNER_AUTH` | true | Owner auth for elasticvue; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | all | Owner scope for elasticvue; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | 8080 | Upstream port for elasticvue; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/elasticvue-search-cluster-console)
