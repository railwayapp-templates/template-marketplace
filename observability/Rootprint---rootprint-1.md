# Deploy Rootprint on Railway

Open-source logs and traces with full-text search on object-storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rootprint-1)

## About

Rootprint is an open-source, self-hosted logs and traces platform with full-text search on object-storage-backed indexes. It ingests OpenTelemetry data and gives your team a log explorer, trace waterfalls, a service health dashboard, and team access control, while every byte of telemetry stays inside your own Railway project. Apache-2.0 licensed.

![Rootprint log explorer](https://raw.githubusercontent.com/rootprint/rootprint/main/.github/assets/clean-explorer.png)

This template deploys four services. `rootprint` is the API and web UI on a public domain. `quickwit` is the search engine (Quickwit 0.9.0) that indexes and queries your telemetry. `Bucket` is Railway object storage where Quickwit writes every index and its metastore, so all indexed history lives in durable storage at $0.015 per GB-month with free egress. `Postgres` holds users, settings, saved views, and audit rows. On first boot `rootprint` runs its migrations and probes Quickwit before it starts listening. Open the public URL, create the first admin account, create an ingest key under **Settings → API keys**, and point your OpenTelemetry Collector at `/v1/logs` and `/v1/traces` with that key as a bearer token. A custom domain needs no variable changes because `ORIGIN` follows `RAILWAY_PUBLIC_DOMAIN`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| rootprint | `ghcr.io/rootprint/rootprint:latest` | Web service |
| quickwit | `quickwit/quickwit:v0.9.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | rootprint | 8282 | HTTP port the app listens on. Fixed at 8282 to match the public domain's target port. Leave as is. |
| `ORIGIN` | rootprint | - | Canonical public HTTPS URL of this instance, used for auth callbacks, invite links, CORS and cookies. Follows the generated Railway domain. Set it to your custom domain only if you add one. |
| `DATABASE_URL` | rootprint | - | PostgreSQL connection string. Prefilled from the bundled Postgres service. Only change it to point at an external database. |
| `QUICKWIT_URL` | rootprint | - | Quickwit REST endpoint over Railway's private network. Prefilled to the bundled quickwit service on port 7280. Leave as is. |
| `TRUST_PROXY_HOPS` | rootprint | 1 | Number of reverse proxies in front of the app that set X-Forwarded-For. Railway's edge proxy is one hop, so 1 makes rate limits key on the real client IP. Leave at 1. |
| `BETTER_AUTH_SECRET` | rootprint | (secret) | Random secret (at least 32 characters) that signs sessions and encrypts stored OAuth tokens. Generated once at deploy. Keep it stable; rotating it signs everyone out. |
| `AWS_REGION` | quickwit | - | Region string used to sign S3 requests. Prefilled from the bundled Railway bucket (auto). For external S3 set it to the bucket's real region, for example us-east-1. |
| `QW_S3_ENDPOINT` | quickwit | - | S3 API endpoint URL of the bucket, including https://. Prefilled from the bundled Railway bucket. Leave as is unless you point Quickwit at external S3. |
| `QW_METASTORE_URI` | quickwit | - | S3 URI for Quickwit's file-backed metastore, the catalog of indexes and splits. Prefilled to the metastore/ prefix of the bundled bucket. Must live in the same bucket as the index root. |
| `AWS_ACCESS_KEY_ID` | quickwit | - | Access key for the bucket. Prefilled from the bundled Railway bucket. |
| `AWS_SECRET_ACCESS_KEY` | quickwit | (secret) | Secret key for the bucket. Prefilled from the bundled Railway bucket. |
| `QW_DEFAULT_INDEX_ROOT_URI` | quickwit | - | S3 URI where Quickwit stores index data. Prefilled to the indexes/ prefix of the bundled bucket. Change only to use another bucket, and keep it in the same bucket as the metastore. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `quickwit run`
- **Volume:** `/quickwit/qwdata`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/rootprint-1)
