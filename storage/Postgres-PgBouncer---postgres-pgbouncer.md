# Deploy Postgres + PgBouncer on Railway

Deploy Postgres + PgBouncer for efficient DB pooling

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-pgbouncer)

## About

Postgres is a powerful open-source relational database. PgBouncer is a lightweight 
connection pooler that sits in front of Postgres, managing database connections 
efficiently. Together, they provide a scalable, production-ready setup that reduces 
overhead, improves performance, and ensures your app can handle more traffic with 
fewer database bottlenecks.

Hosting Postgres with PgBouncer means you get a database plus a smart connection 
manager in one setup. Applications connect to PgBouncer, which manages and reuses 
connections to Postgres behind the scenes. This reduces resource usage, prevents 
connection floods, and keeps performance stable in production. On Railway, this is 
fully managed—simply deploy the template and focus on building your app instead of 
configuring database infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PGBouncer | `railwayapp/pgbouncer` | TCP service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRESQL_PORT` | PGBouncer | 5432 | - |
| `PGBOUNCER_POOL_MODE` | PGBouncer | session | - |
| `POSTGRESQL_PASSWORD` | PGBouncer | (secret) | - |
| `POSTGRESQL_USERNAME` | PGBouncer | (secret) | - |
| `PGBOUNCER_LISTEN_ADDRESS` | PGBouncer | * | - |
| `PGBOUNCER_MAX_CLIENT_CONN` | PGBouncer | 120 | - |
| `PGBOUNCER_DEFAULT_POOL_SIZE` | PGBouncer | 20 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 6432
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgres-pgbouncer)
