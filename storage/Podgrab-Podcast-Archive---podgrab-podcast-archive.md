# Deploy Podgrab Podcast Archive on Railway

A private browser podcast archive with persistent episode downloads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/podgrab-podcast-archive)

## About

A private browser podcast archive with persistent episode downloads.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

A private browser podcast archive with persistent episode downloads.

| Service | Role | Persistent path |
| --- | --- | --- |
| `core` | Private application or dependency | `/data` |
| `podgrab` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| podgrab | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `akhilrex/podgrab:1.0.0@sha256:bce133f3f5111381f63d9341313fa7ce7e16209068e8a06e6db2c4ed33972b87` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | podgrab | 8080 | Port for podgrab; follows the upstream deployment configuration. |
| `OWNER_AUTH` | podgrab | true | Owner auth for podgrab; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | podgrab | all | Owner scope for podgrab; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | podgrab | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | podgrab | 8080 | Upstream port for podgrab; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | podgrab | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `DATA` | core | /data/assets | Data for core; follows the upstream deployment configuration. |
| `PORT` | core | 8080 | Port for core; follows the upstream deployment configuration. |
| `CONFIG` | core | /data | Config for core; follows the upstream deployment configuration. |
| `CHECK_FREQUENCY` | core | 240 | Check frequency for core; follows the upstream deployment configuration. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -ec 'mkdir -p /data/assets; exec /api/app'`
- **Volume:** `/data`

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/podgrab-podcast-archive)
