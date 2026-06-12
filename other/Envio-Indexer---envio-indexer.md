# Deploy Envio Indexer on Railway

Scaffolding for an Envio indexer with GraphQL gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/envio-indexer)

## About

This is an installation of the Envio indexer, Hasura, PostgreSQL and a public-facing GraphQL gateway that will get you up and running with the Envio blockchain indexing framework.

- PostgreSQL server
- Envio indexer
  - Performs the blockchain indexing
  - Pre-configured to index ERC20 `Transfer` events on Ethereum mainnet and Base
  - Can be easily customised for your indexing needs
  - Has variable definitions for the Envio HyperSync token and RPC URLs
- Hasura
  - Private Hasura installation, which exposes a GraphQL server for the data output by the Envio indexer
  - This is kept private to reduce the public surface area
- GraphQL gateway
  - Lightweight node server that allows for GET/POST GraphQL queries

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| hasura | [0xJem/railway-envio-template](https://github.com/0xJem/railway-envio-template) | Worker |
| indexer | [0xJem/railway-envio-template](https://github.com/0xJem/railway-envio-template) | Worker |
| gateway | [0xJem/railway-envio-template](https://github.com/0xJem/railway-envio-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | hasura | 8080 | Hasura port |
| `HASURA_GRAPHQL_ADMIN_SECRET` | hasura | (secret) | Hasura admin secret |
| `HASURA_GRAPHQL_DATABASE_URL` | hasura | - | Postgres database URL |
| `HASURA_GRAPHQL_ENABLE_CONSOLE` | hasura | false | Whether to enable the console |
| `HASURA_GRAPHQL_UNAUTHORIZED_ROLE` | hasura | public | Hasura role used for unauthenticated access |
| `PORT` | indexer | 9898 | The port that the Envio indexer operates on |
| `ENVIO_PG_HOST` | indexer | - | Postgres host |
| `ENVIO_PG_PORT` | indexer | - | Postgres port |
| `ENVIO_PG_USER` | indexer | (secret) | Postgres user |
| `ENVIO_1_RPC_URL` | indexer | - | RPC URL for Ethereum mainnet. Will fall back to a public RPC if not set. |
| `ENVIO_API_TOKEN` | indexer | (secret) | API token for the Envio HyperSync service |
| `ENVIO_PG_DATABASE` | indexer | - | Postgres database |
| `ENVIO_PG_PASSWORD` | indexer | (secret) | Postgres password |
| `ENVIO_8453_RPC_URL` | indexer | - | RPC URL for Base. Will fall back to a public RPC if not set. |
| `HASURA_GRAPHQL_ENDPOINT` | indexer | - | Hasura endpoint |
| `HASURA_GRAPHQL_ADMIN_SECRET` | indexer | (secret) | Hasura admin secret |
| `PORT` | gateway | 8080 | Port that the gateway runs on |
| `HASURA_GRAPHQL_ENDPOINT` | gateway | - | Hasura endpoint |
| `HASURA_GRAPHQL_ADMIN_SECRET` | gateway | (secret) | Hasura admin secret |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm --filter hasura build`
- **Healthcheck:** `/healthz`
- **Start command:** `pnpm --filter indexer start`
- **Start command:** `pnpm --filter graphql-gateway build`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Dockerfile, Shell, TypeScript

[View on Railway →](https://railway.com/deploy/envio-indexer)
