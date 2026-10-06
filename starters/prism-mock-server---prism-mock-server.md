# Deploy prism-mock-server on Railway

Instant mock API server from any OpenAPI spec, with validated responses

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prism-mock-server)

## About

Hosting this template provisions a single Railway service, `prism-mock-server`, built from the pinned `stoplight/prism:4` Docker image (digest-pinned for reproducibility) with the demo spec baked in at `/spec/openapi.json`. Railway assigns a public domain automatically and healthchecks the real `GET /health` route, so a green deployment means Prism is actually serving. No database, no workers, no credentials to manage. Optional variables: `SPEC_PATH` (default `/spec/openapi.json`, accepts a file path or URL) to serve your own spec.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| prism-mock-server | [lNamelessl/prism-mock-server](https://github.com/lNamelessl/prism-mock-server) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/prism-mock-server)
