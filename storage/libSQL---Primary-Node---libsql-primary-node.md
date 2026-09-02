# Deploy libSQL - Primary Node on Railway

SQLite with features like embedded replicas and remote access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libsql-primary-node)

## About

libSQL - Primary Node is the authoritative writable node in a libSQL deployment. It accepts writes, maintains the source database state, and provides the replication source for one or more replica nodes. This template is specifically designed for a **primary node**, not a replica or public-facing database endpoint.

Hosting libSQL - Primary Node means running the main writable database instance that acts as the source of truth for your libSQL deployment.

This Railway template runs the official libSQL server in **primary mode** and stores persistent database data under `/data/sqld`. A Railway Volume should be mounted at that path so database state survives restarts and redeployments.

The primary node is intentionally designed to remain inside Railway's private network. It should communicate with replica nodes over private networking rather than being exposed directly to the public internet. Public application traffic should be handled by replica nodes deployed separately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LibSQL- Primary Node | `ghcr.io/tursodatabase/libsql-server:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SQLD_NODE` | primary | Define It's a primary or replica |
| `SQLD_DB_PATH` | /var/lib/sqld/ | Define where the storage is saved |

## Configuration

- **Volume:** `/var/lib/sqld/`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/libsql-primary-node)
