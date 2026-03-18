# Deploy Actix Sqlx on Railway

Minimal Actix web application pre-configured with SQLx and database pooling

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/4lz789)

## About

## Overview
Actix is a powerful and highly performant web framework for building web servers in Rust. SQLx is an asynchronous, pure rust SQL library that provides compile-time checked queries without the need for a DSL.

## Features
- Performance: Actix is designed with performance in mind. It leverages asynchronous and non-blocking I/O, making it capable of handling high levels of concurrency and achieving excellent throughput
- Scalability: Actix is an actor framework for Rust. This allows Actix applications to handle thousands of concurrent connections efficiently
- Actix Web servers are known for their low memory footprint compared to some other web frameworks
- Compile-time checked queries: Write typed, asynchronous SQL without the overhead of an ORM
- Database connection pooling: Improve performance by re-using existing database connections, rather than establishing a new database connection per request

## Learn More
- [Actix docs](https://actix.rs/docs)
- [SQLx docs](https://docs.rs/crate/sqlx/latest)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Actix | [dobecad/actix-sqlx-pg](https://github.com/dobecad/actix-sqlx-pg) (root: app) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Rust

[View on Railway →](https://railway.com/template/4lz789)
