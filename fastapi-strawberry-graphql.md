# Deploy FastAPI Strawberry GraphQL on Railway

Deploy and Host FastAPI Strawberry GraphQL with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fastapi-strawberry-graphql)

## About

FastAPI Strawberry GraphQL is a production-ready API template combining FastAPI's async performance with Strawberry's type-safe GraphQL. It features SQLAlchemy 2.0 async ORM, automatic schema generation, and dual REST/GraphQL endpoints—ideal for building flexible, high-performance APIs.

Deploying FastAPI Strawberry GraphQL requires an async-capable Python runtime and a PostgreSQL database. This template handles the complexity automatically: environment-based configuration switches between SQLite (dev) and PostgreSQL (prod), the async database driver (asyncpg) manages connection pooling, and tables are auto-created on first startup with sample data seeded.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FastAPI-Server | [yuting1214/FastAPI---Strawberry](https://github.com/yuting1214/FastAPI---Strawberry) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST_URL` | FastAPI-Server | - | Host URL for App |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/fastapi-strawberry-graphql)
