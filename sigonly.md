# Deploy SigOnly on Railway

Deploy SigNoz with a working demo app & config in one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/sigonly)

## About

**[SigNoz](https://signoz.io)** is an open-source observability platform that enables you to collect, store, and analyze distributed application **traces, metrics, and logs** using the OpenTelemetry standard.

When you deploy SigNoz on Railway, the following core services are provisioned:
- SigNoz
- SigNoz Otel Collector
- ClickHouse
- Zookeeper

The Railway template automatically sets up these services with the necessary environment variables, health checks, and persistent storage. This allows you to quickly go from deployment to creating dashboards. Simply point your application's OpenTelemetry SDK or agent to the provided ingest URL, and SigNoz will immediately begin visualizing service dependencies, latency, and errors.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | [ZoeyJones/signoz-railway-template](https://github.com/ZoeyJones/signoz-railway-template) (root: /clickhouse) | Database |
| signoz-otel-collector | [ZoeyJones/signoz-railway-template](https://github.com/ZoeyJones/signoz-railway-template) (root: /signoz) | Worker |
| signoz-sync-schema-migrator | `signoz/signoz-schema-migrator:v0.144.3-rc.1` | Worker |
| signoz-demo | [ZoeyJones/SigNozDemo](https://github.com/ZoeyJones/SigNozDemo) | Web service |
| signoz-async-schema-migrator | `signoz/signoz-schema-migrator:v0.144.3-rc.1` | Worker |
| zookeeper | `signoz/zookeeper:3.9.3` | Worker |
| signoz | [ZoeyJones/signoz-railway-template](https://github.com/ZoeyJones/signoz-railway-template) (root: /signoz) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | clickhouse | 8123 | HTTP port for ClickHouse health checks. |
| `zookeeper_depends` | clickhouse | - | Service dependency to ensure ZooKeeper starts before ClickHouse. |
| `CLICKHOUSE_SKIP_USER_SETUP` | clickhouse | 1 | Allow connections without authentication. |
| `signoz_dependency` | signoz-otel-collector | - | Service dependency to ensure SigNoz starts first. |
| `clickhouse_dependency` | signoz-otel-collector | - | Service dependency to ensure ClickHouse starts first. |
| `OTEL_RESOURCE_ATTRIBUTES` | signoz-otel-collector | host.name=signoz-host,os.type=linux | Resource attributes attached to all collected telemetry. |
| `schema-migrator-dependency` | signoz-otel-collector | - | Service dependency to ensure schema migrations complete first. |
| `LOW_CARDINAL_EXCEPTION_GROUPING` | signoz-otel-collector | false | Group low-cardinality exceptions for better trace aggregation. |
| `clickhouse_dependency` | signoz-sync-schema-migrator | - | Service dependency to ensure ClickHouse starts first. |
| `OTEL_SERVICE_NAME` | signoz-demo | SigNozDemo | Service name shown in SigNoz |
| `OTEL_LOGS_EXPORTER` | signoz-demo | otlp | Logs exporter type |
| `OTEL_TRACES_SAMPLER` | signoz-demo | parentbased_always_on | Trace sampling strategy |
| `OTEL_METRICS_EXPORTER` | signoz-demo | otlp | Metrics exporter type |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | signoz-demo | http://signoz-otel-collector.railway.internal:4317 | OTLP collector endpoint |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | signoz-demo | grpc | Transport protocol for OTLP exporter |
| `signoz-otel-collector-dependency` | signoz-demo | - | Service dependency to ensure signoz-otel-collector starts first. |
| `clickhouse_dependency` | signoz-async-schema-migrator | - | Service dependency to ensure ClickHouse starts first. |
| `ZOO_SERVER_ID` | zookeeper | 1 | Unique server ID for this ZooKeeper instance. |
| `ALLOW_ANONYMOUS_LOGIN` | zookeeper | (secret) | Allow connections without authentication. |
| `ZOO_AUTOPURGE_INTERVAL` | zookeeper | 1 | Hours between automatic purge of old snapshots and transaction logs. |
| `ZOO_ENABLE_PROMETHEUS_METRICS` | zookeeper | yes | Enable Prometheus metrics endpoint for monitoring. |
| `ZOO_PROMETHEUS_METRICS_PORT_NUMBER` | zookeeper | 9141 | Port for the Prometheus metrics endpoint. |
| `GODEBUG` | signoz | netdns=go | Use Go's built-in DNS resolver instead of cgo. |
| `DASHBOARDS_PATH` | signoz | /root/config/dashboards | Path to pre-configured dashboard JSON files. |
| `DOT_METRICS_ENABLED` | signoz | true | Enable internal dot metrics collection. |
| `clickhouse_dependency` | signoz | - | Service dependency to ensure ClickHouse starts first. |
| `SIGNOZ_ANALYTICS_ENABLED` | signoz | true | Enable SigNoz analytics reporting. Replaces deprecated TELEMETRY_ENABLED. |
| `schema-migrator-dependency` | signoz | - | Service dependency to ensure schema migrations complete first. |
| `SIGNOZ_SQLSTORE_SQLITE_PATH` | signoz | /var/lib/signoz/signoz.db | Path to SQLite database for SigNoz metadata. |
| `SIGNOZ_TOKENIZER_JWT_SECRET` | signoz | (secret) | Secret key for signing JWT tokens. Prevents token forgery. |
| `SIGNOZ_ALERTMANAGER_PROVIDER` | signoz | signoz | Alertmanager provider for alert routing. |
| `SIGNOZ_TELEMETRYSTORE_PROVIDER` | signoz | clickhouse | Backend storage provider for telemetry data. Replaces deprecated STORAGE. |
| `SIGNOZ_TELEMETRYSTORE_CLICKHOUSE_DSN` | signoz | tcp://clickhouse:9000 | ClickHouse connection string for telemetry data. |
| `SIGNOZ_ALERTMANAGER_SIGNOZ_GLOBAL_SMTP__FROM` | signoz | - | email address like abcd@gmail.com |
| `SIGNOZ_ALERTMANAGER_SIGNOZ_GLOBAL_SMTP__SMARTHOST` | signoz | - | example value: smtp-relay.brevo.com:587 |
| `SIGNOZ_ALERTMANAGER_SIGNOZ_GLOBAL_SMTP__REQUIRE__TLS` | signoz | - | example value:true |
| `SIGNOZ_ALERTMANAGER_SIGNOZ_GLOBAL_SMTP__AUTH__PASSWORD` | signoz | (secret) | your smtp password |
| `SIGNOZ_ALERTMANAGER_SIGNOZ_GLOBAL_SMTP__AUTH__USERNAME` | signoz | (secret) | your smtp username |

## Configuration

- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse/`
- **Start command:** `/signoz-otel-collector --config=/etc/otel-collector-config.yaml --manager-config=/etc/manager-config.yaml --copy-path=/var/tmp/collector-config.yaml`
- **Start command:** `/bin/sh -c "sleep 120 && exec ./signoz-schema-migrator sync --dsn=tcp://clickhouse.railway.internal:9000 --up="`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `./signoz-schema-migrator async --dsn=tcp://clickhouse.railway.internal:9000 --up=`
- **Healthcheck:** `/commands/ruok`
- **Start command:** `./signoz server`
- **Healthcheck:** `/api/v1/health`
- **Volume:** `/var/lib/signoz/`

**Category:** Observability · **Languages:** Kotlin

[View on Railway →](https://railway.com/template/sigonly)
