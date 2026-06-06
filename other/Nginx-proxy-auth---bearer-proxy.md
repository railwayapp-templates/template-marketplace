# Deploy Nginx proxy auth on Railway

Deploy and Host bearer-proxy with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bearer-proxy)

## About

bearer-proxy is a lightweight nginx reverse proxy that protects any HTTP service behind Bearer token authentication. Drop it in front of any internal service to add secure, token-based access control without modifying the service itself.

Hosting bearer-proxy involves running an nginx container that sits between your clients and an upstream service. On startup, it dynamically detects the DNS resolver (critical for Railway's internal networking), generates the nginx config from environment variables, and begins proxying requests. Only requests with a valid `Authorization: Bearer ` header are forwarded to the upstream. All others receive a 401. The container is stateless and requires no persistent storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bearer-proxy | [usesendly/bearer-proxy](https://github.com/usesendly/bearer-proxy) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ORIGIN` | - | Upstream service URL to proxy requests to (e.g. http://service.railway.internal:8888) |
| `BEARER_TOKEN` | (secret) | Bearer token required in Authorization header to authenticate requests |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/bearer-proxy)
