# Deploy Jig on Railway

Reliable AI workflows with versioned TypeScript and scoped MCP tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jig)

## About

Deploy a clean, always-on Jig instance.

The template provisions:

- one Jig service from the public `ghcr.io/agamm/jig:latest` image;
- a health check at `/api/health` and an always-restart policy;
- a blank persistent volume mounted at `/data`;
- public networking for the dashboard and API.

The image is built from the public repository by GitHub Actions. Its Dockerfile
uses an explicit runtime-file allowlist, and its build context excludes local
state and secrets.

No maintainer data is copied. The template has no variables and contains no
database, credentials, OAuth state, environment secrets, connected accounts,
generated schemas, logs, or personal configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jig | `ghcr.io/agamm/jig:latest` | Web service |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/jig)
