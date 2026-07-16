# Deploy Amazon Seller MCP on Railway

Self-hosted Amazon Seller analytics MCP for Claude: SP-API + Ads v3.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/amazon-seller-mcp)

## About

Amazon Seller MCP is a self-hosted, single-tenant analytics service for one Amazon seller account. A worker ingests your Selling Partner API, Advertising API v3, and Data Kiosk data into your own Postgres, and a bearer-guarded remote MCP server exposes it to Claude so you can ask questions and get answers grounded in your real numbers.

This template provisions three components in one deploy: a Postgres database, a worker that runs scheduled ingestion (migrations run automatically on boot, followed by a backfill of trailing history), and an MCP web service exposed over HTTPS with a health check. Every credential is supplied by you at deploy time as an environment variable — nothing is shared and no data leaves your project. The worker owns all Amazon API calls, retries, pagination, and throttling; the MCP service only reads Postgres, plus one approval-gated write path for bid changes. Your Claude connector reaches the service at its public URL using a bearer token you control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| amazon-seller-mcp-1mjb | [stevegustafson32/amazon-seller-mcp](https://github.com/stevegustafson32/amazon-seller-mcp) | Worker |
| amazon-seller-mcp | [stevegustafson32/amazon-seller-mcp](https://github.com/stevegustafson32/amazon-seller-mcp) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `MCP_BEARER_TOKEN` | amazon-seller-mcp-1mjb | (secret) | - |
| `ADS_REFRESH_TOKEN` | amazon-seller-mcp-1mjb | (secret) | - |
| `SPAPI_REFRESH_TOKEN` | amazon-seller-mcp-1mjb | (secret) | - |
| `ADS_LWA_CLIENT_SECRET` | amazon-seller-mcp-1mjb | (secret) | - |
| `SPAPI_LWA_CLIENT_SECRET` | amazon-seller-mcp-1mjb | (secret) | - |
| `LOG_LEVEL` | amazon-seller-mcp | info | - |
| `ADS_REGION` | amazon-seller-mcp | na | - |
| `SPAPI_REGION` | amazon-seller-mcp | na | - |
| `BACKFILL_DAYS` | amazon-seller-mcp | 30 | - |
| `MCP_BEARER_TOKEN` | amazon-seller-mcp | (secret) | - |
| `ADS_REFRESH_TOKEN` | amazon-seller-mcp | (secret) | - |
| `SPAPI_REFRESH_TOKEN` | amazon-seller-mcp | (secret) | - |
| `SPAPI_MARKETPLACE_ID` | amazon-seller-mcp | ATVPDKIKX0DER | - |
| `ADS_LWA_CLIENT_SECRET` | amazon-seller-mcp | (secret) | - |
| `SPAPI_LWA_CLIENT_SECRET` | amazon-seller-mcp | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `python -m amazon_seller_mcp.ingestion.scheduler`
- **Start command:** `python -m amazon_seller_mcp.mcp.server`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Python, PLpgSQL, Dockerfile

[View on Railway →](https://railway.com/deploy/amazon-seller-mcp)
