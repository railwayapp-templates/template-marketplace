# Deploy intermodal on Railway

Your one stop shop for Railway logs and metrics.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/intermodal)

## About

intermodal is a single Go binary that turns Railway into a first-class observability source. It exports your services' platform metrics (CPU, memory, disk, network) in Prometheus format and streams their logs — deploy, HTTP/edge, and build — to Prometheus, Grafana Loki, or any OpenTelemetry collector. Railway ships neither a metrics endpoint nor a log drain; intermodal is both.

Hosting intermodal means running one lightweight service inside your Railway project. You give it a Railway API token and point it at your metrics and/or logs backends; it handles the rest. It discovers your services, polls Railway's GraphQL API for metrics on a background interval (staying within the API rate limit), and opens real-time GraphQL‑WS subscriptions for logs. Metrics are served at `/metrics` for scraping and/or pushed over OTLP; logs are normalized and fanned out to your sinks with batching, retries, and backpressure, so a slow sink never stalls collection. It's configured entirely through environment variables and runs as a singleton per project scope.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| intermodal | [jratienza65/intermodal](https://github.com/jratienza65/intermodal) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `INTERMODAL_SINKS` | otlp | Comma-separated sinks: "stdout", "loki", "otlp". |
| `INTERMODAL_HTTP_LOGS` | true | also stream edge/request logs (services with a domain) |
| `INTERMODAL_SERVICE_NAME` | intermodal | Identity used in reporting self metrics. |
| `INTERMODAL_OTLP_ENDPOINT` | - | Host:port or full http(s) URL. |
| `INTERMODAL_OTLP_INSECURE` | true | Set true for plain-http internal collectors. |
| `INTERMODAL_PROJECT_TOKEN` | (secret) | Project token (Project-Access-Token header). Scoped to a single environment. |
| `INTERMODAL_METRICS_EXPORTERS` | prometheus,otlp | Comma-separated: "prometheus" (pull) and/or "otlp" (push). |

**Category:** Observability · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/intermodal)
