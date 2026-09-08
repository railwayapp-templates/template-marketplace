# Deploy Prometheus on Railway

Metrics database that scrapes, stores and alerts on time series

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prometheus-stack)

## About

Prometheus is the metrics database most of the cloud-native world runs on. It pulls numeric time series from HTTP endpoints your services already expose, stores them in its own compressed on-disk database, and lets you query them in PromQL — the language behind almost every Grafana dashboard you have seen. It is a graduated CNCF project, Apache-2.0 licensed, and the reason "just expose `/metrics`" became a convention.

Deploy Prometheus on Railway and you get three services rather than one. `prometheus` scrapes and stores metrics and evaluates alerting rules. `alertmanager` receives the alerts it fires, groups and deduplicates them, and delivers them to Slack, email or a webhook. `blackbox-exporter` probes URLs from outside, so you can watch endpoints that expose no metrics. Both `prometheus` and `alertmanager` are published behind HTTP basic authentication and keep their data on a Railway volume; `blackbox-exporter` stays private.

![Diagram of the Prometheus, Alertmanager and Blackbox exporter services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788731498/prometheus-architecture.png)

Prometheus is a single Go binary with an embedded time-series database. It scrapes rather than receives: you tell it where the endpoints are and it fetches them on an interval, so a service that crashes stops answering and Prometheus notices at once. Self-hosting keeps every metric in your own infrastructure, with no per-host or per-metric billing.

Key features:

- **PromQL**, a query language for time series, with rate, histogram and aggregation functions
- **Pull-based scraping** over plain HTTP: instrumenting a service means exposing one endpoint
- **Alerting rules** evaluated continuously against the same data you graph
- **A local TSDB** with configurable time- and size-based retention
- **Client libraries** for Go, Python, Java, Ruby, Rust and Node.js
- **Grafana as a first-class consumer** — Prometheus is its most common data source

The three services split the job the way the upstream project intends. Prometheus owns collection, storage and rule evaluation. Alertmanager owns what happens after an alert fires: grouping, silencing, inhibition and routing. The blackbox exporter owns probing — it turns "can this URL be reached, and is its certificate valid?" into metrics Prometheus scrapes like any other target.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| alertmanager | [gridalpha/prometheus-railway](https://github.com/gridalpha/prometheus-railway) | Web service |
| blackbox-exporter | [gridalpha/prometheus-railway](https://github.com/gridalpha/prometheus-railway) | Worker |
| prometheus | [gridalpha/prometheus-railway](https://github.com/gridalpha/prometheus-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | alertmanager | 8080 | Gateway port Railway probes and routes |
| `GROUP_BY` | alertmanager | alertname,job | Labels alerts are grouped by |
| `GROUP_WAIT` | alertmanager | 30s | Wait before sending a new group |
| `EXTERNAL_URL` | alertmanager | - | Public URL used in notification links |
| `AUTH_PASSWORD` | alertmanager | (secret) | Basic-auth password, required |
| `AUTH_USERNAME` | alertmanager | (secret) | Basic-auth user for the Alertmanager UI |
| `GROUP_INTERVAL` | alertmanager | 5m | Wait before adding to a sent group |
| `REPEAT_INTERVAL` | alertmanager | 4h | How often unresolved alerts resend |
| `PORT` | blackbox-exporter | 9115 | Listening port Railway probes |
| `PORT` | prometheus | 8080 | Gateway port Railway probes and routes |
| `EXTERNAL_URL` | prometheus | - | Public URL used in alert links |
| `PROBE_MODULE` | prometheus | http_2xx | Blackbox module; http_2xx_internal for private hosts |
| `AUTH_PASSWORD` | prometheus | (secret) | Basic-auth password, required |
| `AUTH_USERNAME` | prometheus | (secret) | Basic-auth user for UI and API |
| `BLACKBOX_HOST` | prometheus | - | Prober used by PROBE_TARGETS |
| `PROBE_TARGETS` | prometheus | - | URLs probed via blackbox |
| `RETENTION_SIZE` | prometheus | 4GB | Size cap, kept under the volume |
| `RETENTION_TIME` | prometheus | 15d | How long samples are kept |
| `SCRAPE_TIMEOUT` | prometheus | 10s | Per-scrape timeout |
| `SCRAPE_INTERVAL` | prometheus | 15s | Scrape and rule evaluation interval |
| `ALERTMANAGER_HOST` | prometheus | - | Where alerts are sent |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/alertmanager`
- **Healthcheck:** `/`
- **Volume:** `/prometheus`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/prometheus-stack)
