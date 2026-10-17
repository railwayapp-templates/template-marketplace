# Deploy slashdocs on Railway

Self-host collaborative HTML docs with comments, Postgres, and S3.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/slashdocs-1)

## About

Slashdocs is a collaborative workspace for agentic organizations. It stores self-contained HTML documents, keeps immutable versions, and lets people review exact text with anchored comments. The embedded React interface and Go API share one container, while PostgreSQL stores metadata and Railway-hosted S3-compatible storage keeps document artifacts durable.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/slashdocs-1)

Railway runs the pinned Slashdocs Docker image alongside PostgreSQL and a private S3-compatible blob service. Railway provides managed deployments, private networking, generated HTTPS domains, persistent volumes, and simple environment-variable wiring for a compact production-style stack.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| blob | `versity/versitygw:v1.8.0` | Database |
| slashdocs | `razorpay/slashdocs:0.3.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ROOT_SECRET_ACCESS_KEY` | blob | (secret) |
| `SESSION_SECRET` | slashdocs | (secret) |
| `BLOB_SECRET_ACCESS_KEY` | slashdocs | (secret) |
| `GOOGLE_OAUTH_CLIENT_SECRET` | slashdocs | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `sh -c 'mkdir -p /data/slashdocs-documents && exec versitygw --quiet --port :9000 posix /data'`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/slashdocs-1)
