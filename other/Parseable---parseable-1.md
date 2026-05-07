# Deploy Parseable on Railway

Unified observability platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/parseable-1)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/parseable)

[Parseable](https://parseable.com) is an open source telemetry data lake. Deploy it on [Railway](https://railway.com) in one click with S3-compatible object storage powered by Railway Buckets.

Parseable ingests logs, metrics, and traces via a simple REST API and stores them efficiently on S3-compatible object storage. With Parseable on Railway, you get a fully managed deployment with persistent storage, automatic health checks, and zero infrastructure setup. The platform supports standard ingestion protocols including OpenTelemetry, Fluent Bit, and direct HTTP, making it a drop-in backend for any observability pipeline.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Parseable | [parseablehq/parseable-railway-template](https://github.com/parseablehq/parseable-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | 8000 (aligns Railway routing/healthcheck with Parseable's listen port) |
| `P_S3_URL` | - | Bucket endpoint URL. |
| `P_PASSWORD` | (secret) | admin password |
| `P_USERNAME` | (secret) | admin username |
| `P_S3_BUCKET` | - | Bucket name |
| `P_S3_REGION` | - | Bucket region (give auto for auto detection) |
| `P_S3_ACCESS_KEY` | - | Bucket ACCESS_KEY_ID |
| `P_S3_SECRET_KEY` | (secret) | Bucket SECRET_ACCESS_KEY |

## Configuration

- **Start command:** `parseable s3-store`
- **Healthcheck:** `/api/v1/readiness`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/parseable-1)
