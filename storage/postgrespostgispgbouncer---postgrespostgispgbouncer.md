# Deploy postgres+postgis+pgbouncer on Railway

Postgres+postgis+pgbouncer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgrespostgispgbouncer)

## About

**postgres+postgis+pgbouncer** combines PostgreSQL with PostGIS spatial database capabilities and PgBouncer connection pooling. PostgreSQL provides reliable relational data storage, PostGIS adds geographic data types, spatial indexing, and geospatial queries, while PgBouncer efficiently manages database connections to reduce connection overhead and improve application scalability.

Hosting postgres+postgis+pgbouncer involves running PostgreSQL with the PostGIS extension enabled, alongside PgBouncer as the connection-pooling layer between your applications and the database. Applications connect to PgBouncer rather than opening unrestricted direct PostgreSQL connections, allowing connections to be reused and controlled efficiently. On Railway, the database can use persistent volumes for durable storage and private networking for secure communication between services. Environment variables can be used for credentials and database connection URLs, allowing the stack to integrate cleanly with application services deployed in the same Railway project.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgbouncer/pgbouncer | `pgbouncer/pgbouncer` | Worker |
| postgis/postgis | `postgis/postgis` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

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

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgrespostgispgbouncer)
