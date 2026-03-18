# Deploy Supabase Postgres on Railway

Supabase Postgres with 50+ extensions and optimized defaults

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/supabase-postgres-1)

## About

Supabase Postgres is a production-hardened PostgreSQL image packed with 50+ extensions including PostGIS, pgvector, pg_cron, and pgjwt. It includes optimized configurations, security defaults, and popular extensions pre-installed, eliminating the setup overhead of vanilla Postgres while maintaining full PostgreSQL compatibility.

Deploying Supabase Postgres gives you an enterprise-grade PostgreSQL setup without manual extension compilation, configuration tuning, or custom dockerfiles to maintain. 

The image includes extensions for 
- geospatial data (PostGIS)
- vector similarity search (pgvector)
- time-series data (TimescaleDB)
- job scheduling (pg_cron)
- authentication (pgjwt). 
- auditing (pg_audit)
- and even more :tm:

It comes pre-configured with sensible memory settings, connection pooling parameters, and logging options as well.

Railway handles persistent volume mounting, automated backups (if you're on the pro plan or above), and network configuration, so you get a production-ready database in one click instead of spending hours or days on setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Supabase Postgres | `supabase/postgres:17.6.1.056` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database name; change as you'd like |
| `DATABASE_URL` | - | The internal database URL for use within your services |
| `POSTGRES_USER` | (secret) | postgres user name; change as needed |
| `POSTGRES_PASSWORD` | (secret) | The password for the default user |
| `DATABASE_PUBLIC_URL` | - | The public URL for your database |
| `DATABASE_PRIVATE_URL` | - | The private URL for your database; references DATABASE_URL for convenience |

## Configuration

- **Start command:** `docker-entrypoint.sh -c config_file=/etc/postgresql/postgresql.conf -c log_destination=jsonlog`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/template/supabase-postgres-1)
