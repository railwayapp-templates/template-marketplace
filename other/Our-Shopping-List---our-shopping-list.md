# Deploy Our Shopping List on Railway

Shared browser shopping boards with a private MongoDB database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/our-shopping-list)

## About

Shared browser shopping boards with a private MongoDB database.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Shared browser shopping boards with a private MongoDB database.

| Service | Role | Persistent path |
| --- | --- | --- |
| `mongodb` | Private application or dependency | `/data/db` |
| `core` | Private application or dependency | `None` |
| `our-shopping-list` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| our-shopping-list | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| mongodb | `mongo:7.0@sha256:9854f7139445d766a9523571d6f047530c45547460ffcf8259eb2bf4264632ca` | Database |
| core | `ourshoppinglist/our-shopping-list:4.2.0@sha256:a074a75fde82ec6ca0628f16eba20a059a369be8385cc5fcf274575bdbc03430` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | our-shopping-list | 8080 | Port for our-shopping-list; follows the upstream deployment configuration. |
| `OWNER_AUTH` | our-shopping-list | true | Owner auth for our-shopping-list; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | our-shopping-list | all | Owner scope for our-shopping-list; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | our-shopping-list | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | our-shopping-list | 8080 | Upstream port for our-shopping-list; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | our-shopping-list | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `MONGODB_DB` | core | osl | Mongodb db for core; follows the upstream deployment configuration. |
| `LISTEN_PORT` | core | 8080 | Listen port for core; follows the upstream deployment configuration. |
| `MONGODB_HOST` | core | - | Resolved from the linked service; preserve this reference for the included topology. |
| `MONGODB_PORT` | core | 27017 | Mongodb port for core; follows the upstream deployment configuration. |
| `VITE_APP_APM_ENABLED` | core | 0 | Vite app apm enabled for core; follows the upstream deployment configuration. |
| `VITE_APP_LIST_ALL_BOARDS_ENABLED` | core | 0 | Vite app list all boards enabled for core; follows the upstream deployment configuration. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `mongod --bind_ip_all`
- **Volume:** `/data/db`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/our-shopping-list)
