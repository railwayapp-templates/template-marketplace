# Deploy VictoriaMetrics observability on Railway

Persistent VictoriaMetrics and Grafana with protected metric APIs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/victoriametrics-observability)

## About

VictoriaMetrics observability combines a persistent VictoriaMetrics Community time-series database with Grafana and an authenticated public API gateway.

The template keeps VictoriaMetrics and Grafana private, stores each service on its own volume, provisions Grafana's data source, and exposes only selected read/write API routes through separate generated bearer tokens.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VictoriaMetrics | `victoriametrics/victoria-metrics:v1.148.0@sha256:407013e902f9a0ba1d4b2d4c077c47bbaf917c893c52ff39b19efe83a654afda` | Database |
| VictoriaMetrics Gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |
| VictoriaMetrics Grafana | `grafana/grafana:13.1.1@sha256:7cb8c64c4d57a57e734073f3cc94620adb24a0acb929bd80ba9f14017e3a975b` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | VictoriaMetrics | 8428 | Private VictoriaMetrics HTTP port. |
| `PORT` | VictoriaMetrics Gateway | 8080 | Public gateway port. |
| `GRAFANA_UPSTREAM` | VictoriaMetrics Gateway | - | Private Grafana origin. |
| `VICTORIAMETRICS_UPSTREAM` | VictoriaMetrics Gateway | - | Private VictoriaMetrics origin. |
| `VICTORIAMETRICS_READ_TOKEN` | VictoriaMetrics Gateway | (secret) | Generated bearer token for query endpoints. |
| `VICTORIAMETRICS_WRITE_TOKEN` | VictoriaMetrics Gateway | (secret) | Generated bearer token for ingestion endpoints. |
| `PORT` | VictoriaMetrics Grafana | 3000 | Private Grafana HTTP port. |
| `GF_SERVER_HTTP_PORT` | VictoriaMetrics Grafana | 3000 | Grafana listener port. |
| `VICTORIAMETRICS_URL` | VictoriaMetrics Grafana | - | Private data-source URL. |
| `GF_SECURITY_ADMIN_USER` | VictoriaMetrics Grafana | (secret) | Initial administrator username. |
| `GF_SECURITY_SECRET_KEY` | VictoriaMetrics Grafana | (secret) | Stable generated key for Grafana secrets. |
| `GF_USERS_ALLOW_SIGN_UP` | VictoriaMetrics Grafana | false | Disables public registration. |
| `GF_AUTH_ANONYMOUS_ENABLED` | VictoriaMetrics Grafana | false | Disables anonymous access. |
| `GRAFANA_DATASOURCE_CONFIG` | VictoriaMetrics Grafana | apiVersion: 1
datasources:
  - name: VictoriaMetrics
    uid: victoriametrics
    type: prometheus
    access: proxy
    url: __VICTORIAMETRICS_URL__
    isDefault: true
    editable: false
    jsonData:
      httpMethod: POST | Pinned provisioning document. |
| `GF_SECURITY_ADMIN_PASSWORD` | VictoriaMetrics Grafana | (secret) | Generated initial administrator password. |
| `GF_ANALYTICS_CHECK_FOR_UPDATES` | VictoriaMetrics Grafana | false | Disables update checks. |
| `GF_ANALYTICS_REPORTING_ENABLED` | VictoriaMetrics Grafana | false | Disables usage reporting. |
| `GF_PLUGINS_PREINSTALL_DISABLED` | VictoriaMetrics Grafana | true | Disables unrelated automatic plugin downloads. |
| `GF_PLUGINS_PREINSTALL_AUTO_UPDATE` | VictoriaMetrics Grafana | false | Disables automatic plugin updates. |

## Configuration

- **Start command:** `/victoria-metrics-prod -storageDataPath=/victoria-metrics-data -retentionPeriod=30d -httpListenAddr=:8428 -selfScrapeInterval=10s`
- **Healthcheck:** `/-/ready`
- **Volume:** `/victoria-metrics-data`
- **Start command:** `/bin/sh -ec 'printf '"'"':8080 {\n handle /healthz {\n  rewrite * /api/health\n  reverse_proxy %s\n }\n @write path /api/v1/write /api/v1/import/prometheus /opentelemetry/v1/metrics\n handle @write {\n  @unauthorized not header Authorization "Bearer %s"\n  respond @unauthorized 401\n  reverse_proxy %s\n }\n @read path /api/v1/query /api/v1/query_range\n handle @read {\n  @unauthorized not header Authorization "Bearer %s"\n  respond @unauthorized 401\n  reverse_proxy %s\n }\n handle {\n  reverse_proxy %s\n }\n}\n'"'"' "$GRAFANA_UPSTREAM" "$VICTORIAMETRICS_WRITE_TOKEN" "$VICTORIAMETRICS_UPSTREAM" "$VICTORIAMETRICS_READ_TOKEN" "$VICTORIAMETRICS_UPSTREAM" "$GRAFANA_UPSTREAM" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -ec 'printf "%s\n" "$GRAFANA_DATASOURCE_CONFIG" | sed "s|__VICTORIAMETRICS_URL__|$VICTORIAMETRICS_URL|g" > /etc/grafana/provisioning/datasources/victoriametrics.yaml; chown -R 472:0 /var/lib/grafana; exec su -s /bin/sh grafana -c /run.sh'`
- **Healthcheck:** `/api/health`
- **Volume:** `/var/lib/grafana`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/victoriametrics-observability)
