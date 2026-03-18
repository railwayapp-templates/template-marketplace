# Deploy ClickStack on Railway

A High-Performance OSS Observability Stack on ClickHouse

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/clickstack)

## About

![ClickStack main Dashboard with charts](https://clickhouse.com/uploads/hyperdx_landing_c7bdd6582c.png)

ClickStack is a high-performance, open-source observability platform built on ClickHouse that unifies logs, metrics, traces, and session replays in a single, blazing-fast solution.

ClickStack combines ClickHouse's columnar database engine with HyperDX's purpose-built UI and OpenTelemetry's data collection standards to deliver sub-second queries on petabytes of high-cardinality observability data. The platform features intuitive search capabilities, real-time alerting, and comprehensive dashboards while maintaining exceptional cost efficiency with up to 10-100x cost savings compared to traditional observability solutions.

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

[View on Railway →](https://railway.com/template/clickstack)
