# Deploy Hosted SQLite (libSQL) on Railway

SQLite over HTTP with a token made at deploy. Works with @libsql/client.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hosted-sqlite-libsql)

## About

libSQL is the open-source fork of SQLite behind Turso, and its server speaks SQL over HTTP. This template runs that server on a volume, generates a random token at deploy and switches auth on before the first request. Give any libSQL client the URL and the token and you have a shared SQLite database.

The template runs the official libsql-server image, pinned to a digest, as a single standalone node. It has no replication port and needs no configuration. The database lives on a Railway volume at `/var/lib/sqld`, so it survives redeploys. A healthcheck on `/health` holds traffic until the server is ready.

Each deploy gets its own 48-character token in `LIBSQL_AUTH_TOKEN`, and a request without it gets a 401. Once the deploy finishes, copy `LIBSQL_URL` and `LIBSQL_AUTH_TOKEN` from the libsql service's Variables tab into your app. A service in the same project can reference them as `${{libsql.LIBSQL_URL}}` and `${{libsql.LIBSQL_AUTH_TOKEN}}`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| libsql | `ghcr.io/tursodatabase/libsql-server@sha256:6dd3eb276d9d3604e4a48ac4a999a2e267814732d57d7e94c04ba71482333a67` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SQLD_NODE` | standalone | One server with no replication port. Leave as is. |
| `LIBSQL_URL` | - | The database URL clients connect to. Use it as url in your libSQL client. |
| `SQLD_HTTP_AUTH` | - | Turns on auth with LIBSQL_AUTH_TOKEN. Leave as is. |
| `LIBSQL_AUTH_TOKEN` | (secret) | The token clients send, made fresh for each deploy. Use it as authToken in your libSQL client. |
| `SQLD_HTTP_LISTEN_ADDR` | 0.0.0.0:8080 | Where the server listens. Leave as is. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/sqld`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/hosted-sqlite-libsql)
