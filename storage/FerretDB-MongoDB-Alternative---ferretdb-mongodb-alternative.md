# Deploy FerretDB (MongoDB Alternative) on Railway

Open-source MongoDB alternative. FerretDB 2.x + Postgres DocumentDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ferretdb-mongodb-alternative)

## About

FerretDB is the truly open-source MongoDB alternative. It speaks the MongoDB wire protocol — so your existing drivers, Mongoose/​Prisma code, `mongosh`, and Compass keep working — while storing data in reliable PostgreSQL with Microsoft's DocumentDB extension. No SSPL license worries, no vendor lock-in, real Postgres durability underneath.

This template deploys the full FerretDB 2.x stack in one click: a PostgreSQL 17 instance with the DocumentDB extension (the storage engine FerretDB 2.x requires) on a persistent Railway volume, plus the FerretDB proxy wired to it over Railway's private network. A strong database password is auto-generated at deploy time, and a public TCP endpoint is exposed on the MongoDB port (27017) so you can connect from anywhere. Grab your connection string from the ferretdb service and you're live in about a minute.

**Connect from your app:**

```
mongodb://:@:/
```

Find the TCP proxy domain/port on the ferretdb service → Settings → Public Networking. The user and password are on the Postgres service variables. Apps deployed inside the same Railway project can use the private hostname `ferretdb.railway.internal:27017` instead — free, faster, and never leaves Railway's network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ferretdb | `ghcr.io/ferretdb/ferretdb:2.7.0` | TCP service |
| Postgres | `ghcr.io/ferretdb/postgres-documentdb:17-0.107.0-ferretdb-2.7.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `FERRETDB_POSTGRESQL_URL` | ferretdb | - | Connection to the DocumentDB-enabled Postgres over Railway private networking. Do not change. |
| `POSTGRES_DB` | Postgres | postgres | Database name backing FerretDB. Keep as postgres. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL superuser name used by FerretDB. Do not change after first deploy. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated PostgreSQL password. Also your MongoDB connection password. |

## Configuration

- **TCP Proxies:** 27017
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/ferretdb-mongodb-alternative)
