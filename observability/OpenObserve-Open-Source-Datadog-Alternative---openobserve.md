# Deploy OpenObserve | Open Source Datadog Alternative on Railway

Self-host OpenObserve — logs, metrics, traces, RUM in one binary

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openobserve)

## About

OpenObserve is an open-source observability platform for logs, metrics, traces, and real user monitoring (RUM) — a Rust-native, Parquet-backed alternative to Elasticsearch, Datadog, and Splunk that the makers claim ingests at up to 140× lower storage cost than ELK. Self-host OpenObserve when you want the full observability stack (search, dashboards, alerts, pipelines, RUM) behind a single binary and a single web UI.

This Railway template runs OpenObserve in single-node local mode from the official `openobserve/openobserve` Docker image, mounts a persistent volume at `/data` for the embedded SQLite meta-store and Parquet shards, and exposes the web UI on HTTPS at a generated `.up.railway.app` domain. No external Postgres, Elasticsearch, or S3 bucket is required — local mode is feature-complete.

OpenObserve is a unified observability stack: a single Rust binary that ingests, indexes, and queries logs, metrics, traces, and frontend RUM events using Apache Parquet columnar storage and DataFusion for SQL/PromQL queries. The community edition is AGPL-3.0 and feature-complete — same UI, same query engine, same pipelines as the cloud offering.

Key features:

- Logs, metrics, traces, and RUM in one binary — no Elasticsearch, no separate metrics TSDB
- Parquet on disk + DataFusion — ~140× cheaper storage than ELK, claimed by the project
- Built-in dashboards, alerts, pipelines (VRL/JS transforms), and a query language for each signal
- OTLP, Prometheus, Loki, Elasticsearch `_bulk`, and Fluent Bit ingest APIs out of the box
- Built-in user/auth/RBAC and multi-tenant organizations

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenObserve | `openobserve/openobserve:v0.80.3` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5080 | Railway edge routing port |
| `ZO_WEB_URL` | - | Canonical public UI URL |
| `ZO_DATA_DIR` | /data | Parquet + SQLite meta-store path |
| `ZO_HTTP_PORT` | 5080 | HTTP listening port |
| `ZO_TELEMETRY` | false | Disable anonymous telemetry |
| `ZO_LOCAL_MODE` | true | Single-node local mode (no Postgres/S3) |
| `ZO_ROOT_USER_EMAIL` | - | Root login email (bootstrap) |
| `ZO_ROOT_USER_PASSWORD` | (secret) | Root login password (bootstrap-only) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/openobserve)
