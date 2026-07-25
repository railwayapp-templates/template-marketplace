# Deploy OpenResty on Railway

Programmable Nginx web server with Lua APIs and health checks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openresty)

## About

OpenResty combines Nginx with LuaJIT and a curated set of high-performance modules for programmable web applications, gateways, and proxies. This template deploys a pinned OpenResty release with sample Lua APIs, a browser landing page, structured logs, security headers, and an HTTP health check.

Hosting OpenResty provides an event-driven server that can execute Lua directly in the Nginx request lifecycle. This Railway starter configures the assigned port at container startup, serves a static landing page, exposes testable Lua endpoints, records JSON access logs, and supplies a dedicated readiness endpoint. The included fat image provides OPM and LuaRocks, making it straightforward to add OpenResty libraries while retaining a reproducible base version.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenResty | [monotykamary/railway-template-openresty](https://github.com/monotykamary/railway-template-openresty) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | OpenResty listen port and Railway public-domain target. |
| `APP_NAME` | OpenResty on Railway | Application name returned by the sample Lua API. |
| `GREETING` | Hello from OpenResty | Greeting returned by the sample Lua API. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** HTML, Lua, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openresty)
