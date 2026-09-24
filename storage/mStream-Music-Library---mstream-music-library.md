# Deploy mStream Music Library on Railway

A private browser music library with persistent uploads and metadata.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mstream-music-library)

## About

A private browser music library with persistent uploads and metadata.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

A private browser music library with persistent uploads and metadata.

| Service | Role | Persistent path |
| --- | --- | --- |
| `core` | Private application or dependency | `/config` |
| `mstream` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mstream | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `linuxserver/mstream:v6.29.0-ls30@sha256:fa93d0d7ad01756cc83d7d49252d78517d20871e18d33e171bffd30e865d0156` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mstream | 8080 | Port for mstream; follows the upstream deployment configuration. |
| `OWNER_AUTH` | mstream | true | Owner auth for mstream; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | mstream | all | Owner scope for mstream; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | mstream | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | mstream | 3000 | Upstream port for mstream; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | mstream | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `TZ` | core | UTC | Tz for core; follows the upstream deployment configuration. |
| `PGID` | core | 1000 | Pgid for core; follows the upstream deployment configuration. |
| `PUID` | core | 1000 | Puid for core; follows the upstream deployment configuration. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bash -ec 'mkdir -p /config/music; if [ ! -f /config/config.json ]; then sed "s|\"/music\"|\"/config/music\"|;s|\"noUpload\": true|\"noUpload\": false|" /defaults/config.json > /config/config.json; fi; exec /init'`
- **Volume:** `/config`

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/mstream-music-library)
