# Deploy Martin PostGIS Tile Server on Railway

Serve vector map tiles from your existing PostGIS database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/martin-postgis-tile-server)

## About

Serve vector map tiles from your existing PostGIS database.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Serve vector map tiles from your existing PostGIS database.

| Service | Role | Persistent path |
| --- | --- | --- |
| `app` | Private application or dependency | `None` |
| `martin` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| martin | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | `ghcr.io/maplibre/martin:1.16.1@sha256:59902019bf9038926ff0c71174237d6852e64c457830a6349abe7090be8818ca` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | martin | 8080 | Port for martin; follows the upstream deployment configuration. |
| `OWNER_AUTH` | martin | true | Owner auth for martin; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | martin | all | Owner scope for martin; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | martin | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | martin | 3000 | Upstream port for martin; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | martin | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `PORT` | app | 3000 | Port for app; follows the upstream deployment configuration. |
| `DATABASE_URL` | app | - | Required operator-supplied database url. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/usr/local/bin/martin --listen-addresses 0.0.0.0:3000`
- **Healthcheck:** `/health`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/martin-postgis-tile-server)
