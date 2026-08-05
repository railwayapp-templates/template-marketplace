# Deploy OpenObserve — Self-Hosted Logs, Metrics & Traces on Railway

Self-host observability — logs, metrics & traces in one binary

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openobserve-observability)

## About

OpenObserve is the open-source alternative to Datadog, Splunk, and Elasticsearch — a Rust-native observability platform for logs, metrics, traces, and real user monitoring (RUM), behind a single binary and one web UI. Its Parquet columnar storage cuts telemetry storage cost by up to 140× versus ELK, and it needs no external database or search cluster. This template deploys it as a single service with a persistent volume, so you have a full observability stack on your own infrastructure in minutes.

---

OpenObserve's whole appeal is doing what a Datadog or ELK stack does without the operational weight — and this template keeps it that simple.

**One binary, no external dependencies.** In local mode, OpenObserve uses an embedded SQLite meta-store and local-disk Parquet storage — no Postgres, Elasticsearch, Redis, or S3 to provision. The single container is feature-complete for logs, metrics, traces, dashboards, alerts, and RUM. That's the point: full observability without running a complex stack. This template deploys exactly that, one service with `ZO_LOCAL_MODE=true`.

**Up to 140× lower storage cost than ELK.** OpenObserve stores telemetry as compressed Parquet columnar files instead of Elasticsearch's Lucene shards, which the makers measure at up to 140× lower storage cost. For high-volume logs and metrics, that's the difference between an affordable stack and a runaway Datadog or Splunk bill.

**The `/data` volume is your entire observability history — persist it.** Everything lives under `/data`: the SQLite metadata and all Parquet telemetry files. Without the mounted volume, every redeploy wipes your logs, metrics, and traces. This template mounts it so your history survives.

**Your admin account is created from environment variables.** Set `ZO_ROOT_USER_EMAIL` and `ZO_ROOT_USER_PASSWORD` before deploying, and OpenObserve creates the root user on first boot — no wizard. Open the web UI and log in with those credentials.

**This is single-node local mode.** Local mode is a complete, feature-rich observability platform ideal for one application, a small team, or a startup's whole stack. The distributed cluster mode (multiple node roles with Postgres and S3) is a separate, heavier deployment — out of scope here. For most self-hosters, single-node is exactly right.

**Send data via OpenTelemetry.** OpenObserve is OTel-native, so point your OpenTelemetry collectors, SDKs, or agents at its ingestion endpoint to stream logs, metrics, and traces. It also ingests from Fluent Bit and Vector.

Typical cost: **~$5–15/month** on Railway depending on ingestion volume and retention. OpenObserve is open source and free — versus Datadog and Splunk, which bill per GB ingested.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenObserve | `openobserve/openobserve:v0.80.3` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5080 | - |
| `ZO_DATA_DIR` | /data | - |
| `ZO_HTTP_PORT` | 5080 | - |
| `ZO_TELEMETRY` | false | - |
| `ZO_LOCAL_MODE` | true | - |
| `ZO_ROOT_USER_EMAIL` | - | Root login email (bootstrap) |
| `ZO_ROOT_USER_PASSWORD` | (secret) | Root login password (bootstrap-only) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/openobserve-observability)
