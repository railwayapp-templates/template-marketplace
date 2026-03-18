# Deploy PGroonga on Railway

Enable super-fast, multilingual full-text search within PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pgroonga)

## About

Enable super-fast, multilingual full-text search within PostgreSQL.

PGroonga is a PostgreSQL extension that adds advanced full-text search capabilities for all languages.
Unlike PostgreSQL’s built-in full-text search, which mainly supports alphabets and digits, PGroonga can index and query text in languages such as Japanese or Chinese - all with zero ETL.

Also, PGroonga can instantly search newly inserted or updated data without reindexing or read locks, making it ideal for real-time workloads.
Since it runs entirely inside PostgreSQL, it maintains ACID compliance, replication, and transaction safety.

Railway’s scalable infrastructure makes it easy to deploy PGroonga with automatic scaling, persistent storage, and one-click setup.

### Demo Project: Redmine + PGroonga Full-Text Search

To demonstrate how this template can be used in a real-world application, we provide a demo project that integrates **Redmine** with the **Redmine Full Text Search plugin**, powered by **PGroonga**, on Railway.

This demo shows how to enable multilingual full-text search in Redmine using PGroonga without introducing any external search services.

Demo repository:  
https://github.com/pgroonga/redmine-full-text-search-railway-sample

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PGroonga | `groonga/pgroonga:latest-debian-18` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PGMAJOR` | 18 | The PostgreSQL major version |
| `POSTGRES_DB` | railway | Name of the default database |
| `DATABASE_URL` | - | Public URL |
| `POSTGRES_USER` | (secret) | Name of the initial user |
| `PGHOST_PRIVATE` | - | Private domain |
| `PGPORT_PRIVATE` | 5432 | Private port |
| `POSTGRES_PASSWORD` | (secret) | The Postgres password |
| `DATABASE_URL_PRIVATE` | - | Private URL |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/pgroonga)
