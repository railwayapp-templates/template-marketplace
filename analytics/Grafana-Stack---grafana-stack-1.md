# Deploy Grafana Stack on Railway

Deploy and Host Grafana Stack with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-stack-1)

## About

Grafana Stack is an integrated observability bundle: Grafana for dashboards and alerts, Prometheus for metrics, Loki for logs, and Alloy as a single OpenTelemetry collector. Applications send telemetry via OTLP to Alloy, which routes logs to Loki and metrics to Prometheus — all visualized in one Grafana instance.

Hosting Grafana Stack means running four coordinated services with persistent storage, private networking, and pre-wired datasource configuration. You deploy Grafana, Prometheus, Loki, and Alloy as separate Railway services, attach a volume to each so metrics and logs survive redeploys, and wire internal URLs so components communicate over Railway's private network. Alloy is the single ingest endpoint (OTLP on ports 4317/4318); Prometheus can also scrape `/metrics` endpoints directly. Grafana ships with Prometheus and Loki datasources already provisioned. You set admin credentials, reference sibling services via `${{service.RAILWAY_PRIVATE_DOMAIN}}`, and optionally pin Docker image versions per service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Grafana | [devlzcode/grafana-stack](https://github.com/devlzcode/grafana-stack) (root: /grafana) | Database |
| Loki | [devlzcode/grafana-stack](https://github.com/devlzcode/grafana-stack) (root: /loki) | Database |
| Alloy | [devlzcode/grafana-stack](https://github.com/devlzcode/grafana-stack) (root: /alloy) | Database |
| Prometheus | [devlzcode/grafana-stack](https://github.com/devlzcode/grafana-stack) (root: /prometheus) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GF_INSTALL_PLUGINS` | grafana-clock-panel |
| `GF_SECURITY_ADMIN_USER` | (secret) |
| `GF_DEFAULT_INSTANCE_NAME` | Grafana on Railway |
| `GF_SECURITY_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/grafana`
- **Volume:** `/loki`
- **Volume:** `/var/lib/alloy/data`
- **Volume:** `/prometheus`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/grafana-stack-1)
