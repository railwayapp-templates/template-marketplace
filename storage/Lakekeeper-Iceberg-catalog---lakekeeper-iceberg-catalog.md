# Deploy Lakekeeper Iceberg catalog on Railway

Secure Apache Iceberg catalog with PostgreSQL and Railway object storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lakekeeper-iceberg-catalog)

## About

Lakekeeper provides a vendor-neutral Apache Iceberg REST catalog with a browser UI and management API. This template adds persistent PostgreSQL metadata, Railway Bucket warehouse storage, and a generated Basic Auth gateway.

The catalog and database stay private while Railway exposes only the authenticated Caddy gateway. The deployment starts by applying Lakekeeper's PostgreSQL migrations, then serves the UI, management API, and Iceberg REST protocol on one private listener.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Lakekeeper | `quay.io/lakekeeper/catalog:v0.13.1@sha256:4749ee267a4524502f9786e3f7eb8d34c8fe2a7b316d232bab80ca47563d7c68` | Worker |
| Lakekeeper PostgreSQL | `postgres:17-alpine@sha256:742f40ea20b9ff2ff31db5458d127452988a2164df9e17441e191f3b72252193` | Database |
| Lakekeeper Gateway | `caddy:2.10-alpine@sha256:4c6e91c6ed0e2fa03efd5b44747b625fec79bc9cd06ac5235a779726618e530d` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Lakekeeper | 8181 | - |
| `LAKEKEEPER__BIND_IP` | Lakekeeper | 0.0.0.0 | - |
| `LAKEKEEPER__LISTEN_PORT` | Lakekeeper | 8181 | - |
| `LAKEKEEPER__AUTHZ_BACKEND` | Lakekeeper | allowall | - |
| `LAKEKEEPER_WAREHOUSE_BUCKET` | Lakekeeper | - | Railway Bucket name for the first S3-compatible warehouse. |
| `LAKEKEEPER__PG_ENCRYPTION_KEY` | Lakekeeper | - | Generated key used to encrypt catalog secrets in PostgreSQL. |
| `LAKEKEEPER__UI__ENABLE_SURVEYS` | Lakekeeper | false | - |
| `LAKEKEEPER_WAREHOUSE_SECRET_ACCESS_KEY` | Lakekeeper | (secret) | - |
| `POSTGRES_DB` | Lakekeeper PostgreSQL | lakekeeper | - |
| `POSTGRES_USER` | Lakekeeper PostgreSQL | (secret) | - |
| `POSTGRES_PASSWORD` | Lakekeeper PostgreSQL | (secret) | Generated database password shared through Railway references. |
| `PORT` | Lakekeeper Gateway | 8080 | - |
| `LAKEKEEPER_PASSWORD` | Lakekeeper Gateway | (secret) | Generated password for the public Basic Auth gateway. |
| `LAKEKEEPER_USERNAME` | Lakekeeper Gateway | (secret) | Username for the public Basic Auth gateway. |

## Configuration

- **Start command:** `/home/nonroot/lakekeeper serve`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -ec 'password_hash="$(caddy hash-password --plaintext "$LAKEKEEPER_PASSWORD")"; printf '"'"':8080 {\n handle /healthz {\n  respond "ok" 200\n }\n handle {\n  basic_auth {\n   %s %s\n  }\n  reverse_proxy %s\n }\n}\n'"'"' "$LAKEKEEPER_USERNAME" "$password_hash" "$LAKEKEEPER_UPSTREAM" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/lakekeeper-iceberg-catalog)
