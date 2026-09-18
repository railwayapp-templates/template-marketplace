# Deploy Nightingale on Railway

Self-hosted monitoring & alerting with an embedded time-series DB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nightingale)

## About

Nightingale (n9e) is an open-source monitoring and alerting platform — what Grafana is to visualization,
Nightingale is to alerting. This template deploys the all-in-one Nightingale server with your admin account secured
at start-up. It is a community-maintained template and is not affiliated with the Nightingale project.

Nightingale's server bundles a web UI, a metrics query and alerting engine, and — in its default configuration — an
embedded time-series database and an embedded Redis, backed by SQLite with automatic schema migration. It ships with
a well-known default admin (`root/root.2020`), which on a public URL can be claimed by whoever opens it first, and it
keeps its data on local disk.

This template runs Nightingale on Railway as a single self-contained service: the admin is secured at first boot (the
default password is replaced with a generated one), the SQLite database and the embedded time-series database are
persisted on one volume, and the port and health check are wired. A time-series datasource is auto-registered, so
querying and alerting work immediately. It runs from the official image, pinned by digest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nightingale | `ghcr.io/youssefsiam38/nightingale-railway:1.0.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 17000 | Port Railway routes traffic and health checks to; keep it equal to Nightingale's listen port (17000). |
| `OWNER_PASSWORD` | (secret) | The admin's password, generated. It replaces the default root/root.2020 at start-up; sign in as root. |

## Configuration

- **Healthcheck:** `/api/n9e/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/nightingale)
