# Deploy Jaeger Tracing on Railway

Distributed tracing and observability, ready to deploy in just 1 click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jaeger-tracing)

## About

Jaeger Tracing is a distributed tracing platform for monitoring and troubleshooting transactions across microservices. This template deploys Jaeger in an all-in-one configuration, combining the Collector, Query service, and Jaeger UI in a single container so you can start receiving OpenTelemetry traces with minimal setup.

Hosting Jaeger Tracing on Railway provides a lightweight observability backend for development, testing, debugging, and smaller tracing environments.

This template uses the official `jaegertracing/all-in-one` image and receives traces through modern OpenTelemetry Protocol (OTLP) endpoints. Applications can send telemetry using OTLP over gRPC or HTTP, while the Jaeger UI provides a visual interface for searching traces, inspecting spans, analyzing latency, and understanding service dependencies.

The default deployment uses **in-memory trace storage**, so no external Cassandra, Elasticsearch, or OpenSearch database is required. This keeps the stack simple and resource-efficient, but trace data is cleared whenever the service restarts or redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jaeger | [codestorm-official/jaeger](https://github.com/codestorm-official/jaeger) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 16686 | Railway public HTTP port for the Jaeger UI |
| `SPAN_STORAGE_TYPE` | memory | Store traces in memory for lightweight deployments |
| `COLLECTOR_OTLP_ENABLED` | true | Enable OTLP trace ingestion |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/jaeger-tracing)
