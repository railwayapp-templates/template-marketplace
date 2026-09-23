# Deploy hodor on Railway

A tiny reverse proxy to gate your app with single shared password.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hodor)

## About

![Hero image for the hodor reverse proxy](https://raw.githubusercontent.com/michidk/hodor/main/.github/images/hero.webp)

[hodor](https://github.com/michidk/hodor) is an ultra-lightweight reverse proxy written in Rust that gates access to any web application behind a single shared password. Operating without user databases or OAuth overhead, hodor delivers instant password protection, HMAC-SHA256 signed session cookies, bidirectional WebSocket support, and automated brute-force defense.

![Hodor login page protecting a preview](https://raw.githubusercontent.com/michidk/hodor/main/.github/images/login-example.png)

Deploying [hodor](https://github.com/michidk/hodor) on Railway takes seconds. The template automatically generates cryptographically secure values for the cookie-signing secret and access password, leaving you to simply connect your target application using Railway's private networking variables (`UPSTREAM_DOMAIN` and `UPSTREAM_PORT`). Because authentication state and brute-force tracking live entirely in memory, no databases or persistent volumes are required. hodor runs with an ultra-lean footprint—consuming approximately 7MB of RAM and negligible CPU—costing mere pennies per month. For additional efficiency, services can enable Railway's sleep-on-idle feature to scale down to zero when traffic stops.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hodor | `ghcr.io/michidk/hodor:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SECRET` | (secret) | unshared secret used to sign cookies |
| `PASSWORD` | (secret) | single shared password |
| `UPSTREAM` | - | the derived upstream path |
| `UPSTREAM_PORT` | - | the port the upstream service is listening on ex: `${{example.PORT}}` / `8080` |
| `UPSTREAM_DOMAIN` | - | ex: `${{example.RAILWAY_PRIVATE_DOMAIN}}` / `example.railway.internal` |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/hodor)
