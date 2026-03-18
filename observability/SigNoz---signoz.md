# Deploy SigNoz on Railway

SigNoz is an single tool for APM, logs, traces, metrics & alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/signoz)

## About

**[SigNoz](https://signoz.io)** is an open-source observability platform that enables you to collect, store, and analyze distributed application **traces, metrics, and logs** using the OpenTelemetry standard.

When you deploy SigNoz on Railway, the following core services are provisioned:
- SigNoz
- SigNoz Otel Collector
- ClickHouse
- Zookeeper

The Railway template automatically sets up these services with the necessary environment variables, health checks, and persistent storage. This allows you to quickly go from deployment to creating dashboards. Simply point your application's OpenTelemetry SDK or agent to the provided ingest URL, and SigNoz will immediately begin visualising service dependencies, latency, and errors.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zookeeper | `signoz/zookeeper:3.7.1` | Worker |
| signoz-async-schema-migrator | `signoz/signoz-schema-migrator:v0.128.1-rc.1` | Worker |
| signoz | [signoz/signoz-railway-template](https://github.com/signoz/signoz-railway-template) (root: /signoz) | Web service |
| clickhouse | [signoz/signoz-railway-template](https://github.com/signoz/signoz-railway-template) (root: /clickhouse) | Database |
| signoz-sync-schema-migrator | `signoz/signoz-schema-migrator:v0.128.1-rc.1` | Worker |
| signoz-otel-collector | [signoz/signoz-railway-template](https://github.com/signoz/signoz-railway-template) (root: /signoz) | TCP service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ZOO_SERVER_ID` | zookeeper | 1 |
| `ALLOW_ANONYMOUS_LOGIN` | zookeeper | (secret) |
| `ZOO_AUTOPURGE_INTERVAL` | zookeeper | 1 |
| `ZOO_ENABLE_PROMETHEUS_METRICS` | zookeeper | yes |
| `ZOO_PROMETHEUS_METRICS_PORT_NUMBER` | zookeeper | 9141 |
| `GODEBUG` | signoz | netdns=go |
| `STORAGE` | signoz | clickhouse |
| `DASHBOARDS_PATH` | signoz | /root/config/dashboards |
| `TELEMETRY_ENABLED` | signoz | true |
| `DOT_METRICS_ENABLED` | signoz | true |
| `SIGNOZ_SQLSTORE_SQLITE_PATH` | signoz | /var/lib/signoz/signoz.db |
| `SIGNOZ_ALERTMANAGER_PROVIDER` | signoz | signoz |
| `SIGNOZ_TELEMETRYSTORE_CLICKHOUSE_DSN` | signoz | tcp://clickhouse:9000 |
| `PORT` | clickhouse | 8123 |
| `CLICKHOUSE_SKIP_USER_SETUP` | clickhouse | 1 |
| `OTEL_RESOURCE_ATTRIBUTES` | signoz-otel-collector | host.name=signoz-host,os.type=linux |
| `LOW_CARDINAL_EXCEPTION_GROUPING` | signoz-otel-collector | false |

## Configuration

- **Healthcheck:** `/commands/ruok`
- **Start command:** `./signoz-schema-migrator async --dsn=tcp://[clickhouse]:9000 --up=`
- **Start command:** `./signoz`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/signoz/`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse/`
- **Start command:** `/bin/sh -c "sleep 120 && exec ./signoz-schema-migrator sync --dsn=tcp://clickhouse.railway.internal:9000 --up="`
- **Start command:** `/signoz-otel-collector --config=/etc/otel-collector-config.yaml --manager-config=/etc/manager-config.yaml --copy-path=/var/tmp/collector-config.yaml --feature-gates=-pkg.translator.prometheus.NormalizeName`
- **TCP Proxies:** 4317

**Category:** Observability

[View on Railway →](https://railway.com/deploy/signoz)
