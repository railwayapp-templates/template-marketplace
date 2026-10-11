# Deploy VictoriaMetrics | (Just Updated) Prometheus Alternative, Login From Boot, Scrape From Env on Railway

VictoriaMetrics behind a login. Writes stop before the disk fills

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/victoriametrics-or-just-updated-promethe)

## About

VictoriaMetrics is a fast, resource-light time-series database that speaks the Prometheus query
language (PromQL/MetricsQL) and accepts Prometheus remote write, InfluxDB, Graphite and OpenTelemetry
data. Grafana, vmagent and most Prometheus tooling talk to it directly.

This template runs single-node VictoriaMetrics 1.153 from a thin wrapper around the official image:
the HTTP API and built-in UI on a Railway public domain, a Railway volume holding the data, and a
generated password in front of every route except `/health`.

- **It is behind a login from the first request.** A password is generated per deploy
  (`VM_PASSWORD`) and passed to VictoriaMetrics' own basic auth, so the query, import and
  admin APIs answer `401` without it. The container refuses to start if the password is missing.
- **Writes stop before the volume fills.** The entrypoint reads the real size of the volume at boot
  and sets `-storage.minFreeDiskSpaceBytes` to 10% of it, so a runaway ingest turns the database
  read-only instead of filling the disk to zero.
- **Scrape targets come from variables.** Set `SCRAPE_TARGETS` to a comma-separated list such as
  `api.railway.internal:3000,worker.railway.internal:9100` and redeploy; no config file to edit.
  For anything more elaborate, put a full scrape config in `VM_SCRAPE_CONFIG`.
- **Data survives redeploys.** The volume at `/victoria-metrics-data` is chowned at boot and the
  database runs as the unprivileged `nobody` user; samples written before a redeploy were read back
  after it.
- **Healthcheck on.** `/health` is the one open route, so Railway can tell a started container from
  a working one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| victoriametrics | `ghcr.io/bon5co/victoriametrics-railway:1.153.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `VM_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/victoria-metrics-data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/victoriametrics-or-just-updated-promethe)
