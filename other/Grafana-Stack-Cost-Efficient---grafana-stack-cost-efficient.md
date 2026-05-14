# Deploy Grafana Stack Cost Efficient on Railway

Grafana Stack with log retention management variables

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-stack-cost-efficient)

## About

Grafana Stack Cost Efficient is a one-click observability stack bundling Grafana, Loki, Prometheus, and Tempo. The services come pre-wired so dashboards, metrics, logs, and traces work out of the box, with configurable log retention via Loki's compactor to keep storage costs predictable on long-running deployments.

Hosting this stack on Railway provisions four interconnected services from a single repository: Grafana for visualization, Loki for log aggregation, Prometheus for metrics, and Tempo for distributed traces. Each service runs from its own Docker image with a pinnable `VERSION` variable, a dedicated persistent volume for data durability across redeploys, and a private domain for internal communication. Only Grafana is exposed publicly through Railway's HTTP proxy; the three backends stay on the private network. Cross-service references resolve automatically so Grafana's datasources connect without manual URL editing, and the Loki retention compactor enforces a configurable cleanup window so your log storage doesn't grow unbounded.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Loki | [AxelVincent/railway-grafana-stack-cost-efficient](https://github.com/AxelVincent/railway-grafana-stack-cost-efficient) (root: /loki) | Database |
| Tempo | [AxelVincent/railway-grafana-stack-cost-efficient](https://github.com/AxelVincent/railway-grafana-stack-cost-efficient) (root: /tempo) | Database |
| Grafana | [AxelVincent/railway-grafana-stack-cost-efficient](https://github.com/AxelVincent/railway-grafana-stack-cost-efficient) (root: /grafana) | Database |
| Prometheus | [AxelVincent/railway-grafana-stack-cost-efficient](https://github.com/AxelVincent/railway-grafana-stack-cost-efficient) (root: /prometheus) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `VERSION` | Loki | 3.4.2 |
| `LOKI_RETENTION_PERIOD` | Loki | 744h |
| `LOKI_RETENTION_ENABLED` | Loki | true |
| `VERSION` | Tempo | 2.9.0 |
| `GF_INSTALL_PLUGINS` | Grafana | grafana-simple-json-datasource,grafana-piechart-panel,grafana-worldmap-panel,grafana-clock-panel |
| `GF_SECURITY_ADMIN_USER` | Grafana | (secret) |
| `GF_DEFAULT_INSTANCE_NAME` | Grafana | Grafana on Railway |
| `GF_SECURITY_ADMIN_PASSWORD` | Grafana | (secret) |
| `VERSION` | Prometheus | v3.2.1 |

## Configuration

- **Volume:** `/loki`
- **Volume:** `/prometheus`
- **Volume:** `/var/lib/grafana/`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/grafana-stack-cost-efficient)
