# Deploy pluto on Railway

Data notebook for TypeScript and SQL — Postgres, DuckDB, SQLite and Polars

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pluto)

## About

Pluto is a self-contained data notebook for TypeScript and SQL. One binary bundles a TypeScript/JavaScript kernel, Postgres, SQLite, DuckDB and Polars, with a browser UI that has type-aware completions. Query CSV and Parquet files, mix SQL with code, render tables and HTML, and drive it from AI agents over MCP.

Pluto ships as a single Docker image (`ghcr.io/junkiez/pluto`) with no external services: every database engine is embedded and stores its data next to the notebook files. Hosting it needs one service with a persistent volume mounted at `/data`, where notebooks, Postgres/SQLite/DuckDB databases and uploaded files live. Set `PLUTO_PASS` to protect the instance, since notebook cells run arbitrary code. Railway provides `PORT` automatically. Redeploys keep all notebooks and data on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| junkiez/pluto:latest | `ghcr.io/junkiez/pluto:latest` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `PLUTO_PASS` | Access password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/pluto)
