# Deploy Hasura | Instant GraphQL APIs on Railway on Railway

Self-host Hasura. Instant realtime GraphQL, REST, Subscriptions, Webhooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-host-hasura)

## About

Hasura GraphQL Engine is an open-source server that instantly generates realtime GraphQL and REST APIs directly from your PostgreSQL schema — no manual resolvers, no boilerplate. It ships with role-based access control, event triggers, remote schema stitching, and a browser-based console, making it the fastest path from a Postgres database to a production-ready API layer.

Self-hosting Hasura on Railway takes minutes. This template deploys `hasura/graphql-engine:latest` alongside a Railway-managed PostgreSQL instance (`ghcr.io/railwayapp-templates/postgres-ssl:17`) with private networking pre-wired between them. The admin secret is auto-generated, the console is enabled, and both services start in the correct order — so you can run Hasura yourself without touching a config file.

![Hasura Railway deployment](https://res.cloudinary.com/asset-cloudinary/image/upload/v1774031837/hasura_railway_deployment_ou5cbp.png)

Hasura fronts a PostgreSQL database and auto-generates a full GraphQL schema from your tables, views, and relationships. It handles the entire API layer so you can focus on your data model, not writing resolvers.

Key features:

- **Instant GraphQL & REST APIs** — auto-generated from any Postgres schema, including existing databases
- **Realtime subscriptions** — convert any query to a live query with a single keyword
- **Event triggers** — fire webhooks on any insert, update, or delete in Postgres
- **Fine-grained access control** — role-based rules with dynamic session variables (JWT, webhook, or x-hasura headers)
- **Remote schema stitching** — merge external GraphQL APIs into a single unified endpoint
- **Actions** — extend the schema with custom REST business logic
- **Migrations via CLI** — schema changes tracked in version-controlled files
- **~15MB Docker image** — ~50MB RAM at ~1,000 req/s; scales to 1M active subscriptions

The Railway template runs two services: `graphql-engine` (stateless, publicly exposed on port 8080) and `Postgres` (private, volume-mounted at `/var/lib/postgresql/data`). They communicate over Railway's private network — no public DB exposure required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Graphql-Engine | `hasura/graphql-engine:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Graphql-Engine | 8080 | HTTP server listening port |
| `PG_DATABASE_URL` | Graphql-Engine | - | Primary Postgres database connection URL |
| `HASURA_GRAPHQL_DEV_MODE` | Graphql-Engine | false | Enable or disable development mode |
| `HASURA_GRAPHQL_SERVER_PORT` | Graphql-Engine | 8080 | Internal Hasura server port |
| `HASURA_GRAPHQL_ADMIN_SECRET` | Graphql-Engine | (secret) | Admin secret for GraphQL access |
| `HASURA_GRAPHQL_ENABLE_CONSOLE` | Graphql-Engine | true | Enable Hasura web console UI |
| `HASURA_GRAPHQL_ENABLED_LOG_TYPES` | Graphql-Engine | startup, http-log, webhook-log, websocket-log, query-log | Enabled log types for debugging |
| `HASURA_GRAPHQL_METADATA_DATABASE_URL` | Graphql-Engine | - | Metadata Postgres database connection URL |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/self-host-hasura)
