# Deploy GrafanaAlloyRailway on Railway

Template for Grafana Alloy deployment on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafanaalloyrailway)

## About

Grafana Alloy is a lightweight telemetry collector that scrapes Prometheus metrics from your Railway services and forwards them to Grafana Cloud. Ship your metrics to Grafana Cloud without exposing your services to the public internet.

Grafana Alloy runs as a sidecar service inside your Railway project's private network. It scrapes your application's `/metrics` endpoint using Railway's internal DNS (`service-name.railway.internal`) and forwards the data to Grafana Cloud via remote write. Since everything happens over Railway's private network, your metrics endpoint never needs to be publicly exposed. All you need is a Grafana Cloud account and your API credentials to get started.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grafana-alloy-railway | [Shobhit-Nagpal/grafana-alloy-railway](https://github.com/Shobhit-Nagpal/grafana-alloy-railway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TARGET_URL` | your-api-service-name.railway.internal:8080 | Internal Railway URL of the service to scrape metrics from (e.g. my-api.railway.internal:8080) |
| `GRAFANA_CLOUD_URL` | <from grafana cloud> | Prometheus remote write endpoint from your Grafana Cloud stack |
| `GRAFANA_CLOUD_API_KEY` | (secret) | Access Policy token with metrics write permissions from Grafana Cloud |
| `GRAFANA_CLOUD_USERNAME` | (secret) | Numeric username from your Grafana Cloud Prometheus instance |

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/grafanaalloyrailway)
