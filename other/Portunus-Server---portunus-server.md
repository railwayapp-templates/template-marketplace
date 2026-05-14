# Deploy Portunus Server on Railway

Portunus server with Web UI, SQLite state, HTTP and TCP proxy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/portunus-server)

## About

Portunus is a Rust control-plane server for managing port-based TCP and UDP forwarding. This template deploys the server with its embedded Web UI, operator HTTP API, persistent SQLite state, and a TCP proxy endpoint for client gRPC connections.

The template builds Portunus from the GitHub repository using the Railway Dockerfile. Railway exposes the Web UI over HTTP on port 7080 and the control-plane gRPC listener over a TCP proxy on port 7443. A mounted volume at /var/lib/portunus stores the SQLite database, generated TLS material, config, and server state.

After deployment, set PORTUNUS_ADVERTISED_ENDPOINT to the Railway TCP Proxy host:port shown for the service. This value is required so provisioned client bundles connect to the public gRPC endpoint instead of localhost.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Portunus | [ZingerLittleBee/Portunus](https://github.com/ZingerLittleBee/Portunus) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 7080 | Operator HTTP/Web UI port. Must match the HTTP proxy port. |
| `PORTUNUS_ADVERTISED_ENDPOINT` | - | Required: set to the Railway TCP Proxy public host:port after deployment so client bundles connect to gRPC. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 7443
- **Volume:** `/var/lib/portunus`

**Category:** Other · **Languages:** Rust, TypeScript, Shell, Python, PowerShell, Makefile, CSS, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/portunus-server)
