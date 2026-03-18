# Deploy OpenTelemetry-Jaeger on Railway

Opentelemetry with Jaeger

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/OocRiw)

## About

Deploy the OpenTelemetry Collector along with a set of backend services.

### Jaeger
Jaeger is a distributed tracing system. It receives data from the Otel Collector on port 4317 and 4318.

[Jaeger Documentation](https://www.jaegertracing.io/docs/1.55/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenTelemetry | [rudemex/railway-otel-jaeger](https://github.com/rudemex/railway-otel-jaeger) (branch: main) (root: OpenTelemetry) | Web service |
| Jaeger | `jaegertracing/all-in-one:latest` | Web service |
| Prometheus | [rudemex/railway-otel-jaeger](https://github.com/rudemex/railway-otel-jaeger) (branch: main) (root: Prometheus) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | OpenTelemetry | 4318 |
| `PORT` | Jaeger | 16686 |
| `COLLECTOR_OTLP_ENABLED` | Jaeger | true |
| `PORT` | Prometheus | 9090 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/OocRiw)
