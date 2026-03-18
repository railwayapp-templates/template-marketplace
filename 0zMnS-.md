# Deploy Loki on Railway

Loki is a horizontally scalable, log aggregation system

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/0zMnS-)

## About

Loki is a horizontally scalable, multi-tenant log aggregation system created by Grafana Labs. It is designed for efficient and cost-effective log storage and retrieval and is often used alongside Grafana for visualization.

## Loki's Key Features
- Index-Free Logging: Unlike traditional logging systems like Elasticsearch, Loki does not index the contents of logs. Instead, it indexes only the metadata (labels), making it much cheaper and faster for ingestion.
- Label-Based Log Searching: Logs are identified using labels (like job, instance, namespace), making queries efficient without the complexity of full-text indexing.
- Integration with Prometheus: Loki follows a design philosophy similar to Prometheus, using labels and supporting queries via LogQL (similar to PromQL for metrics).
- Efficient Storage: Loki compresses logs and stores them in chunks, often using object storage like S3, GCS, or Azure Blob Storage to reduce costs.
- Multi-Tenant & Scalable: Loki supports multi-tenancy and horizontally scales, meaning it can handle large volumes of logs across distributed systems.

## Guides
- [Setup Loki with an open telemetry collector](https://grafana.com/docs/loki/latest/send-data/otel/)
- [Add Loki as a Grafana Data Source](https://grafana.com/docs/grafana/latest/datasources/loki/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Loki | [PostSuite/railway-loki](https://github.com/PostSuite/railway-loki) | Database |

## Configuration

- **Volume:** `/loki`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/0zMnS-)
