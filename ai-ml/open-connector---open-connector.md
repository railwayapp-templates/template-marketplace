# Deploy open-connector on Railway

connecting 1000+ SaaS providers to AI agents through MCP, HTTP, and OpenAPI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-connector)

## About

OpenConnector runs on Railway as a single Docker image service with the bundled Web Console, HTTP runtime API, MCP endpoint, and SQLite-backed local state. Railway provides managed HTTPS, deploys from the prebuilt Docker Hub image, and mounts persistent storage for runtime data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `xiaosong233/open-connector-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 3000 |
| `OOMOL_CONNECT_DATA_DIR` | /app/data |
| `OOMOL_CONNECT_ADMIN_TOKEN` | (secret) |
| `OOMOL_CONNECT_RUNTIME_TOKEN` | (secret) |
| `OOMOL_CONNECT_TRANSIT_FILE_MAX_BYTES` | 104857600 |
| `OOMOL_CONNECT_TRANSIT_FILE_TTL_SECONDS` | 86400 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-connector)
