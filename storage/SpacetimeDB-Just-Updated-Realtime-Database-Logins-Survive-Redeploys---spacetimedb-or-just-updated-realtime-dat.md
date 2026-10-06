# Deploy SpacetimeDB | (Just Updated) Realtime Database, Logins Survive Redeploys on Railway

SpacetimeDB realtime database. Logins and data survive redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spacetimedb-or-just-updated-realtime-dat)

## About

SpacetimeDB is a relational database with a built-in server runtime. Clients connect straight to the
database, and your server-side logic (modules written in Rust, C# or TypeScript) runs inside it, so a
real-time game, chat or collaborative app needs no separate backend.

This template runs SpacetimeDB 2.10 as a single service from a digest-pinned official image, with the
HTTP and WebSocket API on your Railway domain and a Railway volume holding both the database and the
server's login-signing keys.

- **Logins survive a redeploy.** The stock image keeps the key that signs identity tokens in the
  container's home directory, outside any volume. After every redeploy the server generates a new
  key, and every token it issued before answers `Invalid token: InvalidSignature`. This template
  moves the keys and the database onto the volume, so identities, tokens and published modules
  carry across redeploys.
- **Reachable over HTTPS and WebSocket** on the generated Railway domain, with a health check on
  `/v1/ping`.
- **Pinned to a release.** The image is pinned by digest, so a redeploy never changes the server
  version underneath your modules.
- **Open by default.** Any client that can reach the URL can create an identity and publish a
  module. Keep the domain private if the database should not be public, or put your own
  authentication in front of it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| spacetimedb | `clockworklabs/spacetime:v2.10.2@sha256:acf3210403559f731e222fb77042aac32429d7ea77a4858ffa68bd459383069d` | Web service |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; export HOME=/data/home; D=/data/stdb; mkdir -p "$D" "$HOME"; echo "[railway] data-dir=$D keys=$HOME/.config/spacetime uid=$(id -u) writable=$(test -w /data && echo yes || echo no) port=$PORT"; exec spacetime start --listen-addr "0.0.0.0:$PORT" --data-dir "$D" --non-interactive'`
- **Healthcheck:** `/v1/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/spacetimedb-or-just-updated-realtime-dat)
