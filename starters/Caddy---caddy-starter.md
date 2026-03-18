# Deploy Caddy on Railway

A static website with automatic HTTPS using a Caddy web server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/caddy-starter)

## About

Deploy a static website with automatic HTTPS using Caddy, a lightweight Go-based web server, on Railway.

Caddy is a powerful yet simple, Go-based open-source web server. Written in a memory-safe language, it compiles to a single, static binary, making it easy to run Caddy practically anywhere, even in containers. Caddy obtains and renews TLS certificates automatically, staples OCSP responses, and even performs automatic HTTPS rewrites.

Hosting Caddy means running a web server that handles HTTP/HTTPS requests, manages TLS certificates, and serves content through its modular architecture. The server compiles to a single static binary requiring minimal system dependencies while handling automatic certificate provisioning and renewal. Production deployment typically involves configuring domain settings, managing Caddyfile configurations, and coordinating SSL certificate management across different environments. Railway streamlines Caddy deployment by providing container hosting for the static binary, managing domain configuration for automatic HTTPS, and handling the underlying infrastructure while Caddy manages certificate automation and web serving.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy | [alphasecio/caddy-server](https://github.com/alphasecio/caddy-server) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Tags:** static site, caddy · **Languages:** HTML, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/caddy-starter)
