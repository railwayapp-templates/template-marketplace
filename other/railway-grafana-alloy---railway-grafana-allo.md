# Deploy railway-grafana-alloy on Railway

Deploy and Host railway-grafana-alloy with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-grafana-allo)

## About

**railway-grafana-alloy** is a plug-and-play observability layer that forwards your app’s metrics and logs to **Grafana Cloud** using Grafana Alloy. With built-in HTTP receivers, it's perfect for quickly integrating Prometheus and Loki into your stack—without extra setup.

Hosting **railway-grafana-alloy** on Railway sets up Grafana Alloy as a lightweight telemetry gateway. It runs continuously, exposing HTTP endpoints to receive metrics (`:9091`) and logs (`:3100`), forwarding them securely to your Grafana Cloud account. This setup enables full observability for any service running on Railway (or externally) with minimal configuration. Alloy also collects basic system metrics by default, helping you monitor the Alloy instance itself. Environment variables are used to connect to Grafana Cloud, keeping your setup secure and flexible.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-grafana-alloy | [still-forest/railway-grafana-alloy](https://github.com/still-forest/railway-grafana-alloy) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LOKI_HOST` | https://logs-prod-XX-XX-X.grafana.net |
| `LOKI_PASSWORD` | (secret) |
| `LOKI_USERNAME` | (secret) |
| `GRAFANA_PROMETHEUS_HOST` | https://prometheus-prod-XX-XX-X.grafana.net |
| `GRAFANA_PROMETHEUS_PASSWORD` | (secret) |
| `GRAFANA_PROMETHEUS_USERNAME` | (secret) |

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/railway-grafana-allo)
