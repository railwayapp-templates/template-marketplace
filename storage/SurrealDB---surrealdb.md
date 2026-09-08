# Deploy SurrealDB on Railway

Multi-model database for documents, graphs and vectors in one engine

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/surrealdb)

## About

Deploy SurrealDB to get one database that stores documents, graph edges, vectors, time-series and key-value data behind a single query language. Teams normally reach for Postgres for relational data, MongoDB for documents and Neo4j for relationships, then spend the project keeping them in sync. SurrealQL removes that split: a record can hold nested objects, be joined by graph edges written `-&gt;edge-&gt;`, and be searched by full-text or vector index, in one statement. Written in Rust, it speaks HTTP and WebSocket on one port and enforces record-level permissions, which is why it is often used as an application's entire backend.

Self-host SurrealDB here as three services. `surrealdb` runs the database on the official `surrealdb/surrealdb:v3.2` image, storing data with RocksDB on a persistent volume, on the private network with no public URL. `console` serves Surrealist, SurrealDB's official browser console, and reverse-proxies the database API from the same origin, so one HTTPS address gives you both a query workbench and the `wss://.../rpc` endpoint your application connects to. `backup` exports every namespace and database on a schedule to a Railway object storage bucket, so your data survives more than the disk it sits on.

![Console, backup worker and SurrealDB services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788761038/surrealdb-architecture.png)

SurrealDB is built to be the whole data layer of an application. It answers a problem most teams meet in a product's second year: the relational schema is fine, but half the interesting questions are about relationships, and answering them means joining across three systems. Self-host it when you want that consolidation under your own control, when queries are graph-shaped, or when permissions belong in the database rather than in every service that talks to it.

- SurrealQL: SQL-like, with graph traversal, nested records and computed fields
- Document, graph, vector, geospatial, full-text and time-series data in one engine
- Row-level permissions and record access rules defined in the schema itself
- Live queries that push changes to connected clients over WebSocket
- Official SDKs for Rust, JavaScript, Python, Go, Java and .NET

The architecture keeps the roles separate. The database is private, so nothing reaches it but the console and your own services. The console is the only public surface, and because it proxies the database's routes on its own origin, browser clients need no CORS configuration. The backup worker holds no state: it reads through the API and writes elsewhere, which is what makes it useful when a volume is lost.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| surrealdb | `surrealdb/surrealdb:v3.2` | Database |
| backup | [gridalpha/surrealdb-railway](https://github.com/gridalpha/surrealdb-railway) | Worker |
| console | [gridalpha/surrealdb-railway](https://github.com/gridalpha/surrealdb-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | surrealdb | 8000 | Port Railway health-checks |
| `SURREAL_LOG` | surrealdb | info | Server log level |
| `SURREAL_BIND` | surrealdb | [::]:8000 | Dual-stack listen address for private peers |
| `SURREAL_PASS` | surrealdb | - | Initial root password, persisted on first boot |
| `SURREAL_PATH` | surrealdb | rocksdb:/data/surreal.db | RocksDB store below the volume mount root |
| `SURREAL_USER` | surrealdb | (secret) | Initial root username |
| `SURREAL_CLIENT_IP` | surrealdb | X-Forwarded-For | Header the server reads client IPs from |
| `SURREAL_NO_IDENTIFICATION_HEADERS` | surrealdb | true | Suppress server name and version headers |
| `PORT` | backup | 8080 | Port serving the liveness endpoint |
| `S3_BUCKET` | backup | - | Bucket holding the dumps |
| `S3_REGION` | backup | - | SigV4 signing region |
| `S3_ENDPOINT` | backup | - | S3 endpoint URL |
| `SURREAL_PASS` | backup | - | Root password for exports |
| `SURREAL_USER` | backup | (secret) | Root username for exports |
| `BACKUP_PREFIX` | backup | surrealdb | Key prefix for uploaded dumps |
| `BACKUP_RETENTION` | backup | 14 | Dumps kept per database |
| `S3_ACCESS_KEY_ID` | backup | - | Bucket access key |
| `SURREAL_ENDPOINT` | backup | - | Database base URL |
| `S3_SECRET_ACCESS_KEY` | backup | (secret) | Bucket secret key |
| `BACKUP_INTERVAL_SECONDS` | backup | 86400 | Seconds between backup cycles |
| `PORT` | console | 8080 | HTTP listening port |
| `SURREAL_UPSTREAM` | console | - | Database the console proxies |

## Configuration

- **Start command:** `/surreal start`
- **Healthcheck:** `/health`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/surrealdb)
