# Deploy SpacetimeDB on Railway

A template to deploy SpacetimeDB standalone

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spacetimedb)

## About

SpacetimeDB is a realtime ultra-fast backend framework and database for apps and games. Server logic can be written in TypeScript, C#, C++, or Rust with automatic client synchronization.
Table schema and application logic is defined in the same project and uploaded to SpacetimeDB as a single Wasm binary or JavaScript bundle.

Hosting SpacetimeDB requires running the first-party docker image `clockworklabs/spacetime` and exposing port `3000`. Additionally to ensure persistence a volume is required on the path `/stdb`.

At this point SpacetimeDB is ready to run multiple databases that can be published using the `spacetime publish` cli command.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clockworklabs/spacetime | `clockworklabs/spacetime` | TCP service |

## Configuration

- **Start command:** `spacetime start`
- **Healthcheck:** `/v1/ping`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 3000
- **Volume:** `/stdb`

**Category:** Other

[View on Railway →](https://railway.com/deploy/spacetimedb)
