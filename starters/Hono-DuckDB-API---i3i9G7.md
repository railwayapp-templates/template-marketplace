# Deploy Hono + DuckDB API on Railway

Bun, Hono, and DuckDB API for high-performance data analysis.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/i3i9G7)

## About

An analytical API built with TypeScript, leveraging [Bun](https://bun.sh/) for high-performance runtime, [Hono](https://hono.dev/) for efficient routing, and [DuckDB](https://duckdb.org/) for in-memory analytical processing. This project showcases:

- Optimized sales data analysis with endpoints for comprehensive, summary, and daily sales reports
- Type-safe query handling with custom interfaces for robust data management
- Efficient BigInt serialization for accurate representation of large numerical values
- Modular architecture separating database operations, route handling, and application setup

Ideal for scenarios requiring rapid data analysis and API responses, this setup demonstrates the power of combining modern web technologies with analytical databases for building high-performance data-driven applications.

This example uses DuckDB in-memory store.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bun, Hono, DuckDB | [jaaneh/hono-duckdb](https://github.com/jaaneh/hono-duckdb) | Web service |

## Configuration

- **Start command:** `bun start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/i3i9G7)
