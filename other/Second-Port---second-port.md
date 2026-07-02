# Deploy Second Port on Railway

Expose a second container port on its own public Railway domain via Caddy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/second-port)

## About

Second Port is a lightweight Caddy reverse proxy for Railway. It gives a second container port its own public HTTPS domain while forwarding traffic to the target service over Railway's private network—ideal when one service listens on multiple ports but Railway only exposes one per domain.

Deploy Second Port as a separate Railway service alongside the application you want to expose. The proxy listens on port **3000** and forwards all requests to a target hostname and port you configure with `TARGET_DOMAIN` and `TARGET_PORT`. Railway handles TLS on the public domain; Caddy handles reverse proxying over the private network with dynamic DNS resolution, load balancing across replicas, and passive health checks.

Before deploying, ensure your target service listens on a fixed port and binds to **`::`** so it is reachable over Railway private networking. Set reference variables pointing at the target service's `RAILWAY_PRIVATE_DOMAIN` and the port to expose, then assign a public domain to this proxy service with port **3000**. No database or persistent storage is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Second Port | [douglasrubims/railway-second-port](https://github.com/douglasrubims/railway-second-port) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `TARGET_PORT` | Target port |
| `TARGET_DOMAIN` | Target private domain |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/second-port)
