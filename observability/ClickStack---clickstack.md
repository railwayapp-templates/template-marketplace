# Deploy ClickStack on Railway

HyperDX observability on ClickHouse: OpenTelemetry logs, traces, metrics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clickstack)

## About

ClickStack is ClickHouse's open source observability stack: ClickHouse stores the telemetry, an OpenTelemetry collector ingests it, and HyperDX is the interface for searching and charting logs, traces, metrics and session replays together. This template deploys all four services (ClickHouse, the collector, HyperDX and its MongoDB) with the connections, health checks and volumes already configured.

![HyperDX search view over logs and traces with a histogram of events](https://raw.githubusercontent.com/hyperdxio/hyperdx/main/.github/images/search_splash.png)

**ClickHouse** (`clickhouse/clickhouse-server:24`) keeps the data on a volume at `/var/lib/clickhouse`, with a generated password, a `railway` database, and both private and public connection URLs exposed as variables. **HyperDX** (`hyperdx/hyperdx:2`) serves the UI on a public domain with a health check on `/api/health`; it is preconfigured with the ClickHouse connection and the default log, trace, metric and session sources, so the first screen after signup already knows where the data is. **OTEL Collector** (`hyperdx/hyperdx-otel-collector:2`) exposes OTLP over HTTP on its own public domain and pulls its pipeline configuration from HyperDX over OpAMP on the private network. **MongoDB** (`mongo:7`) stores HyperDX's dashboards, alerts and users on a second volume.

On first visit, HyperDX asks you to create the first user, which becomes the team owner. The ingestion API key is in Team Settings; the collector only accepts data that carries it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | `clickhouse/clickhouse-server:24` | Database |
| OTEL Collector | `hyperdx/hyperdx-otel-collector:2` | Web service |
| HyperDX | `hyperdx/hyperdx:2` | Web service |
| MongoDB | `mongo:7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ClickHouse | 8123 | - |
| `PUBLIC_PORT` | ClickHouse | 443 | - |
| `CLICKHOUSE_DB` | ClickHouse | railway | - |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | - |
| `PORT` | OTEL Collector | 4318 | - |
| `HYPERDX_LOG_LEVEL` | OTEL Collector | info | - |
| `HOSTNAME` | HyperDX | 0.0.0.0 | - |
| `OPAMP_PORT` | HyperDX | 4320 | - |
| `DEFAULT_SOURCES` | HyperDX | [{"from":{"databaseName":"railway","tableName":"otel_logs"},"kind":"log","timestampValueExpression":"TimestampTime","name":"Logs","displayedTimestampValueExpression":"Timestamp","implicitColumnExpression":"Body","serviceNameExpression":"ServiceName","bodyExpression":"Body","eventAttributesExpression":"LogAttributes","resourceAttributesExpression":"ResourceAttributes","defaultTableSelectExpression":"Timestamp,ServiceName,SeverityText,Body","severityTextExpression":"SeverityText","traceIdExpression":"TraceId","spanIdExpression":"SpanId","connection":"Local ClickHouse","traceSourceId":"Traces","sessionSourceId":"Sessions","metricSourceId":"Metrics"},{"from":{"databaseName":"railway","tableName":"otel_traces"},"kind":"trace","timestampValueExpression":"Timestamp","name":"Traces","displayedTimestampValueExpression":"Timestamp","implicitColumnExpression":"SpanName","serviceNameExpression":"ServiceName","bodyExpression":"SpanName","eventAttributesExpression":"SpanAttributes","resourceAttributesExpression":"ResourceAttributes","defaultTableSelectExpression":"Timestamp,ServiceName,StatusCode,round(Duration\/1e6),SpanName","traceIdExpression":"TraceId","spanIdExpression":"SpanId","durationExpression":"Duration","durationPrecision":9,"parentSpanIdExpression":"ParentSpanId","spanNameExpression":"SpanName","spanKindExpression":"SpanKind","statusCodeExpression":"StatusCode","statusMessageExpression":"StatusMessage","connection":"Local ClickHouse","logSourceId":"Logs","sessionSourceId":"Sessions","metricSourceId":"Metrics"},{"from":{"databaseName":"railway","tableName":""},"kind":"metric","timestampValueExpression":"TimeUnix","name":"Metrics","resourceAttributesExpression":"ResourceAttributes","metricTables":{"gauge":"otel_metrics_gauge","histogram":"otel_metrics_histogram","sum":"otel_metrics_sum","_id":"682586a8b1f81924e628e808","id":"682586a8b1f81924e628e808"},"connection":"Local ClickHouse","logSourceId":"Logs","traceSourceId":"Traces","sessionSourceId":"Sessions"},{"from":{"databaseName":"railway","tableName":"hyperdx_sessions"},"kind":"session","timestampValueExpression":"TimestampTime","name":"Sessions","displayedTimestampValueExpression":"Timestamp","implicitColumnExpression":"Body","serviceNameExpression":"ServiceName","bodyExpression":"Body","eventAttributesExpression":"LogAttributes","resourceAttributesExpression":"ResourceAttributes","defaultTableSelectExpression":"Timestamp,ServiceName,SeverityText,Body","severityTextExpression":"SeverityText","traceIdExpression":"TraceId","spanIdExpression":"SpanId","connection":"Local ClickHouse","logSourceId":"Logs","traceSourceId":"Traces","metricSourceId":"Metrics"}] | - |
| `HYPERDX_API_KEY` | HyperDX | (secret) | - |
| `HYPERDX_API_PORT` | HyperDX | 8000 | - |
| `HYPERDX_APP_PORT` | HyperDX | 8080 | - |
| `HYPERDX_LOG_LEVEL` | HyperDX | info | - |
| `OTEL_SERVICE_NAME` | HyperDX | hdx-oss-app | - |
| `USAGE_STATS_ENABLED` | HyperDX | true | - |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/api/health`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/clickstack)
