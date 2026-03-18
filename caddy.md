# Deploy Caddy on Railway

(Official) Powerful, flexible web server with plugins

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/caddy)

## About

The official template for Caddy: a popular, powerful web server that supports numerous plugins and configuration modes. It is written in Go, making it more memory-safe than traditional web servers.

This starter template runs a vanilla build and serves a static page as a welcome message.

Customize the build using Railway environment variables. You can also edit the Caddyfile directly from your own repo to have more control over the configuration.

[Caddy configuration is famously simple.](https://caddyserver.com/docs/caddyfile)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Caddy | [caddyserver/caddy-railway](https://github.com/caddyserver/caddy-railway) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `CADDY_PLUGINS` | Space-separated list of Caddy plugins to include in your build. There's a list of known Caddy plugins on Caddy's "Download" page. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/template/caddy)
