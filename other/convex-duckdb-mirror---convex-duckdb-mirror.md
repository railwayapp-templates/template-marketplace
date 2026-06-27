# Deploy convex-duckdb-mirror on Railway

Deploy and host convex-duckdb-mirror on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convex-duckdb-mirror)

## About

Convex DuckDB Mirror gives your AI agents (and you) a fast, local, read-only DuckDB copy of your Convex data to run real analytical SQL against: the aggregate- and join-heavy queries Convex doesn't natively support. This template deploys the **proxy**, the single service half of the project. It holds your Convex deploy key, continuously buffers document deltas, and passes snapshots through so a local mirror can stay fresh.

Deploying the proxy is the first step. Once it's running, you point the `convex-duckdb` CLI at it from your project to sync and query the mirror locally. Full installation instructions live in the [GitHub repo](https://github.com/maksymilian-majer/convex-duckdb-mirror).

The proxy is a small Node service that talks to Convex's streaming-export API and buffers deltas in SQLite on a mounted volume, so your Convex deploy key never leaves the server and the CLI only ever talks to the proxy. It buffers only deltas (snapshots pass through unstored), so the volume stays small: for a Convex database of roughly 5–20 GB, the 5 GB volume on Railway's Hobby plan is plenty.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| convex-duckdb-mirror | [maksymilian-majer/convex-duckdb-mirror](https://github.com/maksymilian-majer/convex-duckdb-mirror) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NODE_VERSION` | 24 |
| `DELTA_RETENTION_HOURS` | 168 |
| `DOCUMENT_DELTAS_PAGE_SIZE` | 2000 |
| `CONVEX_DUCKDB_ACCESS_TOKEN` | (secret) |
| `DELTA_POLL_INTERVAL_SECONDS` | 30 |
| `CONVEX_DUCKDB_PROXY_DATA_DIR` | /data/convex-duckdb-proxy |

## Configuration

- **Start command:** `npm run proxy:start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/convex-duckdb-mirror)
