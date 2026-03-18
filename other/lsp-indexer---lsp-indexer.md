# Deploy lsp-indexer on Railway

A template for the LSP Indexer. Get data availability right now.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/lsp-indexer)

## About

The LSP Indexer is an open-source tool that monitors the LUKSO blockchain, capturing key events like `DataChanged`, `UniversalReceiver`, and `Transfer`. It extracts and indexes data such as LSP3Profile and LSP4Metadata for easy querying and analysis, supporting developers and applications in the LUKSO ecosystem.

Hosting lsp-indexer on Railway involves cloning the repository, installing dependencies with pnpm, and configuring environment variables like `DB_URL`, `RPC_URL`, and `IPFS_GATEWAY`. Build the project with `pnpm build`, apply database migrations, and start the indexer with `pnpm start`. Railway simplifies deployment by managing infrastructure, scaling, and database connectivity, ensuring seamless operation. A PostgreSQL database is required for data storage, and proper rate-limiting (`RPC_RATE_LIMIT`) prevents RPC overload. The monorepo structure, managed by pnpm workspaces, organizes packages for efficient event processing and indexing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lsp-indexer | [chillwhales/lsp-indexer](https://github.com/chillwhales/lsp-indexer) | Worker |
| Hasura | `hasura/graphql-engine:v2.46.0` | Web service |
| Data Connector Agent | `hasura/graphql-data-connector:v2.46.0` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RPC_URL` | lsp-indexer | https://rpc.lukso.sigmacore.io | - |
| `HASURA_GRAPHQL_ADMIN_SECRET` | lsp-indexer | (secret) | - |
| `PRIVATE_DOMAIN` | Hasura | - | The private DNS name of the service. |
| `HASURA_GRAPHQL_DEV_MODE` | Hasura | true | - |
| `HASURA_GRAPHQL_ADMIN_SECRET` | Hasura | (secret) | - |
| `HASURA_GRAPHQL_ENABLE_CONSOLE` | Hasura | true | - |
| `HASURA_GRAPHQL_ENABLED_LOG_TYPES` | Hasura | startup,http-log,webhook-log,websocket-log,query-log | - |
| `HASURA_GRAPHQL_UNAUTHORIZED_ROLE` | Hasura | public | - |
| `PRIVATE_DOMAIN` | Data Connector Agent | - | The private DNS name of the service. |
| `QUARKUS_LOG_LEVEL` | Data Connector Agent | ERROR | - |
| `QUARKUS_OPENTELEMETRY_ENABLED` | Data Connector Agent | false | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/template/lsp-indexer)
