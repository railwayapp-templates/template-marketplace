# Deploy StatView on Railway

Simple front-end for displaying graphs for stats stored in Prometheus.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/statview)

## About

StatView is a simple application for displaying graphs based on the metrics stored in your Prometheus server. Great for browsing and comparing without the complexity of Grafana.

This is a single container with a volume that stores the sqlite database of your saved views and dashboards. I recommend you do backups of the volume if you don't want to lose your setup.

It only reads from a single Prometheus endpoint URL, nothing fancy. If you want more than fancy, use Grafana.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| StatView | `ghcr.io/richard5mith/statview:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTH_TYPE` | none | none or github |
| `SECRET_KEY` | (secret) | Secret key for cookie signing |
| `PROMETHEUS_URL` | - | URL of your prometheus instance. |
| `GITHUB_CLIENT_ID` | - | From your GitHub OAuth app |
| `GUNICORN_WORKERS` | 2 | How many gunicorn workers to run. |
| `GITHUB_ALLOWED_ORG` | - | Limit to this org slug |
| `OAUTH_REDIRECT_URL` | - | Override callback URL |
| `PROMETHEUS_PASSWORD` | (secret) | Optional, if you use basic auth on prom server |
| `PROMETHEUS_USERNAME` | (secret) | Optional, if you use basic auth on prom server |
| `GITHUB_ALLOWED_USERS` | - | Limit to these github users (comma sep) |
| `GITHUB_CLIENT_SECRET` | (secret) | From your GitHub OAuth app |
| `LIVE_REFRESH_SECONDS` | 15 | Default live refresh time in seconds. |
| `SESSION_COOKIE_SECURE` | - | Set to true for HTTPS only cookies |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/statview)
