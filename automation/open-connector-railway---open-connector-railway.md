# Deploy open-connector-railway on Railway

Deploy OpenConnector with MCP, APIs, web console, and SQLite storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-connector-railway)

## About

OpenConnector provides a web console, MCP endpoint, HTTP and OpenAPI interfaces, and more than 1,000
provider integrations from a single self-hosted runtime.

This template builds the maintained OpenConnector `railway` branch with its production Dockerfile.
Railway runs one service replica, checks `/health`, and mounts persistent storage at `/app/data` for
the SQLite database and transit files.

Connections, encrypted credentials, OAuth configuration, tokens, run history, and transit files
remain on the attached volume across normal redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-connector | [wsbjj/open-connector-railway](https://github.com/wsbjj/open-connector-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OOMOL_CONNECT_ADMIN_TOKEN` | (secret) |
| `OOMOL_CONNECT_RUNTIME_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Automation · **Languages:** TypeScript, CSS, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/open-connector-railway)
