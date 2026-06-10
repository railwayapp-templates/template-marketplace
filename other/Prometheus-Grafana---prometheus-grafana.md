# Deploy Prometheus + Grafana on Railway

Deploy and Host Prometheus + Grafana with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prometheus-grafana)

## About

Open-source monitoring and visualization stack. Prometheus collects and stores metrics from your services, Grafana turns them into dashboards. Self-host both on Railway with zero config files — just set env vars and deploy.

This template deploys two pre-configured services: Prometheus for scraping and storing metrics, and Grafana for visualizing them. Both are wired together automatically on deploy via Railway's private network — no manual datasource setup needed. Prometheus self-scrapes out of the box so it's useful immediately. Add your own services to monitor by setting a single environment variable. All data persists across restarts via Railway volumes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grafana-railway | [pagetree/grafana-railway](https://github.com/pagetree/grafana-railway) | Worker |
| prometheus-railway | [pagetree/prometheus-railway](https://github.com/pagetree/prometheus-railway) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `GF_SECURITY_ADMIN_USER` | grafana-railway | (secret) |
| `GF_SECURITY_ADMIN_PASSWORD` | grafana-railway | (secret) |
| `RETENTION_TIME` | prometheus-railway | 15d |

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/prometheus-grafana)
