# Deploy Gel + PostgreSQL on Railway

Gel supercharges PostgreSQL with a modern data model, graph queries & auth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gel-postgresql)

## About

Gel is a next-generation graph-relational database that supercharges PostgreSQL with an object-oriented data model, powerful graph queries via EdgeQL, and built-in schema migrations. It combines SQL's reliability and performance with modern developer workflows, making it easier to work with complex, hierarchical data while maintaining strict type safety.

Deploying Gel with PostgreSQL on Railway involves running two interconnected services: a PostgreSQL database instance for data storage and a Gel server container that provides the query interface and object-relational layer. Gel stores and manages data using PostgreSQL's proven relational techniques while exposing a more intuitive object-oriented model through its EdgeQL query language.

The deployment handles automatic schema migrations, connection management between services, and persistent data storage. Railway simplifies this architecture by managing both containers, networking, and volume persistence, allowing you to focus on schema design and application logic rather than infrastructure configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:14` | Database |
| gel | `geldata/gel` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `GEL_SERVER_ADMIN_UI` | gel | enabled | - |
| `GEL_SERVER_PASSWORD` | gel | (secret) | - |
| `GEL_SERVER_SECURITY` | gel | strict | - |
| `GEL_SERVER_TLS_CERT_MODE` | gel | generate_self_signed | - |
| `GEL_SERVER_COMPILER_POOL_MODE` | gel | on_demand | - |
| `GEL_SERVER_MAX_BACKEND_CONNECTIONS` | gel | 8 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/gel-postgresql)
