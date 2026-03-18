# Deploy Express+GraphQL+TypeORM Starter on Railway

This template provides a fully typed GQL API server + Postgres DB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/expressgraphqltypeorm-starter)

## About

Express + GraphQL + TypeORM + TypeGraphQL Starter is a production-ready boilerplate for building scalable and type-safe APIs. It combines Express.js for routing, TypeGraphQL for schema-first GraphQL development, and TypeORM for database management. Designed for rapid development, this starter gives you a clean architecture that’s ideal for modern full-stack projects using TypeScript and PostgreSQL.

---

Hosting this starter on Railway allows you to quickly deploy a robust backend with minimal setup. The template integrates Express for request handling, TypeGraphQL for building GraphQL schemas using TypeScript decorators, and TypeORM for managing entities and migrations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GraphQL Server | [dre-draws/GQL-Express-BE-Template](https://github.com/dre-draws/GQL-Express-BE-Template) | Web service |
| Postgres DB | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PG_DB` | GraphQL Server | - | Postgres DB reference variable |
| `PG_HOST` | GraphQL Server | - | Postgres DB Host reference variable |
| `PG_PORT` | GraphQL Server | - | Postgres DB Port Reference Variable |
| `PG_PASSWORD` | GraphQL Server | (secret) | Postgres DB password reference variable |
| `PG_USERNAME` | GraphQL Server | (secret) | Postgres DB Username reference variable |
| `POSTGRES_DB` | Postgres DB | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres DB | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres DB | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres DB | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres DB | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/template/expressgraphqltypeorm-starter)
