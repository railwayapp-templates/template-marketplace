# Deploy FerretDB | (Just Updated) MongoDB-Compatible Database on Postgres, Auth On, Persistent on Railway

MongoDB-compatible database on Postgres. Auth on, data on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ferretdb-or-just-updated-mongodb-compati)

## About

FerretDB is an open-source, MongoDB-compatible database. It speaks the MongoDB wire protocol, so existing drivers, `mongosh` and ORMs connect unchanged, and it stores the documents in PostgreSQL through the DocumentDB extension. This template deploys FerretDB 2.7.0 with the matching DocumentDB-enabled Postgres 17, authentication on, a generated password and a volume for the data. Nothing needs filling in.

The template runs two services. `postgres` is the official `ferretdb/postgres-documentdb` image, pinned by digest, with the extension created at first boot and its data on a volume mounted at `/var/lib/postgresql`. `ferretdb` is the official `ferretdb/ferretdb` image, pinned by digest, listening on port 27017 and reachable through a TCP proxy. Client logins are checked against the database user, so anonymous commands are rejected. Telemetry is disabled.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ferretdb | `ferretdb/ferretdb:2.7.0@sha256:5706414241eb84f0515512c37b46db0f1b1eac9e5ceb7e4c2523211c184b1985` | TCP service |
| postgres | `ferretdb/postgres-documentdb:17-0.107.0-ferretdb-2.7.0@sha256:2386795ec2aa7ae559304361979f1dc5708d383ee9020ae63dadc2940dfe58f7` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MONGO_USER` | ferretdb | (secret) |
| `MONGO_PASSWORD` | ferretdb | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **TCP Proxies:** 27017
- **Start command:** `/bin/sh -c 'export POSTGRES_DB=postgres; echo "[railway] uid=$(id -u) owner=$(stat -c %u:%g /var/lib/postgresql)"; exec docker-entrypoint.sh postgres'`
- **Volume:** `/var/lib/postgresql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/ferretdb-or-just-updated-mongodb-compati)
