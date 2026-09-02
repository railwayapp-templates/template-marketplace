# Deploy libSQL - Standalone on Railway

SQLite with features like embedded replicas and remote accesses.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libsql-standalone-1)

## About

libSQL - Standalone is a single-node libSQL deployment that runs independently, without a Primary Node or Replicas. It provides a simple, SQLite-compatible database server for applications running within the same Railway private network. This template is designed for **private internal use**, with no authentication and no public networking enabled.

Hosting libSQL - Standalone means running a self-contained libSQL database instance that does not participate in replication.

Unlike the Primary and Replica templates, a standalone node does not act as a replication source and does not synchronize its database from other nodes. All database state is stored and managed locally by the standalone instance.

This Railway template is intentionally configured without JWT authentication and without Railway Public Networking. It is designed to be accessed only by trusted services via the Railway Private Network.

Persistent database data is stored at `/data/sqld`, which must be backed by a Railway Volume to ensure the database persists across service restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LibSQL- Standalone | `ghcr.io/tursodatabase/libsql-server:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SQLD_NODE` | standalone | Define It's a primary or replica |
| `SQLD_DB_PATH` | /var/lib/sqld/ | Define where the storage is saved |

## Configuration

- **Volume:** `/var/lib/sqld/`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/libsql-standalone-1)
