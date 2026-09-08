# Deploy Nginx on Railway

High-performance web server, reverse proxy and HTTP cache

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nginx)

## About

NGINX is the web server behind roughly a third of the internet's busiest sites. It serves static files, forwards HTTP, load-balances across backends and caches what it proxies, from one small event-driven process that handles tens of thousands of concurrent connections on modest hardware. Teams reach for it when they need a front door: to publish a built site, put several backends behind one domain, or stand in front of an application never meant to face the internet.

This template deploys a single `nginx` service with a persistent volume, with the awkward parts of running a web server on a platform already handled. Deploy NGINX here and it listens on the port Railway assigns over IPv4 and IPv6, sizes its worker processes from the container's CPU quota rather than the host's, and recovers the true client address from `X-Forwarded-For` instead of logging Railway's rotating edge. The volume mounts at `/data`: your site lives in `/data/www` and the cache in `/data/cache`, so both survive every redeploy. The configuration is rendered from environment variables at boot and checked with `nginx -t` before the server starts.

![Diagram of the single NGINX service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788764846/nginx-architecture.png)

NGINX solves two problems that appear in almost every deployment. The first is serving files quickly and correctly — right MIME types, compression, cache headers and a real 404. The second is routing: the internet reaches one hostname, and something must decide which backend answers which path. Self-hosting puts that logic in configuration you control.

Key features in this deployment:

- Static file serving from a persistent volume, with optional SPA fallback and directory listings
- Path-based reverse proxying to any HTTP upstream, including private Railway services
- On-disk response caching for proxied traffic, with an `X-Cache-Status` header
- gzip compression, plus `gzip_static` so a pre-built `.gz` sibling is served as-is
- HTTP basic auth over the whole site, hashed at boot, and per-client-IP rate limiting
- Security headers — `nosniff`, `X-Frame-Options`, referrer policy, COOP and HSTS — on every response

There is one service and one volume. NGINX needs no database, no queue and no worker tier.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nginx | [gridalpha/nginx-railway](https://github.com/gridalpha/nginx-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Listen port, also health-checked |
| `SPA_MODE` | false | Fall back to index.html |
| `SITE_ROOT` | /data/www | Static site root on the volume |
| `ACCESS_LOG` | true | Access log to stdout |
| `CACHE_PATH` | /data/cache | Proxy cache directory |
| `CACHE_VALID` | 10m | Freshness window for cached responses |
| `INDEX_FILES` | index.html index.htm | Index file names |
| `SERVER_NAME` | _ | nginx server_name |
| `GZIP_ENABLED` | true | gzip plus gzip_static |
| `HSTS_MAX_AGE` | 31536000 | HSTS max-age, 0 disables |
| `CACHE_ENABLED` | false | Cache proxied responses on the volume |
| `CACHE_MAX_SIZE` | 1g | Proxy cache size ceiling |
| `BASIC_AUTH_REALM` | Restricted | Realm shown in the browser prompt |
| `RATE_LIMIT_BURST` | 20 | Burst allowance for the limiter |
| `DIRECTORY_LISTING` | false | Autoindex directories without an index |
| `PROXY_READ_TIMEOUT` | 60s | Upstream read timeout |
| `CLIENT_MAX_BODY_SIZE` | 64m | Largest request body accepted |
| `STATIC_ASSET_EXPIRES` | 30d | Expires header for asset types |
| `NGINX_ENTRYPOINT_LOCAL_RESOLVERS` | 1 | Export Railway's IPv6 resolver |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | 1 | Size workers from the CPU quota |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/nginx)
