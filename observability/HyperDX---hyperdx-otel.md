# Deploy HyperDX on Railway

Search your app's logs, traces and metrics in one place

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hyperdx-otel)

## About

HyperDX is an open-source observability platform that puts logs, traces, metrics and browser session replay behind one search box. Built on ClickHouse and natively OpenTelemetry, it takes OTLP from any service without a vendor agent. Engineers use it the way they would use Datadog — search a log line, jump to the trace that produced it, watch the session that triggered it — on infrastructure they own. MIT licensed, developed by ClickHouse as ClickStack.

Self-host HyperDX on Railway and you get the production topology, not a demo container: the **hyperdx** app (API, UI and alert evaluator), an **otel-collector** terminating OTLP, a **ClickHouse** server holding every log, span and metric point on a volume, and a managed **MongoDB** for accounts and dashboards. Your services send telemetry to the collector over HTTP or gRPC, it writes into ClickHouse, and the app queries ClickHouse on demand. Only the UI and the ingest endpoint face the internet.

![Diagram of the HyperDX, collector, ClickHouse and MongoDB services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788302772/hyperdx-architecture.png)

Most observability tooling makes you pick a silo: one product for logs, another for traces, a third for front-end monitoring, and copy-pasting trace IDs between them. HyperDX keeps all of it in one ClickHouse database, linked by trace and session ID, so debugging is one continuous thread. Self-hosting matters because telemetry is the largest and most sensitive stream most teams produce, and its volume is what makes SaaS pricing painful. SigNoz is the closest open-source comparison; the Grafana stack has more components and more query languages.

Key features:

- Lucene and full-text log search with no index schema to define up front
- Distributed tracing with a span waterfall and correlated log lines
- OpenTelemetry metrics: gauges, sums, histograms, exponential histograms
- Browser session replay linked to backend traces from the same session
- Alerts on saved searches and chart thresholds, by webhook or Slack
- A chart builder that compiles to plain ClickHouse SQL

**ClickHouse** owns the volume at `/var/lib/clickhouse`, and the collector runs its schema migrations at boot so tables exist before the first byte arrives. **MongoDB** stores what people create — dashboards, saved searches, alert rules and sessions — which is why signing in survives a redeploy. The **otel-collector** is the only writer to ClickHouse, configured remotely by the app over OpAMP.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| clickhouse | [gridalpha/hyperdx-railway](https://github.com/gridalpha/hyperdx-railway) | Database |
| hyperdx | [gridalpha/hyperdx-railway](https://github.com/gridalpha/hyperdx-railway) | Web service |
| otel-collector | `clickhouse/clickstack-otel-collector:2.37.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role |
| `PORT` | clickhouse | 8123 | HTTP port, used by the health check |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Account the app and collector use |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Hashed into users.d at boot |
| `PORT` | hyperdx | 8000 | API port, used by the health check |
| `MONGO_URI` | hyperdx | - | Metadata database |
| `CLICKHOUSE_HOST` | hyperdx | - | Private ClickHouse hostname |
| `CLICKHOUSE_PORT` | hyperdx | 8123 | ClickHouse HTTP port |
| `CLICKHOUSE_USER` | hyperdx | (secret) | ClickHouse account |
| `HYPERDX_API_PORT` | hyperdx | 8000 | Express API listener |
| `HYPERDX_APP_PORT` | hyperdx | 8080 | Next.js UI listener, the public target port |
| `HYPERDX_LOG_LEVEL` | hyperdx | info | Application log verbosity |
| `CLICKHOUSE_PASSWORD` | hyperdx | (secret) | ClickHouse password |
| `USAGE_STATS_ENABLED` | hyperdx | false | Anonymous usage reporting off |
| `EXPRESS_SESSION_SECRET` | hyperdx | (secret) | Session cookie signing key |
| `PORT` | otel-collector | 13133 | Health check extension port |
| `CLICKHOUSE_USER` | otel-collector | (secret) | ClickHouse account |
| `OPAMP_SERVER_URL` | otel-collector | - | Managed config source |
| `HYPERDX_LOG_LEVEL` | otel-collector | info | Collector log verbosity |
| `CLICKHOUSE_ENDPOINT` | otel-collector | - | Native write endpoint |
| `CLICKHOUSE_PASSWORD` | otel-collector | (secret) | ClickHouse password |
| `HYPERDX_OTEL_EXPORTER_TABLES_TTL` | otel-collector | 720h | Telemetry retention, 30 days |
| `HYPERDX_OTEL_EXPORTER_CLICKHOUSE_DATABASE` | otel-collector | default | Target database |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'case "$CLICKHOUSE_ENDPOINT" in ""|tcp://:*) CLICKHOUSE_ENDPOINT="tcp://clickhouse.railway.internal:9000?dial_timeout=10s";; esac; case "$OPAMP_SERVER_URL" in ""|http://:*) OPAMP_SERVER_URL="http://hyperdx.railway.internal:4320";; esac; export CLICKHOUSE_ENDPOINT OPAMP_SERVER_URL; echo "collector: clickhouse=$CLICKHOUSE_ENDPOINT opamp=$OPAMP_SERVER_URL"; exec /entrypoint.sh /opampsupervisor'`
- **Healthcheck:** `/`
- **TCP Proxies:** 4317

**Category:** Observability · **Languages:** Shell, Dockerfile, Go Template

[View on Railway →](https://railway.com/deploy/hyperdx-otel)
