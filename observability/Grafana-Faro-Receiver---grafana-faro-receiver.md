# Deploy Grafana Faro Receiver on Railway

Ingest browser and mobile RUM into your OpenTelemetry pipeline.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-faro-receiver)

## About

Grafana Faro is the web SDK for frontend observability, capturing JavaScript exceptions, Core Web Vitals, user sessions, and browser traces. This template runs the receiver side: a Grafana Alloy service that accepts Faro's payloads over HTTP, normalizes them to OpenTelemetry, and forwards them to a collector or gateway you already operate.

Hosting the Faro receiver means running one stateless Alloy service with a public domain, since browsers post to it directly. Alloy is used rather than the OpenTelemetry Collector because the Faro Web SDK sends its own JSON payload, and `faro.receiver` is the only component that accepts it — no collector build can serve `/collect`.

On Railway the service needs no volume and no database. It exposes an API key check, a CORS allowlist, a payload cap, and per-app rate limiting on that public write path, then forwards everything upstream over OTLP with basic auth. Railway handles TLS, the domain, and lifecycle; you supply the upstream endpoint and credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Alloy | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /alloy/faro) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 12345 | Alloy's healthcheck port. |
| `VERSION` | v1.18.1 | Alloy image tag, passed as a build arg. |
| `FARO_API_KEY` | (secret) | Key browsers send as `x-api-key`. |
| `OTEL_UPSTREAM_PASSWORD` | (secret) | Password for that line. Must match the gateway's htpasswd. |
| `OTEL_UPSTREAM_USERNAME` | (secret) | Username for the gateway's htpasswd. Give Alloy its own line so it can be rotated alone. |
| `FARO_CORS_ALLOWED_ORIGINS` | localhost | Comma-separated frontend origins. Replaces the localhost fallback. |
| `FARO_ALLOW_UNAUTHENTICATED` | false | Set `true` instead to run an open endpoint. One of these two is required. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | - | The gateway to forward to. In the combined template, `http://opentelemetry-collector.railway.internal:4318`; in the standalone template, ask the user. |

## Configuration

- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/grafana-faro-receiver)
