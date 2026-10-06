# Deploy InfluxDB on Railway

InfluxDB is a programmable and performant time series database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/influxdb-1)

## About

This repository packages **InfluxDB** for [Railway](https://railway.app/) using a Dockerfile-based build. Railway builds the image from `Dockerfile`, exposes the HTTP API and UI on port **8086**, and applies deploy settings from `railway.toml` / `railway.json` (including health checks and restart policy).

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/fwbafn?referralCode=2_sIT9)

**Quick deploy:** use the button above or connect this repo in Railway, set the required environment variables (see [README](README.md)), and deploy. After provisioning, use your Railway-generated HTTPS URL; clients typically connect on **443** behind Railway’s proxy.

InfluxDB is an open-source, high-performance **time-series database** built for large volumes of timestamped data—metrics, events, sensor readings, and application telemetry. On Railway, the service runs as a container from the official `influxdb` image (default **2.7** in this template, overridable via `Dockerfile` `ARG version`), with `influxd` listening on `:8086`.

**Notable characteristics:**

- **Time-series storage:** Data is organized around time for fast historical and near-real-time reads and writes.
- **Flexible model:** Schema-less ingestion with **tags** (metadata for filtering) and **fields** (measured values).
- **Querying:** InfluxDB 2.x uses **Flux**; InfluxQL remains relevant in many integrations and older tooling.
- **Continuous queries / tasks:** Scheduled downsampling and rollups help control storage while keeping long-range aggregates.
- **Retention policies:** Automatic expiry and lifecycle rules reduce manual cleanup.
- **Performance:** Strong write and query throughput for monitoring and analytics workloads.
- **Ecosystem:** Pairs well with **Grafana**, **Telegraf**, and other observability and IoT tooling.

Hosting on Railway gives you managed TLS, a public URL, and straightforward environment-based configuration without operating your own VM cluster for a single database instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| InfluxDB | [vergissberlin/railwayapp-influxdb](https://github.com/vergissberlin/railwayapp-influxdb) (branch: main) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8086 | HTTP API port. |
| `DOCKER_INFLUXDB_INIT_ORG` | railway | Initial organization. |
| `DOCKER_INFLUXDB_INIT_MODE` | setup | Initialize only an empty data volume. |
| `DOCKER_INFLUXDB_INIT_BUCKET` | railway | Initial bucket. |
| `DOCKER_INFLUXDB_INIT_PASSWORD` | (secret) | Initial administrator password. |
| `DOCKER_INFLUXDB_INIT_USERNAME` | (secret) | Initial administrator username. |
| `DOCKER_INFLUXDB_INIT_RETENTION` | - | The duration the system's initial bucket should retain data. If not set, the initial bucket will retain data forever. |
| `DOCKER_INFLUXDB_INIT_ADMIN_TOKEN` | (secret) | Initial API token. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/influxdb2`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/influxdb-1)
