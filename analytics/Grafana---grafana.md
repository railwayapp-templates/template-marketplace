# Deploy Grafana on Railway

The open and composable observability and data visualisation platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana)

## About

*Railway template for **Grafana OSS**. Deploy steps, environment variables, and production notes: [README.md](README.md).*

The Grafana Template is a comprehensive starting point for creating a monitoring dashboard with Grafana. This template is specifically designed to help administrators visualise and analyse critical data related to infrastructure, operations and performance.

On Railway, Grafana runs in a **container** managed by this template. You reach the UI via your service URL; the server binds to the HTTP port Railway provides (`PORT`, mapped in the start command—see `railway.toml`). For persistence and security settings, follow the recommendations in the README (volumes, admin password, plugins).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grafana | [vergissberlin/railwayapp-grafana](https://github.com/vergissberlin/railwayapp-grafana) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Please don't change it! |
| `VERSION` | latest | Setup the Grafana version to your needs, or leave it as latest to get the latest version. |
| `GF_LOG_MODE` | console | How to log |
| `GF_INSTALL_PLUGINS` | grafana-piechart-panel,grafana-worldmap-panel,grafana-clock-panel,grafana-simple-json-datasource | Add more plugins to your wish. Take a look to https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/ |
| `GF_SECURITY_ADMIN_USER` | (secret) | Enter the name of your admin user |
| `GF_DEFAULT_INSTANCE_NAME` | - | Name your Grafana instance! |
| `GF_SECURITY_ADMIN_PASSWORD` | (secret) | Your secure password for the admin user |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/grafana)
