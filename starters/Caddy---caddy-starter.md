# Deploy Caddy on Railway

A static website with automatic HTTPS using a Caddy web server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/caddy-starter)

## About

Caddy is an open-source web server. It is written in Go and runs as one static binary. Caddy serves static files, operates as a reverse proxy, and can get TLS certificates automatically.

This template deploys a static website with Caddy from the [alphasecio/caddy-server](https://github.com/alphasecio/caddy-server) GitHub repository. The `site/` directory contains the website files. The `Caddyfile` contains the server configuration. Railway supplies HTTPS for your Railway domain and your custom domains. Caddy receives plain HTTP from the Railway edge, so you do not need to configure TLS certificates. To change the website, replace the files in `site/` and push the changes to your repository.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy | [alphasecio/caddy-server](https://github.com/alphasecio/caddy-server) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Tags:** static site, caddy · **Languages:** CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/caddy-starter)
