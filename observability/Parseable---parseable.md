# Deploy Parseable on Railway

Deploy Parseable - fast, lightweight log analytics on Railway in one click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/parseable)

## About

Parseable is a lightweight, open-source log analytics platform built in Rust. It ingests structured logs over HTTP, stores them efficiently, and lets you query and visualize them through a clean UI or SQL editor, without the complexity of Elasticsearch or heavy observability stacks.

Hosting Parseable requires a persistent runtime environment with configurable storage paths and environment-based credentials. This template deploys a single Parseable instance using its official Docker image with local storage mode, no S3 or external database required. Once deployed, Railway assigns a public URL where you can access the Parseable UI, create log streams, and start ingesting logs via HTTP from any application. Environment variables like P_USERNAME and P_PASSWORD are pre-configured and editable. The service auto-restarts on failure and exposes a health check endpoint for Railway to monitor uptime.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| parseable-railway-template | [pratik50/parseable-railway-template](https://github.com/pratik50/parseable-railway-template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Port Parseable runs on |
| `P_PASSWORD` | (secret) | Admin password for Parseable UI |
| `P_USERNAME` | (secret) | Admin username for Parseable UI |
| `P_STAGING_DIR` | /tmp/parseable/staging | Staging directory for log ingestion |
| `P_HOT_TIER_PATH` | /var/lib/parseable | Local storage path for Parseable data |

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/parseable)
