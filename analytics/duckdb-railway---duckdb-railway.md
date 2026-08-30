# Deploy duckdb-railway on Railway

Host DuckDB as a secure SQL REST API on Railway🪿

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/duckdb-railway)

## About

DuckDB is a fast, in-process analytical SQL database for running complex queries over large datasets without a separate server. This template hosts it as a persistent, authenticated HTTP query service on Railway — a ready-to-use REST API backed by a DuckDB file on a volume, so your data survives redeploys and stays secure by default.

DuckDB normally runs embedded inside your application — there's no server to connect to. This template wraps it in a small FastAPI service exposing a `/query` REST endpoint, giving you a hosted DuckDB you can call over HTTP from any client. A Railway volume mounted at `/data` stores the database file, so tables and data persist across deployments. Requests require an auto-generated API key, and the database is read-only by default unless you set `DUCKDB_ALLOW_WRITE=true`. It's a lightweight way to get an always-on analytical SQL endpoint for dashboards, analytics backends, and data APIs — without running or managing database infrastructure yourself.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| duckdb | [8u9i/duckdb-railway](https://github.com/8u9i/duckdb-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | port |
| `DATABASE_PATH` | /data/duckdb.db | database location |
| `DUCKDB_API_KEY` | (secret) | secret auto gen |
| `DUCKDB_ALLOW_WRITE` | false | read/write operation |
| `DUCKDB_QUERY_TIMEOUT_MS` | 30000 | max timeout |

## Configuration

- **Start command:** `uvicorn main:app --host 0.0.0.0 --port 8080`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Analytics · **Languages:** Python, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/duckdb-railway)
