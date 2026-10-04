# Deploy Rusty paste on Railway

Minimal Rust pastebin: one-shot, password, URL shortener, petname links.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustypaste)

## About

Rustypaste Lite is a single container. Railway's reverse proxy terminates TLS at the edge and forwards plain HTTP to the container on port 8000; the external healthcheck targets `/`. The root wrapper exists solely to make the Railway volume mount writable by the rustypaste process — the binary itself is unchanged from the upstream `orhunp/rustypaste:0.18.1` image. Nothing else to host.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rustypaste | [mc9max/rustypaste-lite](https://github.com/mc9max/rustypaste-lite) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `RUST_LOG` | info | Log verbosity: error, warn, info, debug, trace. |
| `AUTH_TOKEN` | (secret) | Optional upload lock-down. When set, every POST / requires 'Authorization: Bearer *** with this value (401 without); reading existing pastes stays public. Blank = open public pastebin (the default). |
| `DELETE_TOKEN` | (secret) | Optional admin delete. When set, enables DELETE /link for holders of this token. Blank = the delete endpoint is disabled (returns 404) — the safe public default. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/rustypaste)
