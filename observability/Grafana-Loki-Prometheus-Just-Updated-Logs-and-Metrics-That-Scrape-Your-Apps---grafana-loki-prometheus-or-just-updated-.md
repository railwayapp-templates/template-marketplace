# Deploy Grafana + Loki + Prometheus | (Just Updated) Logs and Metrics That Scrape Your Apps on Railway

Grafana + Loki + Prometheus that scrape your apps and expire old data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-loki-prometheus-or-just-updated-)

## About

Grafana is the open-source dashboard and exploration UI, Loki is Grafana Labs' log
aggregation system, and Prometheus is the de-facto open-source metrics database. Together
they are the standard self-hosted alternative to Datadog, New Relic and Grafana Cloud:
metrics scraped from your services, logs shipped from them, and one UI over both.

This template runs all three as a single Railway deploy — Grafana on your public domain,
Loki and Prometheus on the private network, each with its own volume — with both data
sources already wired up and Prometheus already scraping targets you name in a variable.

Each component is a single Go binary with a configuration file, which makes the stack easy
to run and easy to run badly. Three details decide whether the deploy is useful: Prometheus
only scrapes what its configuration file lists, so a stack shipped with the stock file
collects nothing but its own metrics; Loki deletes nothing unless a compactor is running in
retention mode, so its volume grows until writes fail; and Railway mounts volumes owned by
root while the upstream Grafana image runs as an unprivileged user, so a naive deploy either
crash-loops or has to run the whole dashboard as root.

This template handles all three. Prometheus reads its scrape targets from an environment
variable and writes its configuration at boot, Loki ships a compactor with retention
enabled and a configurable retention period, and Grafana repairs the ownership of its data
directory as root and then drops to its own uid before starting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grafana | `ghcr.io/bon5co/lgtm-railway-grafana:13.0.2` | Web service |
| loki | `ghcr.io/bon5co/lgtm-railway-loki:3.7.7` | Database |
| prometheus | `ghcr.io/bon5co/lgtm-railway-prometheus:v3.14.0` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GF_SECURITY_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/grafana`
- **Volume:** `/loki`
- **Volume:** `/prometheus`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/grafana-loki-prometheus-or-just-updated-)
