# Deploy PDPP Core Node on Railway

Self-hosted PDPP Core node with console, AS/RS, and Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pdpp-core-node)

## About

Deploy a self-hosted PDPP Core reference node on Railway.

This template runs the open-source PDPP reference implementation in your Railway account. It creates one public operator console, one private Authorization Server / Resource Server service, and durable Postgres storage. It is not a hosted PDPP service operated by Vana or OpenDataLabs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| console | `ghcr.io/vana-com/pdpp/web:sha-f45ba05` | Web service |
| reference | `ghcr.io/vana-com/pdpp/reference:sha-f45ba05` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PDPP_OWNER_PASSWORD` | console | (secret) |
| `PDPP_OWNER_PASSWORD` | reference | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/.well-known/oauth-authorization-server`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/pdpp-core-node)
