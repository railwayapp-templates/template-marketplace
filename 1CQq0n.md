# Deploy PostgreSQL HA Cluster (pgvector) on Railway

Postgres cluster for high availability and redundancy with pgvector

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/1CQq0n)

## About

Deploy a PostgreSQL HA with Repmgr that extends the official Railway [template](https://railway.com/template/ha-postgres) and comes with the pgvector extension preinstalled.

Run `CREATE EXTENSION vector;` after deploying the template to activate the pgvector extension.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pg-2 | `samscolari/postgresql-repmgr-pgvector` | Database |
| pg-0 | `samscolari/postgresql-repmgr-pgvector` | Database |
| pg-1 | `samscolari/postgresql-repmgr-pgvector` | Database |
| pgpool | `bitnami/pgpool:latest` | TCP service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REPMGR_PASSWORD` | pg-2 | (secret) |
| `REPMGR_USERNAME` | pg-2 | (secret) |
| `REPMGR_NODE_NAME` | pg-2 | pg-2 |
| `REPMGR_NODE_TYPE` | pg-2 | data |
| `POSTGRESQL_PASSWORD` | pg-2 | (secret) |
| `POSTGRESQL_USERNAME` | pg-2 | (secret) |
| `REPMGR_PARTNER_NODES` | pg-2 | pg-0,pg-1,pg-2 |
| `REPMGR_PASSWORD` | pg-0 | (secret) |
| `REPMGR_USERNAME` | pg-0 | (secret) |
| `REPMGR_NODE_NAME` | pg-0 | pg-0 |
| `REPMGR_NODE_TYPE` | pg-0 | data |
| `POSTGRESQL_PASSWORD` | pg-0 | (secret) |
| `POSTGRESQL_USERNAME` | pg-0 | (secret) |
| `REPMGR_PARTNER_NODES` | pg-0 | pg-0,pg-1,pg-2 |
| `REPMGR_PASSWORD` | pg-1 | (secret) |
| `REPMGR_USERNAME` | pg-1 | (secret) |
| `REPMGR_NODE_NAME` | pg-1 | pg-1 |
| `REPMGR_NODE_TYPE` | pg-1 | data |
| `POSTGRESQL_PASSWORD` | pg-1 | (secret) |
| `POSTGRESQL_USERNAME` | pg-1 | (secret) |
| `REPMGR_PARTNER_NODES` | pg-1 | pg-0,pg-1,pg-2 |
| `PGPOOL_ENABLE_LDAP` | pgpool | no |
| `PGPOOL_SR_CHECK_USER` | pgpool | (secret) |
| `PGPOOL_ADMIN_PASSWORD` | pgpool | (secret) |
| `PGPOOL_ADMIN_USERNAME` | pgpool | (secret) |
| `PGPOOL_POSTGRES_PASSWORD` | pgpool | (secret) |
| `PGPOOL_POSTGRES_USERNAME` | pgpool | (secret) |
| `PGPOOL_SR_CHECK_PASSWORD` | pgpool | (secret) |
| `PGPOOL_HEALTH_CHECK_MAX_RETRIES` | pgpool | 10 |
| `PGPOOL_HEALTH_CHECK_RETRY_DELAY` | pgpool | 30 |

## Configuration

- **Volume:** `/bitnami/postgresql`
- **Start command:** `/bin/sh -c "sleep 75 && /opt/bitnami/scripts/pgpool/entrypoint.sh /opt/bitnami/scripts/pgpool/run.sh"`
- **TCP Proxies:** 5432

**Category:** Storage

[View on Railway →](https://railway.com/template/1CQq0n)
