# Deploy Parseable-takehome on Railway

Open-source log observability stack with Parseable and Vector

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/parseable-takehome)

## About

Parseable is an open-source log storage and search platform. This template pairs it with Vector (a log shipper) and a demo todo app to give you a complete log observability stack — deployed and running on Railway in minutes.

This template deploys three services: Parseable (log storage and search UI), Vector (log collector and forwarder), and an optional demo Node.js app that sends structured logs automatically. Parseable runs in local-store mode backed by a Railway Volume for persistent storage — no S3 or object storage required. Vector exposes a public HTTP endpoint that any Railway-hosted app can POST logs to in 3 lines of code.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| parseable-railway | [AadityaGadiyarKelley/parseable-railway](https://github.com/AadityaGadiyarKelley/parseable-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| demo-app | [AadityaGadiyarKelley/parseable-railway](https://github.com/AadityaGadiyarKelley/parseable-railway) (root: /demo-app) | Web service |
| vector | [AadityaGadiyarKelley/parseable-railway](https://github.com/AadityaGadiyarKelley/parseable-railway) (root: /vector) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `P_FS_DIR` | parseable-railway | /data/parseable |
| `P_STAGING_DIR` | parseable-railway | /data/staging |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `VECTOR_URL` | demo-app | https://vector-production-7894.up.railway.app/logs |
| `PARSEABLE_UI_URL` | demo-app | https://parseable-railway-production.up.railway.app |
| `P_PASSWORD` | vector | (secret) |
| `P_USERNAME` | vector | (secret) |
| `PARSEABLE_URL` | vector | https://parseable-railway-production.up.railway.app |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/parseable-takehome)
