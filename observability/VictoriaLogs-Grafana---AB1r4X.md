# Deploy VictoriaLogs-Grafana on Railway

Bare bones Grafana provisioned with VictoriaLogs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/AB1r4X)

## About

### Overview

Bare bones template to set up a [Grafana](https://grafana.com/) instance provisioned with a [VictoriaLogs](https://docs.victoriametrics.com/victorialogs/) [data source](https://github.com/VictoriaMetrics/victorialogs-datasource). 

A basic starter for sending logs to VictoriaLogs (replace `[VICTORIALOGS_INSTANCE]` and `[BASE_64_AUTH]` with your actual instance url and base-64 encoded `username:password`):

```bash
curl --request POST \
  --url 'https://[VICTORIALOGS_INSTANCE]/insert/jsonline?_stream_fields=stream&amp;_time_field=date&amp;_msg_field=log.message' \
  --header 'Authorization: Basic [BASE_64_AUTH]' \
  --header 'Content-Type: application/stream+json' \
  --data '{ "log": { "level": "info", "message": "hello world" }, "date": "0", "stream": "stream1" }
{ "log": { "level": "error", "message": "oh no!" }, "date": "0", "stream": "stream1" }
{ "log": { "level": "info", "message": "hello world" }, "date": "0", "stream": "stream2" }'
```

Read more about VictoriaLogs data ingestion options [here](https://docs.victoriametrics.com/victorialogs/data-ingestion/).

### Documentation

The full list of CLI flags for VictoriaLogs can be found [here](https://docs.victoriametrics.com/victorialogs/#list-of-command-line-flags).

The provisioned Grafana configuration can be found [here](https://github.com/Battlesquid/railway-victorialogs-grafana).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VictoriaLogs | `victoriametrics/victoria-logs:latest` | Web service |
| Grafana | [Battlesquid/railway-victorialogs-grafana](https://github.com/Battlesquid/railway-victorialogs-grafana) (root: /grafana) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | VictoriaLogs | 9482 | The port your victorialogs instance will listen to |
| `VL_PASSWORD` | VictoriaLogs | (secret) | The password for your victorialogs instance |
| `VL_USERNAME` | VictoriaLogs | (secret) | The username for your victorialogs instance |
| `PORT` | Grafana | 3000 | Port used by the grafana instance. |
| `VL_PASSWORD` | Grafana | (secret) | - |
| `VL_USERNAME` | Grafana | (secret) | - |
| `GF_SECURITY_ADMIN_USER` | Grafana | (secret) | Username for your grafana instance. |
| `GF_DEFAULT_INSTANCE_NAME` | Grafana | - | The name of your grafana instance. |
| `GF_SECURITY_ADMIN_PASSWORD` | Grafana | (secret) | Password for your grafana instance. |

## Configuration

- **Start command:** `/bin/sh -c "exec /victoria-logs-prod -httpListenAddr 0.0.0.0:$PORT -httpAuth.username $VL_USERNAME -httpAuth.password $VL_PASSWORD -enableTCP6=true"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/victoria-logs-data`
- **Healthcheck:** `/api/health`
- **Volume:** `/grafana/data`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/AB1r4X)
