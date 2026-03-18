# Deploy Prometheus Exporter on Railway

Monitor all your Railway services in Prometheus with zero configuration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prometheus-exporter)

## About

Monitor all your Railway services in Prometheus with zero configuration

This template deploys a custom Prometheus exporter for monitoring your Railway deployments. Export CPU usage, memory consumption, and network metrics from Railway services to Prometheus for simple Railway service monitoring with minimal setup.

The Prometheus Exporter makes it easy to monitor your Railway services using any Prometheus metric compatible ingest solution.

This exporter uses a pull-based model. When your Prometheus service periodically scrapes the `/metrics` endpoint provided by this service, the exporter fetches the latest metrics from Railway's API.

Metrics are enriched with labels including service name, environment, and project information, making it easy to filter and aggregate data across your Railway infrastructure.

### What is collected currently?

The exporter collects:

- raw metrics:
  - CPU usage
  - memory usage
  - network traffic
- derived metrics:
  - cpu utilization %
  - memory utilization %

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Prometheus Exporter | [MykalMachon/railway-prometheus-exporter](https://github.com/MykalMachon/railway-prometheus-exporter) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9090 | Default HTTP port for the service. |
| `DEBUG` | false | only turn on if you want verbose logs for this service |
| `ENVIRONMENT_TARGETS` | - | A comma separated list of the projects and environments you want metrics for. i.e: `project-id:environment-id` |

## Configuration

- **Healthcheck:** `/health`

**Category:** Observability · **Languages:** Go

[View on Railway →](https://railway.com/deploy/prometheus-exporter)
