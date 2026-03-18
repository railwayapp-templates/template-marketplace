# Deploy Redis Metrics Prometheus Exporter on Railway

A Prometheus exporter for gathering metrics about your Railway Redis DB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/73Vsr6)

## About

auto-magically expose metrics about your Railway MySQL database

This template will work immediately if your project already includes a Redis database. It will expose metrics formatted in the Prometheus-style. You can use this Prometheus template to scrape your Redis metrics and store them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis-metrics-collector | [zuchka/railway-redis-exporter](https://github.com/zuchka/railway-redis-exporter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9121 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/template/73Vsr6)
