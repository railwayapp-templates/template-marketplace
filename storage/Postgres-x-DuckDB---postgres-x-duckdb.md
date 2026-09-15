# Deploy Postgres x DuckDB on Railway

Postgres 18 with DuckDB using official duckdb image

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-x-duckdb)

## About

Postgres x DuckDB is a PostgreSQL 18 database with the `pg_duckdb` extension preloaded, embedding DuckDB's vectorized analytics engine directly inside Postgres. Run fast analytical queries against your existing tables, or read Parquet, CSV, and Iceberg data straight from object storage — all over the Postgres wire protocol your tools already speak.

Hosting Postgres x DuckDB means running a stateful database, so persistence is the primary concern. This template mounts a volume at `/var/lib/postgresql`, the directory PostgreSQL 18 uses for its version-specific cluster, so data survives restarts and redeploys. The image is pinned by immutable digest to PostgreSQL 18 with `pg_duckdb` v1.1.1, making every deployment reproducible. The extension is loaded through `shared_preload_libraries` and created in the default database on first boot, so there is no manual setup step. Analytical queries are memory-hungry by nature, so size the service to your working set and enable a TCP proxy to connect from outside Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres x DuckDB | `ghcr.io/lassejlv/pgduckdb:18` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | Name of the database created on first boot, and the one where the pg_duckdb extension is installed automatically. Defaults to postgres. |
| `DATABASE_URL` | - | Connection string for reaching this database from other services in the same Railway project, over the private network. Reference it from your app as ${{Postgres x DuckDB.DATABASE_URL}} rather than copying the value — it is built automatically from the user, password, and database name above. |
| `POSTGRES_USER` | (secret) | The superuser account created when the database is first initialized. Leave as postgres unless you have a reason to change it. Cannot be changed after the first deploy without wiping the volume. |
| `POSTGRES_PASSWORD` | (secret) | The password for the superuser above. Generate a strong random value and keep it secret — it grants full access to the database. Cannot be changed here after the first deploy; use ALTER ROLE in SQL instead. |
| `DATABASE_PUBLIC_URL` | - | Connection string for reaching this database from outside Railway — local psql, a BI tool, or a migration script. Requires the TCP proxy to be enabled, and traffic over it counts toward egress. Prefer DATABASE_URL for service-to-service connections. |
| `POSTGRES_INITDB_ARGS` | --data-checksums --auth-host=scram-sha-256 |  Extra flags passed to initdb the very first time the database is created, such as --auth-host=scram-sha-256 to set password encryption or --locale/--encoding for collation. Ignored on every later boot. Leave as provided unless you need specific locale or auth settings. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgres-x-duckdb)
