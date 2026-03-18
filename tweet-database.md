# Deploy Tweet Database on Railway

Deploy and Host Tweet Database with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tweet-database)

## About

**Tweet Database** is a lightweight service that stores, indexes, and queries tweets from exports, scrapes, or APIs. It enables developers to build applications on top of tweet archives—such as search engines, analytics dashboards, AI datasets, or personal archives—while exposing structured APIs for querying tweet content and metadata.

Hosting a Tweet Database involves running a backend service that ingests tweet data (from exports, scrapers, or APIs), normalizes it into a structured schema, and stores it in a queryable database. The service typically includes an API layer for retrieving tweets by user, keyword, timestamp, or engagement metrics.

When deployed on Railway, the service runs as a containerized application connected to a managed database. Railway handles infrastructure concerns such as environment configuration, scaling, networking, and persistent storage. This makes it easy to deploy tweet ingestion pipelines, background workers, and API servers without managing servers directly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/tweet-database)
