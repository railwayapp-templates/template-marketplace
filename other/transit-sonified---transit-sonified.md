# Deploy transit-sonified on Railway

Transit schedules played as music on a map, in the browser with DuckDB-WASM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/transit-sonified)

## About

Transit Sonified plays a day of transit schedules as music on a map. Every departure in the New York Subway, Madrid Metro, Tokyo Metro and Hong Kong MTR is a note, and its station lights up on the map as it plays. The [GTFS DuckDB extension](https://github.com/gabrielAHN/gtfs-duckdb) turns the schedules into notes inside DuckDB-WASM, and [Strudel](https://strudel.cc)'s audio engine voices them. Each city has its own scale and instrument, written as a Strudel pattern you can edit live from the ♪ button.

Live demo: https://transit-sonified-production.up.railway.app

It's a static Vite + React site with no backend. Railpack builds it (`railpack.json`), and the build downloads the GTFS DuckDB extension's browser builds from its [v1.0.1 release](https://github.com/gabrielAHN/gtfs-duckdb/releases/tag/v1.0.1) and checks their SHA-256 sums. Caddy then serves `dist/` (`Caddyfile`) with the WASM content type, the precompressed schedule database and the city URLs (`/nyc`, `/madrid`, `/tokyo`, `/hong-kong`). The schedules ship as one prebuilt DuckDB file, and every query runs in the visitor's browser. A public domain is generated on deploy, and Railway checks `/` before sending it traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| transit-sonified | [gabrielAHN/transit-sonified](https://github.com/gabrielAHN/transit-sonified) | Web service |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/transit-sonified)
