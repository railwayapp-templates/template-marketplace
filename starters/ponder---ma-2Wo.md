# Deploy ponder on Railway

Minimal installation of Ponder + PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ma-2Wo)

## About

This is a minimal installation of Ponder + PostgreSQL that will get you up and running with the Ponder blockchain indexing framework.

## Features

- PostgreSQL server
- Ponder indexer
  - Railway is pre-configured to run it
  - Environment variables pre-populated with the database and common RPCs
  - Applies the `--schema` parameter to enable zero-downtime deployments
  - Exposes GraphQL at the `/graphql` endpoint
  - Exposes the Ponder SQL API at the `/sql/` endpoint
  - Sample indexing of the Chainlink ETH-USD price feed

## Next Steps

- Add ABIs under `/abis`
- Add contract definitions under `/ponder.config.ts`
- Define the schema in `/ponder.schema.ts`
- Read the [Ponder docs](https://ponder.sh/docs/getting-started/new-project)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| indexer | [0xJem/railway-ponder-template](https://github.com/0xJem/railway-ponder-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PONDER_RPC_URL_1` | indexer | https://rpc.ankr.com/eth | - |
| `PONDER_RPC_URL_10` | indexer | https://rpc.ankr.com/optimism | - |
| `PONDER_RPC_URL_137` | indexer | https://rpc.ankr.com/polygon | - |
| `PONDER_RPC_URL_8453` | indexer | https://rpc.ankr.com/base | - |
| `PONDER_RPC_URL_42161` | indexer | https://rpc.ankr.com/arbitrum | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `pnpm start --schema $RAILWAY_DEPLOYMENT_ID`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/ma-2Wo)
