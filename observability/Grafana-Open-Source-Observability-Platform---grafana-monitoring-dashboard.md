# Deploy Grafana | Open-Source Observability Platform on Railway

Self Host Grafana: Metrics, logs, traces from 100+ data sources

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-monitoring-dashboard)

## About

Deploy Grafana on Railway to get a self-hosted observability and data visualization platform running in minutes. 

Grafana connects to over 100 data sources — Prometheus, PostgreSQL, InfluxDB, Elasticsearch, CloudWatch, and more — turning raw metrics, logs, and traces into interactive dashboards and alerts. 

Self-host Grafana on Railway with persistent storage and automatic HTTPS, no infrastructure management required. This Railway template deploys Grafana OSS (v13.0.0) with a pre-configured volume for SQLite persistence, admin credentials, and a public domain with TLS termination.

Grafana is the open-source standard for observability visualization. Created by Grafana Labs and backed by 65,000+ GitHub stars, it provides a unified interface for querying and visualizing data from any source.

- **Multi-source dashboards** — query Prometheus, Loki, Tempo, PostgreSQL, MySQL, Elasticsearch, InfluxDB, CloudWatch, and 100+ plugins from a single pane
- **Alerting engine** — define alert rules with multi-condition evaluation, route notifications to Slack, PagerDuty, email, webhooks, and more
- **Explore mode** — ad-hoc query interface for logs, metrics, and traces without building dashboards first
- **Provisioning** — define dashboards, data sources, and alert rules as code via YAML files or the HTTP API
- **RBAC and teams** — role-based access control with organization, team, and folder-level permissions
- **Plugin ecosystem** — 200+ community and enterprise plugins for panels, data sources, and apps

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Grafana | `grafana/grafana:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | HTTP server listening port |
| `GF_SERVER_PROTOCOL` | http | Railway terminates TLS at edge |
| `GF_SERVER_ROOT_URL` | - | Public-facing Grafana URL |
| `GF_SECURITY_ADMIN_USER` | (secret) | Create Admin login username |
| `GF_USERS_ALLOW_SIGN_UP` | false | Disable public user registration |
| `GF_SECURITY_ADMIN_PASSWORD` | (secret) | Create Admin login password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/grafana`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/grafana-monitoring-dashboard)
