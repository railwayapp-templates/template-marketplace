# Deploy OpenTelemetry Collector and Backend on Railway

OpenTelemetry Collector with Backend Stack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/7KNDff)

## About

Deploy the OpenTelemetry Collector along with a set of backend services.

Checkout the [Railway tutorial](https://docs.railway.app/tutorials/deploy-an-otel-collector-stack) for more information.

### OpenTelemetry Collector

The collector is a vendor-agnostic way to receive, process and export telemetry data.  

It is deployed with a [configuration file](https://github.com/railwayapp-templates/opentelemetry-collector-stack/blob/main/otel-collector-config.yaml) that enables it to send data to the complementary backend services.

The zpages extension is enabled, allowing you to connect to the debug UI from your browser.  More information on the extension can be found [here](https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/zpagesextension/README.md).

#### Documentation

- [Collector Documentation](https://opentelemetry.io/docs/)
- [Configuration File Documentation](https://opentelemetry.io/docs/collector/configuration/)

Port map for reference:

    - "1888"   # pprof extension
    - "8888"   # Prometheus metrics exposed by the collector
    - "8889"   # Prometheus exporter metrics
    - "13133" # health_check extension
    - "4317"   # OTLP gRPC receiver
    - "4318"   # OTLP HTTP receiver
    - "55679" # zpages extension

### Zipkin

Zipkin is a distributed tracing system.  It receives data from the Otel Collector on port 9411.
- [Zipkin Documentation](https://zipkin.io/)

### Jaeger

Jaeger is a distributed tracing system.  It receives data from the Otel Collector on port 4317.
- [Jaeger Documentation](https://www.jaegertracing.io/docs/1.55/)

### Prometheus

Prometheus is a systems monitoring and alerting toolkit.  It receives data from the Otel Collector on port 8889.
- [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Zipkin | `openzipkin/zipkin` | Web service |
| Prometheus | [zuchka/railway-prometheus](https://github.com/zuchka/railway-prometheus) | Web service |
| Jaeger | `jaegertracing/all-in-one` | Web service |
| Otel Collector | [railwayapp-templates/opentelemetry-collector-stack](https://github.com/railwayapp-templates/opentelemetry-collector-stack) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Zipkin | 9411 |
| `PORT` | Prometheus | 9090 |
| `PORT` | Jaeger | 16686 |
| `PORT` | Otel Collector | 55679 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/7KNDff)
