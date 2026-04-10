# Deploy Diom on Railway

Template to deploy a Diom server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/diom)

## About

Coyote is the backend survival toolkit. It’s a set of well integrated infrastructure primitives for backend and data engineers such as caching, kv-store, rate-limiting, idempotency, queue, and stream.

Coyote works out of the box using the default configuration and supports a variety of deployment options.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| svix/coyote-server:latest | `ghcr.io/svix/coyote-server:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `COYOTE_ADMIN_TOKEN` | (secret) | Auth token for administration actions |

## Configuration

- **Healthcheck:** `/api/v1.health.ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/diom)
