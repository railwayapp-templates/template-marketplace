# Deploy utopia on Railway

World's first open-source enterprise world model.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/utopia)

## About

Utopia is an open-source enterprise knowledge world model for building governed, time-aware organizational intelligence. It combines an ontology-driven graph, hybrid full-text and vector search, document ingestion, temporal reasoning, conflict detection, auditability, and an integrated web console in one deployable service backed by PostgreSQL with pgvector.

Railway runs the Utopia web service from its published GHCR container image and provisions a PostgreSQL pgvector container alongside it. Private service networking connects the application to the database, while Railway provides HTTPS domain routing, managed deployments, logs, and restart policies.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| utopia | `ghcr.io/deeplethe/utopia:0.1.0` | Web service |
| utopia-db | `pgvector/pgvector:pg16` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | utopia | 1516 |
| `UTOPIA_DATA_DIR` | utopia | /app/data |
| `UTOPIA_WEB_DIST` | utopia | /app/web-dist |
| `UTOPIA_BIND_ADDR` | utopia | 0.0.0.0:1516 |
| `UTOPIA_JWT_SECRET` | utopia | (secret) |
| `UTOPIA_DB_MAX_CONNECTIONS` | utopia | 32 |
| `POSTGRES_DB` | utopia-db | utopia |
| `POSTGRES_USER` | utopia-db | (secret) |
| `POSTGRES_PASSWORD` | utopia-db | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/utopia)
