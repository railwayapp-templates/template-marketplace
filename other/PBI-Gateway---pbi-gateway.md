# Deploy PBI Gateway on Railway

Power BI Gateway con Statdeck Geo · más conectores en statdeck.lat

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pbi-gateway)

## About

<p align="center">
  <img width="96" alt="PBI Gateway" src="On-Premises-Data-Gateway.png">
</p>

PBI Gateway is a secure, serverless API bridge that lets **Power BI** Desktop and Service query your **SQL Server** database over HTTPS — without installing Microsoft's Windows-based On-Premises Data Gateway. It ships with its own login, JWT validation (Entra ID), rate limiting, the **Statdeck Geo** Power BI visual, a Theme PBI studio and an SVG → PBI converter.

&gt; 🌐 **Need MySQL, MongoDB, Oracle, PostgreSQL, Excel or SharePoint?** Sign up at **[statdeck.lat](https://statdeck.lat/)** to access more enterprise connectors managed by **Statdeck**.

This template deploys a Node.js 20 service from a multi-stage `Dockerfile`. Railway builds the image, exposes it on a public HTTPS domain, runs a `/api/gateway/health` healthcheck and restarts on failure. You configure the gateway through environment variables: SQL Server credentials (host **and** port separated), a session-signing `GATEWAY_RECOVERY_KEY`, dashboard login (`GATEWAY_USER` / `GATEWAY_PASSWORD`), a public **Mapbox** token (for the Statdeck Geo visual) and an optional `DATABASE_URL` for PostgreSQL profile storage. Add a Railway PostgreSQL plugin to the project and the variable is injected automatically. The container drops to an unprivileged user, supports gzip compression, structured logging via Pino and streams large result sets without exhausting memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PBI-Gateway | [Kennethguerra3/PBI-Gateway](https://github.com/Kennethguerra3/PBI-Gateway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | PBI-Gateway | 3000 | - |
| `NODE_ENV` | PBI-Gateway | production | - |
| `LOG_LEVEL` | PBI-Gateway | info | - |
| `POSTGRES_DB` | PBI-Gateway | railway | Default database created when image is started. |
| `DATABASE_URL` | PBI-Gateway | - | URL to connect to Postgres database. |
| `GATEWAY_USER` | PBI-Gateway | (secret) | - |
| `MAPBOX_TOKEN` | PBI-Gateway | (secret) | - |
| `POSTGRES_USER` | PBI-Gateway | (secret) | User to connect to Postgres DB |
| `SQLSERVER_USER` | PBI-Gateway | (secret) | - |
| `GATEWAY_PASSWORD` | PBI-Gateway | (secret) | - |
| `COMPRESSION_LEVEL` | PBI-Gateway | 6 | - |
| `GATEWAY_MAX_LIMIT` | PBI-Gateway | 500000 | - |
| `POSTGRES_PASSWORD` | PBI-Gateway | (secret) | Password to connect to DB |
| `RATE_LIMIT_WINDOW` | PBI-Gateway | 15 | - |
| `SQLSERVER_PASSWORD` | PBI-Gateway | (secret) | - |
| `DATABASE_PUBLIC_URL` | PBI-Gateway | - | Public URL to connect to Postgres database, used by the Data panel. |
| `GATEWAY_MAX_RETRIES` | PBI-Gateway | 3 | - |
| `GATEWAY_RETRY_DELAY` | PBI-Gateway | 2000 | - |
| `COMPRESSION_THRESHOLD` | PBI-Gateway | 1024 | - |
| `RATE_LIMIT_MAX_REQUESTS` | PBI-Gateway | 100 | - |
| `SQLSERVER_QUERY_TIMEOUT` | PBI-Gateway | 120000 | - |
| `GATEWAY_AUTO_STREAM_THRESHOLD` | PBI-Gateway | 25000 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** JavaScript, TypeScript, HTML, CSS, HCL, Less, PowerShell, Dockerfile

[View on Railway →](https://railway.com/deploy/pbi-gateway)
