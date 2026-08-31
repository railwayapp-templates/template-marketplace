# Deploy OpenObserve | (Just Updated) Datadog Alternative That Actually Boots on Railway

Logs, metrics and traces. Boots first try, unlike every other listing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openobserve-or-just-updated-datadog-alte)

## About

OpenObserve is an open-source observability platform for logs, metrics and traces — a
self-hosted alternative to Datadog, Grafana Loki and Elasticsearch. It ingests OTLP,
Elasticsearch-compatible and plain JSON data, stores it as compressed Parquet, and ships
with a query UI, dashboards, alerts and an OpenAPI/MCP surface.

This template runs OpenObserve v0.92.2 in local mode as a single service on a persistent
volume: no external database, no object store, no cluster.

OpenObserve is a single Rust binary. In local mode it keeps its metadata in an embedded
SQLite store and its data as Parquet files on disk, so the only infrastructure it needs is
one container and one volume mounted at `/data`. It listens on a fixed port unless told
otherwise, it refuses to start without a valid root user, and it enforces a password policy
on that user at first boot — three details that decide whether a deploy works at all on a
platform that injects its own port and generates its own secrets.

This image handles all three: it binds whatever port Railway injects, it validates the root
credential before the server starts and fails with a readable message instead of a Rust
panic, and it re-applies the root password on every boot so a redeploy is a working
password reset.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openobserve | `ghcr.io/bon5co/openobserve-railway:v0.92.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ZO_ROOT_USER_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/openobserve-or-just-updated-datadog-alte)
