# Deploy Prometheus | (Just Updated) Metrics Behind A Login, Retention Capped To The Volume on Railway

Prometheus behind a login. Retention capped to your volume, targets via env

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prometheus-or-just-updated-metrics-behin)

## About

Prometheus is the standard open-source monitoring system and time-series database: it scrapes
metrics from your services over HTTP, stores them, and answers PromQL queries for dashboards and
alerts. Grafana, Alertmanager and most of the cloud-native ecosystem speak to it.

This template runs Prometheus 3.15 from a thin wrapper around the official image: the Prometheus
web UI and API on a Railway public domain, a Railway volume holding the time-series database, and a
generated password in front of all of it.

- **It is behind a login from the first request.** Prometheus has no authentication of its own, so
  the stock image on a public Railway domain hands the query API, the loaded config and every
  scrape target to anyone with the URL. Here a password is generated per deploy
  (`PROMETHEUS_PASSWORD`), turned into a bcrypt web config at boot, and every route, including the
  API, answers `401` without it. The container refuses to start if the password is missing.
- **Retention cannot fill your volume.** The stock image keeps 15 days with no size limit, and a
  busy target can fill the disk before the time limit arrives. The entrypoint reads the volume's
  real size at boot and sets `--storage.tsdb.retention.size` to 80% of it.
- **Scrape targets come from variables.** Set `SCRAPE_TARGETS` to a comma-separated list such as
  `api.railway.internal:3000,worker.railway.internal:9100` and redeploy; no config file to edit.
  For anything more elaborate, put a full `prometheus.yml` in `PROMETHEUS_CONFIG`.
- **Data survives redeploys.** The volume at `/prometheus` is chowned at boot and the database runs
  as the unprivileged `nobody` user; samples written before a redeploy were read back after it.
- **Remote write is on.** `/api/v1/write` accepts pushes from Grafana Alloy, Agent or another
  Prometheus, behind the same password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| prometheus | `ghcr.io/bon5co/prometheus-railway:3.15.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PROMETHEUS_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/prometheus`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/prometheus-or-just-updated-metrics-behin)
