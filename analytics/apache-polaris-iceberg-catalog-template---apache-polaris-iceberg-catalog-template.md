# Deploy apache polaris: iceberg catalog template on Railway

Self-hosted Apache Iceberg REST catalog powered by Apache Polaris 1.7.0

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-polaris-iceberg-catalog-template)

## About

A self-hosted Apache Iceberg REST catalog powered by Apache Polaris 1.7.0, with PostgreSQL persistence and S3-compatible storage. Includes a password-protected dashboard, namespace/table browsing, connection instructions, and automatic warehouse initialization.

This template provisions three resources: a catalog service built from the Dockerfile, a PostgreSQL database for catalog and authorization state, and a Railway Bucket for Iceberg metadata, manifests, and data files. The catalog service runs Polaris on loopback and a Python dashboard that proxies API requests. No volume is needed on the catalog service; PostgreSQL and the bucket persist all state.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| catalog | [impacte-tech/polaris-template](https://github.com/impacte-tech/polaris-template) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `TOKEN_SIGNING_KEY` | catalog | (secret) |
| `AWS_SECRET_ACCESS_KEY` | catalog | (secret) |
| `POLARIS_CLIENT_SECRET` | catalog | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/apache-polaris-iceberg-catalog-template)
