# Deploy Prometheus | Open Source Monitoring, Datadog Alternative on Railway on Railway

Self host Prometheus. Time-series metrics, alerting, PromQL & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prometheus)

## About

Prometheus is the de-facto open source monitoring system and time-series database — it scrapes metrics from your services, stores them locally with high compression, and lets you query and alert on them via PromQL. Self-host Prometheus on Railway to keep application, infrastructure, and Kubernetes metrics in your own environment without per-host SaaS fees.

The template wraps `prom/prometheus:v3.11.3` (custom Dockerfile at `praveen-ks-2001/prometheus-railway`) with bcrypt-hashed HTTP basic auth, an auto-generated default `prometheus.yml`, and a persistent `/prometheus` volume. Web UI, `/metrics`, `/api/v1/*`, and health endpoints are all protected — safe on the public internet.

Prometheus is a CNCF graduated project originally built at SoundCloud. It pulls metrics over HTTP from instrumented targets (apps, exporters, Kubernetes pods), stores them in a local TSDB, and exposes PromQL for ad-hoc analysis, dashboards, and alert evaluation.

Key features of self-hosted Prometheus on Railway:

- Pull-based scraping with service discovery (static, DNS, file_sd)
- PromQL — vectorised queries with rate, histogram, aggregation operators
- Built-in TSDB, ~1KB per active series
- Recording and alerting rules (Alertmanager-compatible)
- Toggleable remote-write receiver and admin API
- HTTP basic auth on every endpoint by default

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Prometheus | [praveen-ks-2001/prometheus-railway](https://github.com/praveen-ks-2001/prometheus-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9090 | HTTP listen port |
| `ADMIN_USER` | (secret) | Basic-auth username |
| `ADMIN_PASSWORD` | (secret) | Basic-auth password (bcrypt-hashed) |
| `PROMETHEUS_LOG_LEVEL` | info | Log verbosity level |
| `PROMETHEUS_CONFIG_B64` | - | Base64 prometheus.yml override |
| `PROMETHEUS_EXTERNAL_URL` | - | Advertised external URL |
| `PROMETHEUS_RETENTION_SIZE` | 0 | Max TSDB size (0=unlimited) |
| `PROMETHEUS_RETENTION_TIME` | 15d | TSDB retention window |
| `PROMETHEUS_SCRAPE_INTERVAL` | 15s | Default scrape interval |
| `PROMETHEUS_ENABLE_ADMIN_API` | false | Enable admin snapshot/delete API |
| `PROMETHEUS_EVALUATION_INTERVAL` | 15s | Default rule eval interval |
| `PROMETHEUS_ENABLE_REMOTE_WRITE_RECEIVER` | false | Accept remote_write pushes |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/prometheus`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/prometheus)
