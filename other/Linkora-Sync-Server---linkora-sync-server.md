# Deploy Linkora Sync Server on Railway

Token-protected Linkora synchronization with persistent SQLite.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/linkora-sync-server)

## About

Token-protected Linkora synchronization with persistent SQLite.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Token-protected Linkora synchronization with persistent SQLite.

| Service | Role | Persistent path |
| --- | --- | --- |
| `linkora-sync` | Public application | `/data` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| linkora-sync | `sakethpathike/linkora-sync-server:0.3.0@sha256:5e01902af90011c4d6bb9f55f71304eac8d9d09c1d0f10a2fac52ab782c75a57` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LINKORA_SERVER_PORT` | 45454 | Linkora server port for linkora-sync; follows the upstream deployment configuration. |
| `LINKORA_DATABASE_URL` | sqlite:/data/linkora.db | Linkora database url for linkora-sync; follows the upstream deployment configuration. |
| `LINKORA_HOST_ADDRESS` | 0.0.0.0 | Linkora host address for linkora-sync; follows the upstream deployment configuration. |
| `LINKORA_DATABASE_USER` | (secret) | Linkora database user for linkora-sync; follows the upstream deployment configuration. |
| `LINKORA_DATABASE_PASSWORD` | (secret) | Linkora database password for linkora-sync; follows the upstream deployment configuration. |
| `LINKORA_SERVER_AUTH_TOKEN` | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `LINKORA_KEY_STORE_PASSWORD` | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `LINKORA_SERVER_USE_ENV_VAL` | true | Linkora server use env val for linkora-sync; follows the upstream deployment configuration. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/linkora-sync-server)
