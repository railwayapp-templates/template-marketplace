# Deploy Drizzle GraphQL Postgres Starter on Railway

A simple GraphQL API using Drizzle schemas

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/4KBHfo)

## About

## Overview

Drizzle ORM is a lightweight, type-safe, and performant TypeScript ORM for SQL databases. It offers a fluent query builder, automatic SQL generation, and seamless integration with popular databases, enabling developers to write efficient and maintainable database interactions with full TypeScript support.

Pair the power of Drizzle schemas with GraphQL to easily access the exact data you need in a standardised format.

This template combines GraphQL, Drizzle and Typescript to make a perfect starter for building APIs, prototyping with GraphQL and early development.

## Highlights

- GraphQL
- Drizzle schemas
- Typescript
- Environment variable setup using dotenv

## Learn More

- [GraphQL](https://graphql.org/)
- [Drizzle](https://orm.drizzle.team/)
- [drizzle-graphql](https://github.com/drizzle-team/drizzle-graphql)
- [Typescript](https://www.typescriptlang.org/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| drizzle-graphql-postgres-starter | [matthewspear/drizzle-graphql-postgres-starter](https://github.com/matthewspear/drizzle-graphql-postgres-starter) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/4KBHfo)
