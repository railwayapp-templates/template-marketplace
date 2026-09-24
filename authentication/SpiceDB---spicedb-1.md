# Deploy SpiceDB on Railway

SpiceDB 1.56 Zanzibar-style permissions database with Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spicedb-1)

## About

SpiceDB is an open-source permissions database inspired by Google Zanzibar. You describe your authorization model as a schema of resources, relations and permissions, store relationships, and ask SpiceDB whether a user can do something. Official client libraries for Go, Node.js, Python, Java, Ruby and .NET call it over gRPC or HTTP.

This template deploys SpiceDB v1.56.2 with a Railway Postgres database as its datastore. On every start the service runs `spicedb datastore migrate head` and then serves. The gRPC API listens on the private network on port 50051. The HTTP API is exposed on the public domain for clients outside Railway. Every request needs the preshared key generated at deploy time, sent as a bearer token. SpiceDB keeps no local state, and Postgres storage grows with the number of relationships, so the Hobby plan is enough to start. SpiceDB's Watch API stays off until Postgres has `track_commit_timestamp` enabled (see below).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| spicedb | `authzed/spicedb:v1.56.2-debug` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | spicedb | 8443 |
| `SPICEDB_HTTP_ENABLED` | spicedb | true |
| `SPICEDB_DATASTORE_ENGINE` | spicedb | postgres |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'spicedb datastore migrate head && exec spicedb serve'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/spicedb-1)
