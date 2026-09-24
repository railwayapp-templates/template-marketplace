# Deploy Kellojo Asset Library on Railway

A private asset library with tags, uploads and persistent SQLite.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kellojo-asset-library)

## About

A private asset library with tags, uploads and persistent SQLite.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

A private asset library with tags, uploads and persistent SQLite.

| Service | Role | Persistent path |
| --- | --- | --- |
| `core` | Private application or dependency | `/app/data` |
| `asset-library` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| asset-library | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `ghcr.io/kellojo/asset-library:latest@sha256:d3354840cc26d93833527f86882255cf9c7770a70fef5d254cdaa5a4f1ca0c5c` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | asset-library | 8080 | Port for asset-library; follows the upstream deployment configuration. |
| `OWNER_AUTH` | asset-library | true | Owner auth for asset-library; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | asset-library | all | Owner scope for asset-library; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | asset-library | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | asset-library | 3000 | Upstream port for asset-library; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | asset-library | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `PORT` | core | 3000 | Port for core; follows the upstream deployment configuration. |
| `ORIGIN` | core | - | Resolved from the linked service; preserve this reference for the included topology. |
| `NODE_ENV` | core | production | Node env for core; follows the upstream deployment configuration. |
| `BODY_SIZE_LIMIT` | core | 32M | Body size limit for core; follows the upstream deployment configuration. |
| `PUBLIC_UPLOAD_PARALLELISM` | core | 4 | Public upload parallelism for core; follows the upstream deployment configuration. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/kellojo-asset-library)
