# Deploy InfluxDB v2 — Open Source Time Series Database on Railway

Self-host InfluxDB — store & query metrics, IoT & time series data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/influxdb-v2-time-series)

## About

InfluxDB is the open-source, purpose-built time series database for metrics, events, and IoT data — the standard backend for monitoring dashboards, sensor telemetry, application metrics, and financial time series. This template deploys **InfluxDB v2**, the mature, full-featured release, pinned to a specific version with a persistent volume and admin credentials configured on first boot, so it's ready to write and query immediately.

---

InfluxDB is in the middle of a generational shift, and picking the right version is the most important decision — this template makes it for you deliberately, and explains why.

**This template uses InfluxDB v2, pinned to a specific version.** v2 is the mature, batteries-included release: the Flux query language, Tasks for scheduled processing, a full web UI with dashboards, and token authentication that works out of the box. It's what most production monitoring and IoT deployments run today.

**Why not v3 Core?** InfluxDB 3 Core is the new engine — SQL and InfluxQL queries, Apache Arrow, sub-10ms reads, unlimited cardinality — and it's impressive, but it's positioned as a single-node release for edge and non-critical workloads, drops the v2 UI and Flux, and has a real deployment trap: with the default file object store, its data-directory environment variables aren't honored and the server fails to start without explicit object-store configuration. For a straightforward, full-featured self-hosted time series database today, v2 is the more reliable choice. If you specifically need v3's SQL engine, that's a deliberate, different setup.

**One thing to know regardless of this template: on September 15, 2026, InfluxDB's Docker `latest` tag switches to v3 Core.** Any deployment pinned to `latest` will jump a major version on that date. This template pins v2 explicitly, so it won't move under you — upgrading stays a decision you make.

On first boot, `DOCKER_INFLUXDB_INIT_MODE=setup` auto-creates your organization, bucket, admin user, and an API token from the init variables, so the instance is usable the moment it's up rather than dropping you at a setup screen.

Typical cost: **~$5–10/month** on Railway depending on data volume. InfluxDB OSS is free; InfluxDB Cloud bills by usage.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| influxdb | `influxdb` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DOCKER_INFLUXDB_INIT_ORG` | default |
| `DOCKER_INFLUXDB_INIT_MODE` | setup |
| `DOCKER_INFLUXDB_INIT_BUCKET` | default |
| `DOCKER_INFLUXDB_INIT_PASSWORD` | (secret) |
| `DOCKER_INFLUXDB_INIT_USERNAME` | (secret) |

## Configuration

- **Volume:** `/var/lib/influxdb2`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/influxdb-v2-time-series)
