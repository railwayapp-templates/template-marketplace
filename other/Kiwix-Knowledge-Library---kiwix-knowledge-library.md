# Deploy Kiwix Knowledge Library on Railway

Read a persistent ZIM knowledge archive through a private web server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kiwix-knowledge-library)

## About

Read a persistent ZIM knowledge archive through a private web server.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Read a persistent ZIM knowledge archive through a private web server.

| Service | Role | Persistent path |
| --- | --- | --- |
| `core` | Private application or dependency | `/data` |
| `kiwix` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kiwix | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `ghcr.io/kiwix/kiwix-serve:3.8.2@sha256:e478554a9920412eeb5ce1d73f24e4b28445ebed233187cdd03c623c32be46a5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | kiwix | 8080 | Port for kiwix; follows the upstream deployment configuration. |
| `OWNER_AUTH` | kiwix | true | Owner auth for kiwix; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | kiwix | all | Owner scope for kiwix; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | kiwix | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | kiwix | 8080 | Upstream port for kiwix; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | kiwix | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |
| `PORT` | core | 8080 | Port for core; follows the upstream deployment configuration. |
| `ZIM_URL` | core | https://download.kiwix.org/zim/wikipedia/wikipedia_en_mathematics_mini_2026-06.zim | Zim url for core; follows the upstream deployment configuration. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -ec 'cd /data
if [ ! -s library.zim ]; then
wget "$ZIM_URL" -O library.zim.part
mv library.zim.part library.zim
fi
exec /usr/local/bin/kiwix-serve --port=8080 /data/library.zim'`
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/kiwix-knowledge-library)
