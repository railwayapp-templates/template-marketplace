# Deploy crypto exchange on Railway

A full-stack crypto exchange. CLOB + frontend + market-making bots.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/exchange)

## About

A production-ready cryptocurrency exchange with real-time order matching, WebSocket
market data feeds, and automated market-making bots. Trade BTC/USDC perpetuals and
prediction markets with instant execution and live price discovery.

https://github.com/trevor-trinh/exchange

Deploying this exchange sets up a complete trading infrastructure: a Rust-based
matching engine with WebSocket support, Next.js trading interface with TradingView
charts, PostgreSQL for order storage, ClickHouse for analytics, and automated
market-making bots. The bots immediately connect to Hyperliquid to mirror real BTC
prices and provide liquidity. No manual configuration needed—after deployment, visit
the frontend URL and start trading instantly. The backend exposes a REST API with
OpenAPI documentation, WebSocket feeds for real-time updates, and supports custom
trading strategies through the API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Clickhouse | `clickhouse/clickhouse-server:latest` | Database |
| bots | [trevor-trinh/exchange](https://github.com/trevor-trinh/exchange) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| frontend | [trevor-trinh/exchange](https://github.com/trevor-trinh/exchange) | Web service |
| backend | [trevor-trinh/exchange](https://github.com/trevor-trinh/exchange) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLICKHOUSE_DB` | Clickhouse | exchange | - |
| `CLICKHOUSE_USER` | Clickhouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | Clickhouse | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NEXT_PUBLIC_ORGANIZATION_ID` | frontend | 54a235ad-a33c-4ecc-99b6-6f4778fecad0 | - |
| `NEXT_PUBLIC_AUTH_PROXY_CONFIG_ID` | frontend | 54893238-9f1a-492e-89ea-9ff50bfb48db | - |
| `HOST` | backend | 0.0.0.0 | - |
| `CH_USER` | backend | (secret) | - |
| `CH_PASSWORD` | backend | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Rust, TypeScript, Python, CSS, Dockerfile, Shell, Just, JavaScript

[View on Railway →](https://railway.com/deploy/exchange)
