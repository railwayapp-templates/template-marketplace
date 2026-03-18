# Deploy Hasura on Railway

Instant GraphQL APIs for your PostgreSQL database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hasura)

## About

## Overview

Hasura is an open-source product that accelerates API development by 10x by giving you [GraphQL](https://hasura.io/graphql/)
 or REST APIs with built-in authorization on your data, instantly.

This example sets up a [Hasura](https://hasura.io/opensource/) instance with a [PostgreSQL](https://www.postgresql.org/) database.

## Highlights

- Build modern apps & APIs 10x faster
- Built-in authorization and caching
- Blazing fast GraphQL & REST APIs
- Open source

## Learn More

- [Hasura GraphQL Engine](https://github.com/hasura/graphql-engine)
- [GitHub](https://github.com/railwayapp-templates/hasura)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hasura | `hasura/graphql-engine:v2.40.2` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HASURA_GRAPHQL_SERVER_HOST` | Hasura | :: | - |
| `HASURA_GRAPHQL_ADMIN_SECRET` | Hasura | (secret) | To secure your GraphQL endpoint and the Hasura console. |
| `HASURA_GRAPHQL_ENABLE_CONSOLE` | Hasura | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Tags:** api, graphql, webserver

[View on Railway →](https://railway.com/deploy/hasura)
