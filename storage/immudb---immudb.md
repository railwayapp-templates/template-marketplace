# Deploy immudb on Railway

Immutable database with generated admin and backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/immudb)

## About

immudb is an append-only database with cryptographic verification, SQL, key-value, and document APIs. This template runs stable 1.11.1 with a generated administrator password and durable storage.

Authenticate as `immudb` with `IMMUDB_ADMIN_PASSWORD`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| immudb | [monotykamary/railway-template-immudb](https://github.com/monotykamary/railway-template-immudb) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Public HTTP API and console port. |
| `IMMUDB_DIR` | /data/immudb | Persistent database directory. |
| `IMMUDB_AUTH` | true | Require authentication. |
| `IMMUDB_PORT` | 3322 | Private native gRPC port. |
| `IMMUDB_ADDRESS` | 0.0.0.0 | Bind address. |
| `IMMUDB_PGSQL_SERVER` | false | Disable plaintext PostgreSQL compatibility listener. |
| `IMMUDB_ADMIN_PASSWORD` | (secret) | Generated immudb administrator password. |

## Configuration

- **Healthcheck:** `/api/v2/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/immudb)
