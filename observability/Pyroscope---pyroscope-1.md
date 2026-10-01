# Deploy Pyroscope on Railway

Deploy and Host Grafana Pyroscope for continuous profiling

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pyroscope-1)

## About

Grafana Pyroscope is a continuous profiling backend — the P in LGTMP. It stores CPU, memory and lock
profiles collected from running processes and renders them as flame graphs in Grafana, so you can see
which functions actually consume a service's time and allocations rather than inferring it from
traces and metrics.

Hosting Pyroscope means running one service in monolithic mode with a volume. A single port, 4040,
serves both the OTLP profiles ingest that an OpenTelemetry Collector writes to and the query API that
Grafana reads, so it needs no public domain — both sides reach it over Railway's private network.

The detail that matters is storage. Pyroscope 2.x runs two storage engines at once, and several of
its directories default to paths relative to the working directory, which on Railway means the
container filesystem rather than the volume. This template pins every one of them under the mount and
sets a retention period for each engine, so profiles survive a redeploy and stop growing without
bound.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pyroscope | [jratienza65/otel-lgtm-railway](https://github.com/jratienza65/otel-lgtm-railway) (root: /pyroscope) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4040 | Pyroscope's healthcheck port. |
| `VERSION` | 2.3.1 | Pyroscope image tag, passed as a build arg. |

## Configuration

- **Healthcheck:** `/ready`
- **Volume:** `/data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pyroscope-1)
