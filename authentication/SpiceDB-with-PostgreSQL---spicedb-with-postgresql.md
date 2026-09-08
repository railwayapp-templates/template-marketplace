# Deploy SpiceDB with PostgreSQL on Railway

Relationship authorization with PostgreSQL and authenticated API access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spicedb-with-postgresql)

## About

SpiceDB 1.56.1 provides relationship-based authorization backed by a dedicated PostgreSQL database. The startup adapter migrates the datastore before serving and retries while a cold database becomes available.

Verified in an isolated Railway deployment. See the validation scope below for the checks performed and operational limits.

The template defines 2 services with pinned container digests, generated deployment secrets, explicit service references, and persistent volumes for stateful dependencies. Repository-backed adapters build from `codex/remaining-template-drafts`. Railway terminates HTTPS for the public endpoints; databases and internal workers have no public TCP proxies. Cold-start initialization was verified in a fresh Railway project. Each deployment has its own database and storage resources. Backups are not scheduled by this template, and filesystem-backed services should remain single-replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17@sha256:67f41722b7a8cbdb868a44a4995c846eddfdc2973bccb291ce937dce88ad5675` | Database |
| spicedb | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/remaining-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | spicedb | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `SPICEDB_GRPC_ADDR` | spicedb | [::]:50051 | Private authenticated gRPC listener. No public TCP proxy is created. |
| `SPICEDB_HTTP_ADDR` | spicedb | [::]:8443 | HTTP gateway listener; Railway terminates public TLS. |
| `SPICEDB_HTTP_ENABLED` | spicedb | true | Enable the authenticated HTTP gateway for Railway HTTPS access. |
| `SPICEDB_DATASTORE_ENGINE` | spicedb | postgres | Use the included PostgreSQL datastore. |
| `SPICEDB_DATASTORE_CONN_URI` | spicedb | - | Spicedb datastore conn uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SPICEDB_GRPC_PRESHARED_KEY` | spicedb | - | Generated spicedb grpc preshared key. Keep private and preserve with backups. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** JavaScript, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/spicedb-with-postgresql)
