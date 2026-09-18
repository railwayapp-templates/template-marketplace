# Deploy rootprint on Railway

Open-source, self-hosted log management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rootprint)

## About

Rootprint is an open-source, self-hosted observability platform for logs and traces. It provides OpenTelemetry-native ingestion, fast full-text log search, trace waterfalls, service health insights, team access controls, and object-storage-backed indexing powered by Quickwit—all without sending your telemetry to a hosted SaaS.

Hosting rootprint involves running the rootprint application together with PostgreSQL, Quickwit, and S3-compatible object storage. PostgreSQL stores application data such as users, API keys, configuration, and saved views, while Quickwit handles indexing and search for logs and traces. Object storage provides durable storage for Quickwit indexes and telemetry data. 

This Railway template comes ready to run with all required dependencies configured and connected, so you can deploy the complete rootprint stack without manually provisioning each service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Rootprint | `ghcr.io/rootprint/rootprint:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| quickwit | `quickwit/quickwit:v0.9.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ORIGIN` | Rootprint | - | your public URL |
| `DATABASE_URL` | Rootprint | - | PostgreSQL DB URL |
| `QUICKWIT_URL` | Rootprint | http://quickwit.railway.internal:7280 | Quickwit Service URL |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `AWS_REGION` | quickwit | - | s3 bucket region |
| `QW_S3_ENDPOINT` | quickwit | - | s3 bucket endpoint |
| `QW_METASTORE_URI` | quickwit | - | Quickwit metastore |
| `AWS_ACCESS_KEY_ID` | quickwit | - | s3 bucket credential |
| `AWS_SECRET_ACCESS_KEY` | quickwit | (secret) | s3 bucket credential |
| `QW_DEFAULT_INDEX_ROOT_URI` | quickwit | - | Quickwit Index data |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `quickwit run`
- **Volume:** `/quickwit/qwdata`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/rootprint)
