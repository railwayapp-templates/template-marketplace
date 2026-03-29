# Deploy Caddy on Railway

A static website with automatic HTTPS using a Caddy web server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/caddy-starter)

## About

Caddy is a lightweight, open-source web server written in Go that compiles to a single static binary. It serves static files, handles reverse proxying, and manages TLS certificates automatically — making it an efficient alternative to NGINX for simple web serving needs.

This Railway template deploys a static website using Caddy from the [alphasecio/caddy-server](https://github.com/alphasecio/caddy-server) GitHub repository. The `site/` directory contains your static files (HTML, CSS, assets), and the `Caddyfile` configures the server. Railway handles TLS and HTTPS at the platform level, so Caddy's automatic HTTPS is intentionally disabled in the Caddyfile — no certificate configuration needed. Replace the default `index.html` and `styles.css` in `site/` with your own content and redeploy.

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
