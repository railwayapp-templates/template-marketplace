# Deploy Nezha on Railway

Self-hosted server & website monitoring dashboard; admin secured.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nezha)

## About

Nezha (哪吒) is a lightweight, open-source, self-hosted dashboard for monitoring your servers and websites: uptime,
load, traffic, latency and alerts, with small agents reporting from each machine. This template deploys the Nezha
dashboard with your admin account secured at start-up. It is a community-maintained template and is not affiliated
with the Nezha project.

Nezha's dashboard serves a web UI and its agent gRPC endpoint on a single port, and on a fresh database it seeds a
well-known `admin/admin` account — which, on a public URL, can be claimed by whoever opens it first. It stores its
data and auto-generated secrets in SQLite on disk.

This template runs Nezha on Railway with the admin secured at first boot (the default `admin/admin` is replaced with
a generated password), the data and secrets persisted on a volume, and the port, health check and networking wired.
Because agent traffic is gRPC — which does not traverse an HTTP edge — the template provisions **both** a public
HTTPS domain for the web UI and a **TCP proxy** for the agents, on the same port. Both run from the official image,
pinned by digest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nezha | `ghcr.io/youssefsiam38/nezha-railway:1.0.0` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8008 | Port Railway routes traffic and health checks to; keep it equal to the dashboard's listen port (8008). |
| `OWNER_PASSWORD` | (secret) | The admin's password, generated. It replaces the default admin/admin at start-up; copy it to sign in. |
| `OWNER_USERNAME` | (secret) | The admin username you sign in with. |

## Configuration

- **Healthcheck:** `/api/v1/setting`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8008
- **Volume:** `/dashboard/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/nezha)
