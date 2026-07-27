# Deploy FerretDB 2 — Open Source MongoDB Alternative on Railway

MongoDB-compatible database on Postgres + DocumentDB — v2.x

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ferretdb-2-mongodb-alternative)

## About

FerretDB is an open-source MongoDB alternative — a proxy that speaks the MongoDB wire protocol while storing your data in PostgreSQL. Your existing MongoDB drivers, tools, and queries work unchanged (`mongosh`, Compass, any MongoDB client), but the data lives in Postgres with its ACID guarantees, mature backup ecosystem, and an Apache-2.0 license free of MongoDB's SSPL restrictions. This template deploys **FerretDB 2.x** correctly — with the DocumentDB-extended PostgreSQL that version 2 actually requires.

---

FerretDB 2.x has one hard requirement that trips most deployments, including older templates: **it does not work with plain PostgreSQL.** Version 2 stores documents using the DocumentDB extension, which builds native BSON support into Postgres for real MongoDB-compatible performance. That means the Postgres service must be the special `ghcr.io/ferretdb/postgres-documentdb` image, not a stock Postgres. A template pointing FerretDB 2.x at a normal Postgres simply fails.

This template uses the correct pairing: `ghcr.io/ferretdb/ferretdb:2.x` as the wire-protocol proxy and `ghcr.io/ferretdb/postgres-documentdb` as the DocumentDB-enabled backend, connected over Railway's private network. That's the difference between a working MongoDB-compatible database and a broken one — and it's where the older Railway templates, built for FerretDB 1.x against generic Postgres, fall short.

**FerretDB speaks the MongoDB wire protocol, not HTTP.** Clients connect on port `27017` as if to MongoDB. On Railway that means enabling the TCP proxy on the FerretDB service and using the proxy host and port as your connection string — HTTP routing won't reach it. Internal Railway services can connect over the private domain directly.

Why choose this over MongoDB: you keep MongoDB's developer experience and driver ecosystem while gaining PostgreSQL's ACID transactions, backup tooling, and an Apache-2.0 license — avoiding the SSPL terms that pushed many teams off MongoDB in the first place.

Typical cost: **~$5–10/month** on Railway for FerretDB and its Postgres backend. FerretDB is free and open source; MongoDB Atlas bills per cluster-hour and storage.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FerretDB | `ghcr.io/ferretdb/ferretdb` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/ferretdb-2-mongodb-alternative)
