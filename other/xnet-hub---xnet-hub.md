# Deploy xnet-hub on Railway

Deploy an xnet.fyi hub server for always online sync and backup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xnet-hub)

## About

xnet-hub is the sync server for xNet, a local-first, CRDT-backed workspace. One Node.js binary provides WebSocket sync relay, WebRTC signaling, encrypted backup, file storage, full-text search, and federation for xNet clients. Your devices work offline and merge changes conflict-free; the hub keeps them in sync and backed up.

xnet-hub runs as a single Node.js server with SQLite storage — no external database required. The Docker image builds from the xNet monorepo, compiles native SQLite bindings, and starts the hub via its CLI. Attach a Railway volume at `/data` for persistent storage, and Railway's `$PORT` is passed straight to the server. A `/health` endpoint (which also serves the hub's DID) powers Railway health checks, with automatic restarts on failure. Roles are config presets on the same binary: run it as a personal hub, a team relay, or a demo hub with quotas and periodic eviction. Optional Litestream support streams SQLite replicas to S3-compatible storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| xNet | [crs48/xNet](https://github.com/crs48/xNet) | Worker |

**Category:** Other · **Languages:** TypeScript, Astro, MDX, JavaScript, HTML, Swift, CSS, Shell, Rust, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/xnet-hub)
