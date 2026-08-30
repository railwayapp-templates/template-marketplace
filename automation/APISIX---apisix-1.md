# Deploy APISIX on Railway

Apache APISIX API gateway with admin dashboard and etcd config store

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apisix-1)

## About

Deploy Apache APISIX on Railway in one click. This template provisions APISIX with an etcd companion service — the full Admin API and dashboard are available out of the box. SSL is handled automatically by Railway.

This template runs two services:

- **APISIX Gateway** (port 9080) — routes, plugins, and rate limits
- **Stream proxy** (TCP 9100, UDP 9200) — L4 TCP/UDP proxying, managed from the dashboard's Stream section
- **etcd** (port 2379, private network) — configuration store backing the Admin API
- **Admin API + Dashboard** (port 9180) — manage routes via REST API or the web UI at `/ui`
- **Health endpoint** — `/health` returns 200 for Railway healthchecks

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| apisix | [INAPP-Mobile/railway-apisix](https://github.com/INAPP-Mobile/railway-apisix) | Web service |
| etcd | [INAPP-Mobile/railway-apisix](https://github.com/INAPP-Mobile/railway-apisix) (root: etcd) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | apisix | 9080 | Port APISIX listens on. |
| `ETCD_HOST` | apisix | - | etcd sibling service private hostname. Resolved from the etcd service at deploy time. |
| `APISIX_ADMIN_KEY` | apisix | - | Admin API key for the APISIX admin API and dashboard. Auto-generated on first deploy. |
| `ETCD_ADVERTISE_CLIENT_URLS` | etcd | - | Client URL APISIX connects to. Resolved from this service's own private domain. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami/etcd`

**Category:** Automation · **Languages:** Shell, Dockerfile, Go Template

[View on Railway →](https://railway.com/deploy/apisix-1)
