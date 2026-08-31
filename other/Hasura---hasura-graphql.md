# Deploy Hasura on Railway

Turns a Postgres database into a ready-made GraphQL API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hasura-graphql)

## About

Hasura is a GraphQL engine that points at a Postgres database and instantly serves a complete GraphQL API over it — queries, nested joins across foreign keys, aggregates, mutations and realtime subscriptions — with no resolver code. Access is declarative: row- and column-level permissions per role, rather than authorization logic scattered through an application. You extend the generated schema with Actions (your own REST handlers), Remote Schemas (other GraphQL services stitched into one endpoint) and Event Triggers (webhooks fired on row changes). Teams use it to put an API over an existing database in an afternoon.

Self-host Hasura on Railway in the shape Hasura's own docs recommend for production: the `hasura/graphql-engine` Community Edition image behind a public HTTPS domain, plus **two** managed Postgres services. One holds your application data and is registered automatically as the data source named `default`. The other holds only Hasura's metadata catalogue — the `hdb_catalog` schema recording tracked tables, relationships, permissions, event queues and cron state — so your own database stays clean enough to back up or swap without touching engine configuration. Requests are checked against the admin secret or your JWT configuration, then compiled into a single SQL statement sent over the private network; neither database is exposed to the internet.

![Diagram of the Hasura engine and two Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788091634/hasura-architecture.png)

Hasura compiles GraphQL into SQL, generating one query per request rather than resolving fields one at a time, so nested reads never degrade into N+1 round trips and subscriptions multiplex many clients onto a few polled queries. Self-host it when your data cannot leave your own infrastructure, or when you do not want per-gigabyte API pricing.

- Auto-generated CRUD, filtering, pagination, ordering and aggregates
- Realtime subscriptions over WebSockets, with live queries
- Permissions as row filters, column lists and row limits, per role
- JWT and webhook auth, with session variables usable inside filters
- Actions, Remote Schemas and Event Triggers for logic SQL cannot express
- Migrations and metadata as version-controlled files via the Hasura CLI

**hasura** is the engine and the only service with a public domain. **Postgres** is your data source. **Postgres-Metadata** stores the catalogue the engine writes as you track tables and edit permissions; it starts nearly empty and stays small.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| hasura | `hasura/graphql-engine:latest` | Web service |
| Postgres-Metadata | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | hasura | 8080 | Port Railway probes and routes to |
| `HASURA_GRAPHQL_DEV_MODE` | hasura | false | Hide internal errors from non-admin roles |
| `HASURA_GRAPHQL_LOG_LEVEL` | hasura | info | Server log verbosity |
| `HASURA_GRAPHQL_SERVER_PORT` | hasura | 8080 | Port the engine listens on |
| `HASURA_GRAPHQL_ADMIN_SECRET` | hasura | (secret) | Admin credential for console and API |
| `HASURA_GRAPHQL_DATABASE_URL` | hasura | - | Data source, tracked as `default` |
| `HASURA_GRAPHQL_ENABLE_CONSOLE` | hasura | true | Serves the web console at /console |
| `HASURA_GRAPHQL_ENABLE_TELEMETRY` | hasura | false | Disable anonymous usage reporting |
| `HASURA_GRAPHQL_ENABLED_LOG_TYPES` | hasura | startup,http-log,webhook-log,websocket-log,query-log | Log categories, including generated SQL |
| `HASURA_GRAPHQL_CONSOLE_ASSETS_DIR` | hasura | /srv/console-assets | Serve console assets from the image |
| `HASURA_GRAPHQL_METADATA_DATABASE_URL` | hasura | - | Stores the hdb_catalog metadata |
| `HASURA_GRAPHQL_GRACEFUL_SHUTDOWN_TIMEOUT` | hasura | 25 | Seconds to finish in-flight events |
| `POSTGRES_DB` | Postgres-Metadata | railway | Database created on first boot |
| `DATABASE_URL` | Postgres-Metadata | - | Private connection string |
| `POSTGRES_USER` | Postgres-Metadata | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres-Metadata | (secret) | Superuser password |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/hasura-graphql)
