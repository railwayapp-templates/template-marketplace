# Deploy DuckDB on Railway

Analyze data fast with DuckDB and a modern Web UI. Deploy in 1-click 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/duckdb)

## About

DuckDB is a high-performance analytical SQL database built for OLAP workloads, local analytics, and direct querying of structured data such as CSV, Parquet, and JSON. This template pairs DuckDB with a modern Web UI, giving you a lightweight analytical stack that is easy to deploy and access on Railway.

Hosting DuckDB on Railway gives you a persistent analytical database with a browser-based interface for querying, exploring, and working with structured data.

This template separates the stack into two services: DuckDB runs privately as the analytical backend, while Duck-UI provides the public Web UI. DuckDB data is stored on persistent Railway storage, while the UI communicates with the backend through Railway's private network.

This architecture keeps the database itself isolated from the public internet while still providing a convenient interface for SQL analytics, data exploration, and lightweight analytical workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| duck-ui | `ghcr.io/caioricciuti/duck-ui:latest` | Web service |
| duckdb | `duckdb/duckdb:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | duck-ui | 5522 | Public Web UI port |
| `DUCK_UI_EXTERNAL_HOST` | duck-ui | - | Private DuckDB HTTP server |
| `DUCK_UI_EXTERNAL_PORT` | duck-ui | 9999 | DuckDB HTTP server port |
| `DUCK_UI_EXTERNAL_API_KEY` | duck-ui | (secret) | Shared API key for DuckDB authentication |
| `DUCK_UI_DUCKDB_WASM_USE_CDN` | duck-ui | false | Use bundled WASM assets instead of external CDN |
| `DUCK_UI_EXTERNAL_DATABASE_NAME` | duck-ui | duckdb | Name displayed for the external database |
| `DUCK_UI_EXTERNAL_CONNECTION_NAME` | duck-ui | DuckDB | Display name shown in Duck-UI |
| `DUCK_UI_ALLOW_UNSIGNED_EXTENSIONS` | duck-ui | false | Keep unsigned DuckDB extensions disabled |
| `PORT` | duckdb | 9999 | Private HTTP API port for DuckDB |
| `DUCKDB_API_KEY` | duckdb | (secret) | API key used by Duck-UI |
| `DUCKDB_DATABASE` | duckdb | /data/duckdb.db | Persistent DuckDB database file |
| `DUCKDB_HTTPSERVER_DEBUG` | duckdb | 0 | Disable verbose server logs |
| `DUCKDB_HTTPSERVER_FOREGROUND` | duckdb | 1 | Keep HTTP server running in foreground |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `duckdb /data/duckdb.db -cmd "INSTALL httpserver FROM community; LOAD httpserver; SELECT httpserve_start('0.0.0.0', 9999, getenv('DUCKDB_API_KEY'));"`
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/duckdb)
