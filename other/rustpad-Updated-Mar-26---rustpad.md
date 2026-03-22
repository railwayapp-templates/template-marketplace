# Deploy rustpad [Updated Mar ’26] on Railway

Rustpad is a lightweight collaborative text editor built in Rust

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustpad)

## About

[Rustpad](https://github.com/ekzhang/rustpad) is an open-source collaborative text editor that synchronizes document edits in real time using operational transformation. The upstream image runs as a single Rust service and does not require PostgreSQL, Redis, or other external infrastructure for basic usage.

For Railway, the cleanest setup is one service using the official Docker image `ekzhang/rustpad@sha256:536b63883b2661f31de580df438427f2b799f9284bf9f908708ea3b5d231b585`, routed to port `3030`. By default, documents are memory-backed and expire after inactivity. Optional SQLite persistence can be enabled with `SQLITE_URI`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rustpad | `ekzhang/rustpad@sha256:536b63883b2661f31de580df438427f2b799f9284bf9f908708ea3b5d231b585` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3030 |
| `RUST_LOG` | info |
| `EXPIRY_DAYS` | 1 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/rustpad)
