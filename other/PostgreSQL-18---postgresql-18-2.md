# Deploy PostgreSQL 18 on Railway

PostgreSQL version 18, on Alpine Linux

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgresql-18-2)

## About

PostgreSQL 18 is the latest major version of the popular open-source relational database, continuing its focus on performance, reliability, and SQL standards compliance. It introduces incremental query planner improvements, better concurrency handling, and optimizations for modern workloads, making it a strong choice for both transactional and analytical applications.

Hosting PostgreSQL 18 involves running the database engine in a reliable environment with persistent storage, secure networking, and proper configuration. A typical deployment includes setting up automated backups, managing environment variables for credentials, monitoring resource usage, and handling upgrades. On managed platforms, infrastructure concerns such as provisioning, scaling, and restarts are handled automatically. This reduces operational overhead while still allowing fine-grained control over database settings, extensions, and performance tuning as application requirements grow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres:18-alpine | `postgres:18-alpine` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | name_db | Database name |
| `POSTGRES_USER` | (secret) | Database user |
| `POSTGRES_PASSWORD` | (secret) | Database password |

**Category:** Other

[View on Railway →](https://railway.com/deploy/postgresql-18-2)
