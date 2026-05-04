# Deploy pg_duckdb (v1.11 /Postgres 18) on Railway

DuckDB powered Postgres for analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgduckdb-v111-postgres-18)

## About

[pg_duckdb](https://github.com/duckdb/pg_duckdb) is a PostgreSQL extension that integrates DuckDB's high-performance, columnar-vectorized analytics engine directly into PostgreSQL. 

It enables seamless execution of analytical queries, supports querying data lakes (Parquet, CSV, JSON, Iceberg, Delta Lake) from cloud storage, and integrates with platforms like MotherDuck for cloud analytics.

---

Hosting pg_duckdb involves deploying a PostgreSQL instance with the `pg_duckdb` extension enabled. 

This allows you to leverage DuckDB's analytics capabilities within PostgreSQL, enabling high-speed queries on both local tables and external data lakes without data export. 

The extension accelerates analytical workloads, supports modern data formats, and can integrate with cloud platforms like MotherDuck for scalable compute. 

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pg_duckdb | `pgduckdb/pgduckdb:18-v1.1.1` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Initial database created on first boot only; ignored after init |
| `DATABASE_URL` | - | Internal connection string — use from other Railway services, faster than public URL |
| `POSTGRES_USER` | (secret) | Superuser name set on first boot; cannot start with "pg_" |
| `MOTHERDUCK_TOKEN` | (secret) | MotherDuck access token; when non-empty, auto-enables duckdb.motherduck_enabled=true. Leave unset/empty to skip MotherDuck. |
| `POSTGRES_PASSWORD` | (secret) | Superuser password set on first boot; rotate since previous value leaked |
| `DATABASE_PUBLIC_URL` | - | External connection string — use from laptop, CI, services outside Railway |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/pgduckdb-v111-postgres-18)
