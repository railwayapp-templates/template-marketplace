# Deploy ClickStack on Railway

Open source observability for OpenTelemetry at scale

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clickstack-1)

## About

ClickStack is a high-performance, open-source observability platform built on ClickHouse that unifies logs, metrics, traces, and session replays in one solution. Powered by the HyperDX UI and OpenTelemetry-native ingestion, it delivers sub-second queries on high-cardinality data at a fraction of the cost of proprietary alternatives.

The Railway template deploys four pre-configured services in a single click: ClickHouse (columnar data store), HyperDX (observability UI), an OpenTelemetry Collector (ingestion gateway), and MongoDB (application state for dashboards, alerts, and user config). Environment variables, health checks, networking, and persistent volumes are wired together automatically — no Docker Compose wrangling or manual schema creation required. Once deployed, the HyperDX web interface is publicly exposed so you can immediately start ingesting OTLP data over gRPC (4317) or HTTP (4318) and exploring correlated telemetry. Railway handles vertical scaling as your data volume grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClickHouse | `clickhouse/clickhouse-server` | Database |
| HyperDX OTEL Collector | `hyperdx/hyperdx-otel-collector` | Worker |
| hyperdx/hyperdx | `hyperdx/hyperdx` | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ClickHouse | 8123 | - |
| `PUBLIC_PORT` | ClickHouse | 443 | - |
| `CLICKHOUSE_DB` | ClickHouse | default | - |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | - |
| `PORT` | HyperDX OTEL Collector | 4318 | - |
| `CLICKHOUSE_USER` | HyperDX OTEL Collector | (secret) | - |
| `HYPERDX_LOG_LEVEL` | HyperDX OTEL Collector | info | - |
| `CLICKHOUSE_PASSWORD` | HyperDX OTEL Collector | (secret) | - |
| `HOSTNAME` | hyperdx/hyperdx | 0.0.0.0 | - |
| `OPAMP_PORT` | hyperdx/hyperdx | 4320 | - |
| `DEFAULT_SOURCES` | hyperdx/hyperdx | [{"from":{"databaseName":"railway","tableName":"otel_logs"},"kind":"log","timestampValueExpression":"TimestampTime","name":"Logs","displayedTimestampValueExpression":"Timestamp","implicitColumnExpression":"Body","serviceNameExpression":"ServiceName","bodyExpression":"Body","eventAttributesExpression":"LogAttributes","resourceAttributesExpression":"ResourceAttributes","defaultTableSelectExpression":"Timestamp,ServiceName,SeverityText,Body","severityTextExpression":"SeverityText","traceIdExpression":"TraceId","spanIdExpression":"SpanId","connection":"Local ClickHouse","traceSourceId":"Traces","sessionSourceId":"Sessions","metricSourceId":"Metrics"},{"from":{"databaseName":"railway","tableName":"otel_traces"},"kind":"trace","timestampValueExpression":"Timestamp","name":"Traces","displayedTimestampValueExpression":"Timestamp","implicitColumnExpression":"SpanName","serviceNameExpression":"ServiceName","bodyExpression":"SpanName","eventAttributesExpression":"SpanAttributes","resourceAttributesExpression":"ResourceAttributes","defaultTableSelectExpression":"Timestamp,ServiceName,StatusCode,round(Duration\/1e6),SpanName","traceIdExpression":"TraceId","spanIdExpression":"SpanId","durationExpression":"Duration","durationPrecision":9,"parentSpanIdExpression":"ParentSpanId","spanNameExpression":"SpanName","spanKindExpression":"SpanKind","statusCodeExpression":"StatusCode","statusMessageExpression":"StatusMessage","connection":"Local ClickHouse","logSourceId":"Logs","sessionSourceId":"Sessions","metricSourceId":"Metrics"},{"from":{"databaseName":"railway","tableName":""},"kind":"metric","timestampValueExpression":"TimeUnix","name":"Metrics","resourceAttributesExpression":"ResourceAttributes","metricTables":{"gauge":"otel_metrics_gauge","histogram":"otel_metrics_histogram","sum":"otel_metrics_sum","_id":"682586a8b1f81924e628e808","id":"682586a8b1f81924e628e808"},"connection":"Local ClickHouse","logSourceId":"Logs","traceSourceId":"Traces","sessionSourceId":"Sessions"},{"from":{"databaseName":"railway","tableName":"hyperdx_sessions"},"kind":"session","timestampValueExpression":"TimestampTime","name":"Sessions","displayedTimestampValueExpression":"Timestamp","implicitColumnExpression":"Body","serviceNameExpression":"ServiceName","bodyExpression":"Body","eventAttributesExpression":"LogAttributes","resourceAttributesExpression":"ResourceAttributes","defaultTableSelectExpression":"Timestamp,ServiceName,SeverityText,Body","severityTextExpression":"SeverityText","traceIdExpression":"TraceId","spanIdExpression":"SpanId","connection":"Local ClickHouse","logSourceId":"Logs","traceSourceId":"Traces","metricSourceId":"Metrics"}] | - |
| `HYPERDX_API_KEY` | hyperdx/hyperdx | (secret) | - |
| `HYPERDX_API_PORT` | hyperdx/hyperdx | 8000 | - |
| `HYPERDX_APP_PORT` | hyperdx/hyperdx | 8080 | - |
| `HYPERDX_LOG_LEVEL` | hyperdx/hyperdx | info | - |
| `OTEL_SERVICE_NAME` | hyperdx/hyperdx | hdx-oss-app | - |
| `USAGE_STATS_ENABLED` | hyperdx/hyperdx | true | - |
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
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/clickstack-1)
