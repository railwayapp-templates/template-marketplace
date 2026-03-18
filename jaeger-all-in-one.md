# Deploy Jaeger All In One on Railway

Just one click to trace and monitor the lifecycle of your applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/jaeger-all-in-one)

## About

Just one click to trace and monitor the lifecycle of your applications. Jaeger All In One is a comprehensive, single-container distributed tracing platform that bundles the Jaeger UI, Collector, and Query service. It is designed to provide instant visibility into request flows across microservices with zero manual configuration.

Hosting Jaeger All In One on Railway provides a plug-and-play observability backend for your distributed systems. This deployment utilizes the official `jaegertracing/all-in-one` image, which is optimized for speed and efficiency by using in-memory storage. This means you don't need to provision or manage external databases like Cassandra or Elasticsearch for initial development or debugging. Railway handles the container orchestration and networking, exposing the necessary OTLP (OpenTelemetry) and HTTP ports automatically. It is the ideal solution for developers who need a reliable tracing environment that can be spun up or down instantly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jaeger | [codestorm-official/jaeger](https://github.com/codestorm-official/jaeger) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/jaeger-all-in-one)
