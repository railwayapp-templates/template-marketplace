# Deploy Parseable Distributed on Railway

Unified observability platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/parseable-distributed)

## About

[Parseable](https://parseable.com) is an open source telemetry data lake. This template deploys Parseable in **distributed mode** on [Railway](https://railway.com) with one query node and one ingest node, backed by a shared Railway Bucket (S3-compatible object storage) and persistent volumes for each node's staging directory.

For the simpler single-node deployment, see the [standalone template](https://railway.com/deploy/parseable-1).

Parseable ingests logs, metrics, and traces via a simple REST API and stores them efficiently on S3-compatible object storage. In **distributed mode**, the ingestion path and query path run as separate services, so each can be scaled and operated independently. With distributed Parseable on Railway, you get a fully managed cluster with shared persistent storage, automatic health checks, public HTTPS endpoints for both nodes, and zero infrastructure setup. The platform supports standard ingestion protocols including OpenTelemetry, Fluent Bit, and direct HTTP, making it a production-ready backend for any observability pipeline.

Distributed mode separates the two paths:

- **Ingest nodes** receive incoming events from log shippers (Fluent Bit, OpenTelemetry Collector, direct HTTP) and write them to object storage.
- **Query nodes** serve the UI, the SQL API, and read events back from object storage.

Both nodes share the same Bucket and the same admin credentials. The query node discovers active ingestors through a manifest in the Bucket, where each ingestor registers its `P_INGESTOR_ENDPOINT`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| parseable-query | [parseablehq/parseable-railway-template-distributed](https://github.com/parseablehq/parseable-railway-template-distributed) | Web service |
| parseable-ingest | [parseablehq/parseable-railway-template-distributed](https://github.com/parseablehq/parseable-railway-template-distributed) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | parseable-query | 8000 | 8000 (aligns Railway routing/healthcheck with Parseable's listen port) |
| `P_MODE` | parseable-query | query | Parseable node type |
| `P_S3_URL` | parseable-query | - | Bucket endpoint URL. |
| `P_PASSWORD` | parseable-query | (secret) | admin password |
| `P_USERNAME` | parseable-query | (secret) | admin username |
| `P_S3_BUCKET` | parseable-query | - | Bucket name |
| `P_S3_REGION` | parseable-query | - | Bucket region (give auto for auto detection) |
| `P_S3_ACCESS_KEY` | parseable-query | - | Bucket ACCESS_KEY_ID |
| `P_S3_SECRET_KEY` | parseable-query | (secret) | Bucket SECRET_ACCESS_KEY |
| `PORT` | parseable-ingest | 8000 | 8000 (aligns Railway routing/healthcheck with Parseable's listen port) |
| `P_MODE` | parseable-ingest | ingest | Parseable node type |
| `P_S3_URL` | parseable-ingest | - | Bucket endpoint URL. |
| `P_PASSWORD` | parseable-ingest | (secret) | admin password |
| `P_USERNAME` | parseable-ingest | (secret) | admin username |
| `P_S3_BUCKET` | parseable-ingest | - | Bucket name |
| `P_S3_REGION` | parseable-ingest | - | Bucket region (give auto for auto detection) |
| `P_S3_ACCESS_KEY` | parseable-ingest | - | Bucket ACCESS_KEY_ID |
| `P_S3_SECRET_KEY` | parseable-ingest | (secret) | Bucket SECRET_ACCESS_KEY |

## Configuration

- **Start command:** `parseable s3-store`
- **Healthcheck:** `/api/v1/liveness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/staging`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/parseable-distributed)
