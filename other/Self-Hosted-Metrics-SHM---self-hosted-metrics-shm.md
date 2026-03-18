# Deploy Self Hosted Metrics SHM on Railway

Privacy-first, Agnostic Telemetry for Self-Hosted Software

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/self-hosted-metrics-shm)

## About

Self-Hosted Metrics (SHM) is a privacy-first telemetry server for self-hosted and on-prem software. It collects aggregate usage metrics, active instance counts, versions, and environments without tracking end users. Applications send signed JSON snapshots, and SHM automatically builds dashboards with tables, KPIs, and graphs from the data.

Hosting SHM on Railway involves deploying the SHM server (a Go service with an embedded UI) alongside a PostgreSQL database. Incoming metric snapshots are stored as JSONB in Postgres and visualized in real time. You configure a database connection string, expose the service port, and optionally add a GitHub token for higher API limits. Initial SQL migrations must be applied once to set up the schema. Railway handles networking, scaling, and environment management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| shm | `ghcr.io/btouchard/shm:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | shm | 8080 |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/self-hosted-metrics-shm)
