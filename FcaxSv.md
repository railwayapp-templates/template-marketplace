# Deploy PostgreSQL with Wal2Json Plugin on Railway

A quick setup for PostgreSQL including the Wal2Json Plugin in the template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/FcaxSv)

## About

A PostgreSQL deployment template for Railway, enabling quick setup with the Wal2Json plugin.

For more details about the Wal2Json plugin -> https://github.com/eulerto/wal2json

**About Wal2Json**

PostgreSQL records all changes—INSERTs, UPDATEs, and DELETEs—in a log called the Write-Ahead Log (WAL). This log ensures database consistency and allows for replication and recovery. However, WAL data is stored in a format optimized for internal database operations, not direct consumption.

Wal2Json bridges this gap by **converting WAL changes into structured JSON output**, making it easier for applications to process database updates in real time. This is especially useful for data replication, change auditing, event-driven architectures, and streaming data to external systems. The plugin works by using logical decoding, allowing applications to read database changes without requiring full physical replication.

Depending on configuration, UPDATE and DELETE operations can include previous row versions, making it possible to track before-and-after states of data changes. Changes can be consumed via logical replication slots for continuous streaming or queried directly using a SQL API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostgreSQL-With-Wal2Json | [nMessage/Meilisync-on-railway](https://github.com/nMessage/Meilisync-on-railway) (branch: main) (root: postgresql_wal2json) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | - | The name of the DATABASE you are using. |
| `DATABASE_URL` | - | URL to connect to Postgres database for services within the project |
| `POSTGRES_USER` | (secret) | Generator for DB username |
| `POSTGRES_PASSWORD` | (secret) | Generator for DB Password |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to this Postgres database |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/FcaxSv)
