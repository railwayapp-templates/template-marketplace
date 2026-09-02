# Deploy libSQL - Replica Node on Railway

SQLite with features like embedded replicas and remote access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libsql-replica-node)

## About

libSQL - Replica Node is a read-oriented node that continuously synchronizes its database state from a libSQL Primary Node. It provides a locally accessible copy of the database and can serve application traffic without exposing the primary node directly. This template is specifically designed for a **replica node**, not a primary.

Hosting libSQL - Replica Node means running a database node that connects to an existing libSQL Primary Node and replicates its database state.

This Railway template runs the official libSQL server in **replica mode** using `SQLD_NODE=replica`. The replica requires `SQLD_PRIMARY_URL` to point to the primary node's gRPC endpoint, ideally through Railway Private Networking.

Unlike the Primary Node template, this Replica Node is intended to be the public-facing database endpoint. Railway Public Networking can be enabled on the replica so applications can access the database without exposing the authoritative primary node directly to the internet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LibSQL- Replica Node | `ghcr.io/tursodatabase/libsql-server:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SQLD_NODE` | replica | Define It's a primary or replica |
| `SQLD_DB_PATH` | /var/lib/sqld/ | Define where the storage is saved |
| `SQLD_PRIMARY_URL` | - | Define where is the primary node |
| `SQLD_AUTH_JWT_KEY` | - | JWT decoding key used to authenticate clients in the Hrana and HTTP APIs |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/sqld/`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/libsql-replica-node)
