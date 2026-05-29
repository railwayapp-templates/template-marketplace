# Deploy PostgreSQL Extensions on Railway

PostgreSQL + pgvector, postgis, pg_trgm, pgmq, pg_cron, pgcrypto and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-extensions)

## About

PostgreSQL Extensions is a production-ready PostgreSQL 18 Docker image with 11 popular extensions pre-installed including pgvector, PostGIS, pgmq, pg_cron, and more. Enable any combination at deploy time with a single environment variable. No compilation or manual setup.

Hosting PostgreSQL with extensions typically requires compiling C libraries from source, managing shared library paths, configuring `shared_preload_libraries`, and ensuring extensions are created in the right databases. 
This template handles all of that automatically. Extensions are pre-compiled into the image, and a lightweight entrypoint script validates your selection, configures preloaded libraries, and runs `CREATE EXTENSION IF NOT EXISTS` on boot. SSL is enabled by default with auto-generated certificates. Just set the `EXTENSIONS` environment variable and deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/karan316/postgres-extensions` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `EXTENSIONS` | pgvector,pg_trgm,pgmq,pg_cron,pg_stat_statements,pg_partman,pgcrypto,postgis,uuid-ossp,btree_gin,hstore |
| `POSTGRES_DB` | postgres |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/postgresql-extensions)
