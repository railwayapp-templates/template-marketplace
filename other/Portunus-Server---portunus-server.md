# Deploy Portunus Server on Railway

Portunus server with Web UI, SQLite state, HTTP and TCP proxy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/portunus-server)

## About

Portunus is a Rust control-plane server for managing port-based TCP and UDP forwarding. This template deploys the server directly from its prebuilt multi-arch image on GHCR — nothing is built on Railway. It ships the embedded Web UI, operator HTTP API, persistent SQLite state, and a TCP proxy endpoint for client gRPC connections.

The template pulls `ghcr.io/zingerlittlebee/portunus-server:latest` (a distroless multi-arch image) and runs it as a single service. Railway exposes the Web UI / operator API over HTTP on port 7080 and the control-plane gRPC listener over a TCP proxy on port 7443. A mounted volume at `/var/lib/portunus` stores the SQLite database, self-signed TLS material, and server state.

The advertised gRPC endpoint is wired automatically: `PORTUNUS_ADVERTISED_ENDPOINT` is set to `${{RAILWAY_TCP_PROXY_DOMAIN}}:${{RAILWAY_TCP_PROXY_PORT}}`, so Railway resolves the public TCP proxy address for you — no manual step. The server self-signs its TLS certificate against that host and regenerates it if the host changes.

Image Auto Updates is enabled against the `:latest` tag, so the service redeploys automatically when a new image is published (the volume is backed up first; expect a short downtime).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zingerlittlebee/portunus-server:latest | `ghcr.io/zingerlittlebee/portunus-server:latest` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 7080 |
| `PORTUNUS_OPERATOR_HTTP_LISTEN` | 0.0.0.0:7080 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 7443
- **Volume:** `/var/lib/portunus`

**Category:** Other

[View on Railway →](https://railway.com/deploy/portunus-server)
