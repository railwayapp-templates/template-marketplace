# Deploy Postgres Metrics Prometheus Exporter on Railway

A Prometheus exporter for gathering metrics about your Railway Postgres DB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gDzHrM)

## About

Automatically expose metrics about your Railway Postgres database.

This template uses the popular [Prometheus Community's Postgres Exporter](https://github.com/prometheus-community/postgres_exporter) under the hood. It includes all the environmental variables needed to automatically connect to a PostgreSQL database inside the same project.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-metrics-collector | [zuchka/railway-postgres-exporter/tree/main](https://github.com/zuchka/railway-postgres-exporter/tree/main) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9187 | default port for service |
| `DATA_SOURCE_NAME` | - | maps your datasource URL to the prometheus variable for target database |

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/gDzHrM)
