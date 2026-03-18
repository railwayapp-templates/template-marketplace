# Deploy Sequin on Railway

Stream data out of your Postgres database with Sequin.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/TXSiv2)

## About

Sequin streams data out of your Postgres database.

You can use it to replicate data from your existing tables to other apps, databases, caches, materialized views, or frontend clients. Or you can use it to build event processing workflows, such as triggering side effects when data in Postgres changes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Sequin | `sequin/sequin:latest` | Web service |
| KeyDB | `eqalpha/keydb:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Sequin | 7376 | - |
| `PG_IPV6` | Sequin | true | - |
| `VAULT_KEY` | Sequin | - | Key for encrypting database secrets |
| `REDIS_IPV6` | Sequin | true | - |
| `PG_PASSWORD` | Sequin | (secret) | - |
| `PG_USERNAME` | Sequin | (secret) | - |
| `PG_POOL_SIZE` | Sequin | 20 | - |
| `SECRET_KEY_BASE` | Sequin | (secret) | - |
| `SEQUIN_METRICS_USER` | Sequin | (secret) | - |
| `SEQUIN_METRICS_PASSWORD` | Sequin | (secret) | - |
| `KEYDB_URL` | KeyDB | - | URL to connect to KeyDB over the private network |
| `KEYDB_HOST` | KeyDB | - | Railway private domain name |
| `KEYDB_PORT` | KeyDB | 6379 | Port to connect to KeyDB over the private network |
| `KEYDB_USER` | KeyDB | (secret) | Default user to connect to KeyDB |
| `KEYDB_PASSWORD` | KeyDB | (secret) | Password to connect to KeyDB |
| `KEYDB_PUBLIC_URL` | KeyDB | - | URL to connect to KeyDB Publically |
| `KEYDB_PUBLIC_HOST` | KeyDB | - | Railway public TCP domain name |
| `KEYDB_PUBLIC_PORT` | KeyDB | - | Port to connect to KeyDB Publically |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec keydb-server /etc/keydb/keydb.conf --server-threads 16 --always-show-logo no --appendonly yes --requirepass ${KEYDB_PASSWORD} --port ${KEYDB_PORT}"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec wrapper.sh postgres --port=${PGPORT} -c wal_level=logical"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/TXSiv2)
