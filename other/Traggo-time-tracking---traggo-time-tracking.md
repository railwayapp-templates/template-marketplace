# Deploy Traggo time tracking on Railway

Private tag-based time tracking with durable SQLite storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/traggo-time-tracking)

## About

Traggo is a self-hosted tag-based time tracker with timers, calendar views, customizable dashboards, and multiple users. This template creates a generated owner credential and durable application storage.

The deployment runs the immutable Traggo 0.8.3 image as one public service. A 5 GB Railway volume stores its SQLite database, so accounts, tags, dashboards, device sessions, and recorded time survive redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Traggo | `traggo/server:0.8.3@sha256:8bf510774ce1729b5bd9a8930e174de03ebec8c25ca4aaa087c0e56e2bcbb67a` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3030 | HTTP listener used by Railway. |
| `TRAGGO_PORT` | 3030 | Traggo HTTP listener. |
| `TRAGGO_LOG_LEVEL` | info | Application log verbosity. |
| `TRAGGO_DATABASE_DIALECT` | sqlite3 | Pinned embedded database backend. |
| `TRAGGO_DEFAULT_USER_NAME` | owner | Initial owner username on an empty volume. |
| `TRAGGO_DEFAULT_USER_PASS` | - | Generated initial owner password; read it from service variables. |
| `TRAGGO_DATABASE_CONNECTION` | data/traggo.db | Database path inside the persistent volume. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/traggo/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/traggo-time-tracking)
