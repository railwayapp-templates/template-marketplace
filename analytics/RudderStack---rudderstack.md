# Deploy RudderStack on Railway

Privacy and Security focused Segment-alternative, in Golang and React.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rudderstack)

## About

Hosting RudderStack on Railway is easy, all you need is your workspace token from your free, open source RudderStack dashboard. See below on how to find this token.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| d-transformer | `rudderstack/rudder-transformer:latest` | TCP service |
| metrics-exporter | `prom/statsd-exporter:v0.22.4` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| backend | `rudderlabs/rudder-server:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `STATSD_SERVER_PORT` | d-transformer | 9125 | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `JOBS_DB_USER` | backend | (secret) | - |
| `WORKSPACE_TOKEN` | backend | (secret) | - |
| `JOBS_DB_PASSWORD` | backend | (secret) | - |
| `CONFIG_BACKEND_URL` | backend | https://api.rudderstack.com | - |
| `RSERVER_GATEWAY_WEBHOOK_SOURCE_LIST_FOR_PARSING_PARAMS` | backend | Shopify | Mandatory env for Shopify |

## Configuration

- **TCP Proxies:** 9090
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/rudderstack)
