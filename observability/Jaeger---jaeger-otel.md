# Deploy Jaeger on Railway

See where a request spent its time across all your services

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jaeger-otel)

## About

Jaeger is the CNCF-graduated distributed tracing platform that answers what a dashboard cannot: *where did this request actually spend its time?* Instrumented services emit OpenTelemetry spans, Jaeger stitches them into one trace, and the UI draws it as a timeline of every hop — the API gateway, the gRPC calls it fanned out, the database query underneath, and the span that returned the error.

Self-host Jaeger on Railway with a real production topology rather than the single-container demo. This template deploys Jaeger v2 split into its two documented roles — a **collector** that receives spans and a **query** service serving the UI and API — backed by a persistent **OpenSearch** index, fronted by a **Caddy gateway** supplying the HTTP basic authentication the UI ships without, and paired with an **index cleaner** that enforces a retention window. Applications send OTLP to the collector's authenticated endpoint; you read the results through the gateway.

![Jaeger collector, query and OpenSearch services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788313818/jaeger-architecture.png)

Jaeger solves the problem logs and metrics leave open: a slow or broken request crosses several services and no one service's telemetry explains it. A trace carries one identifier across every hop, so the timeline shows which call was slow, which failed, and what ran underneath. Teams self-host it to keep telemetry in-house, or because per-span SaaS pricing stops making sense at volume.

Key capabilities:

- **Trace search and timeline view** — filter by service, operation, tag, duration or error, then read the waterfall
- **Service Performance Monitoring** — latency percentiles and request and error rates per operation, derived from the spans
- **Trace comparison** — diff two traces structurally to see what changed
- **OpenTelemetry-native ingest** — OTLP over gRPC and HTTP
- **Remote sampling** and **trace archiving** — clients fetch their sampling rate from the collector; pinned traces outlive retention

The architecture separates the write path from the read path. `jaeger-collector` terminates OTLP, batches spans and writes them into OpenSearch; it is the only service your applications reach. `jaeger-query` reads the same indices to serve the UI and query API, and stays on the private network. `opensearch` is the trace store — a single node with a persistent volume and daily snapshots to a Railway object storage bucket. `gateway` supplies the authentication Jaeger lacks, and `jaeger-index-cleaner` deletes rotated span indices past the retention window.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jaeger-index-cleaner | [gridalpha/jaeger-railway](https://github.com/gridalpha/jaeger-railway) | Worker |
| jaeger-query | [gridalpha/jaeger-railway](https://github.com/gridalpha/jaeger-railway) | Worker |
| jaeger-collector | [gridalpha/jaeger-railway](https://github.com/gridalpha/jaeger-railway) | TCP service |
| gateway | [gridalpha/jaeger-railway](https://github.com/gridalpha/jaeger-railway) | Web service |
| opensearch | [gridalpha/opensearch-railway](https://github.com/gridalpha/opensearch-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OPENSEARCH_URL` | jaeger-index-cleaner | - | Private trace store address |
| `RETENTION_DAYS` | jaeger-index-cleaner | 7 | Days of span indices to keep |
| `OPENSEARCH_PASSWORD` | jaeger-index-cleaner | (secret) | Trace store password |
| `OPENSEARCH_USERNAME` | jaeger-index-cleaner | (secret) | Trace store account |
| `CLEANUP_INTERVAL_SECONDS` | jaeger-index-cleaner | 21600 | Seconds between retention passes |
| `PORT` | jaeger-query | 13133 | Health check port Railway probes |
| `OPENSEARCH_URL` | jaeger-query | - | Private trace store address |
| `JAEGER_LOG_LEVEL` | jaeger-query | info | Query service log verbosity |
| `OPENSEARCH_PASSWORD` | jaeger-query | (secret) | Trace store password |
| `OPENSEARCH_USERNAME` | jaeger-query | (secret) | Trace store account |
| `JAEGER_MAX_CLOCK_SKEW_ADJUST` | jaeger-query | 0s | Clock skew correction window |
| `PORT` | jaeger-collector | 13133 | Health check port Railway probes |
| `OTLP_PASSWORD` | jaeger-collector | (secret) | Password applications send with spans |
| `OTLP_USERNAME` | jaeger-collector | (secret) | Username applications send with spans |
| `OPENSEARCH_URL` | jaeger-collector | - | Private trace store address |
| `JAEGER_LOG_LEVEL` | jaeger-collector | info | Collector log verbosity |
| `OPENSEARCH_PASSWORD` | jaeger-collector | (secret) | Trace store password |
| `OPENSEARCH_USERNAME` | jaeger-collector | (secret) | Trace store account |
| `PORT` | gateway | 8080 | HTTP listener port |
| `JAEGER_UI_PASSWORD` | gateway | (secret) | Browser sign-in password |
| `JAEGER_UI_USERNAME` | gateway | (secret) | Browser sign-in username |
| `JAEGER_QUERY_UPSTREAM` | gateway | - | Private query service address |
| `SNAPSHOT_S3_BUCKET` | opensearch | - | Snapshot repository bucket |
| `SNAPSHOT_S3_REGION` | opensearch | - | Snapshot repository region |
| `SNAPSHOT_S3_ENDPOINT` | opensearch | - | Snapshot repository endpoint |
| `SNAPSHOT_S3_ACCESS_KEY_ID` | opensearch | - | Snapshot repository key id |
| `DASHBOARDS_SERVICE_PASSWORD` | opensearch | (secret) | Second internal user, first boot only |
| `DISABLE_INSTALL_DEMO_CONFIG` | opensearch | true | Blocks the published demo certificates |
| `SNAPSHOT_S3_SECRET_ACCESS_KEY` | opensearch | (secret) | Snapshot repository secret |
| `OPENSEARCH_INITIAL_ADMIN_PASSWORD` | opensearch | (secret) | Cluster admin password, first boot only |
| `DISABLE_PERFORMANCE_ANALYZER_AGENT_CLI` | opensearch | true | Disables the second JVM agent |

## Configuration

- **Start command:** `/cmd/jaeger/jaeger-linux --config /jaeger-railway/query.yaml`
- **Healthcheck:** `/status`
- **Start command:** `/cmd/jaeger/jaeger-linux --config /jaeger-railway/collector.yaml`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 4317
- **Healthcheck:** `/healthz`
- **Volume:** `/usr/share/opensearch/data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/jaeger-otel)
