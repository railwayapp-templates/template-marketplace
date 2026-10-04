# Deploy SurrealDB 3 | (Just Updated) Multi-Model Database, Login and Quiet Logs Set on Railway

SurrealDB 3. Root login set at deploy, data on a volume, quiet logs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/surrealdb-3-or-just-updated-multi-model-)

## About

SurrealDB is an open-source multi-model database. One engine serves documents, graphs, relational
tables, full-text search and vector search through SurrealQL, over HTTP and WebSocket, with
built-in users, scopes and record-level permissions.

This template runs SurrealDB 3.3 from the official image, pinned by digest, as a single service
with a public Railway domain and a volume for its data.

- **A root login is set from the first request.** A password is generated per deploy
  (`SURREAL_PASS`, user `root`). An anonymous query returned `403 Anonymous access not allowed`;
  the same query with the generated credentials ran.
- **Data survives redeploys.** SurrealDB's storage engine writes to a volume mounted at `/data`.
  A record created before a redeploy was still there afterwards.
- **Logs stay readable.** The log level is `info`. An idle deploy printed about 45 lines in its
  first minutes and no trace or debug lines, so the Railway log view shows your queries and errors
  instead of storage-engine noise.
- **Outbound network calls from queries are off.** SurrealDB's defaults are kept, so
  `http::get()` from a query is refused (`Access to network target ... is not allowed`) and the
  database cannot be used to reach other services on your private network.
- **A healthcheck is set** on `/health`, so a deploy that does not start is reported as failed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| surrealdb | `surrealdb/surrealdb:v3.3.0@sha256:681c6c22c287421b5c7d99e0fde79b6e0d32c36c1ddeaab2762a1661cb04cd20` | Web service |

## Configuration

- **Start command:** `/surreal start --log info --user root --bind [::]:8080 surrealkv:///data/surrealdb`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/surrealdb-3-or-just-updated-multi-model-)
