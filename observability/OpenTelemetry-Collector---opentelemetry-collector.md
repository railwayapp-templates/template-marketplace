# Deploy OpenTelemetry Collector on Railway

Deploy and Host an OpenTelemetry Collector node

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opentelemetry-collector)

## About

The **OpenTelemetry (OTel) Collector** is a vendor-agnostic way to receive, process, and export telemetry data. It acts as a central proxy for your observability pipeline, allowing you to shift the burden of data delivery away from your applications. By using a standalone collector, you can aggregate logs, metrics, and traces from multiple sources and reliably send them to an external OTLP-compatible backend.

Hosting a standalone OpenTelemetry Collector on Railway allows you to create a high-performance telemetry gateway with zero infrastructure overhead. This template deploys the collector pre-configured with an **external OTLP HTTP exporter**, enabling you to route data from your Railway services (or external apps) to any third-party observability platform or a remote LGTM stack.

Railway simplifies the deployment by managing service discovery and environment variables. Once deployed, your collector provides a stable internal endpoint for your other services, ensuring that telemetry data is buffered and retried even if your downstream provider experiences downtime.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenTelemetry Collector | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /otelcol/agent) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 13133 | OpenTelemetry Collector's healthcheck port. |
| `VERSION` | 0.139.0 | OpenTelemetry Collector image tag, passed as a build arg. |

## Configuration

- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opentelemetry-collector)
