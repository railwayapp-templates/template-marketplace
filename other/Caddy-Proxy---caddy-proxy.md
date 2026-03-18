# Deploy Caddy-Proxy on Railway

Production-Ready Reverse Proxy for Private Networking & Web Socket

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/caddy-proxy)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/caddy-proxy)

Hosting refers to running your Caddy proxy instance on a cloud platform like Railway, where it can serve as an entry point for incoming traffic. Railway handles the underlying infrastructure, including servers, networking, and SSL termination, allowing you to focus on configuration. This template uses Caddy's automatic HTTPS capabilities (though Railway manages external SSL), private networking for internal service communication, and environment variables for easy setup. It's designed for containerized deployment via Docker, ensuring consistency across environments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Caddy-Proxy | [AnarchistManifesto/Caddy-Proxy](https://github.com/AnarchistManifesto/Caddy-Proxy) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `LOG_LEVEL` | INFO | - |
| `PROXY_TARGET` | http://backend.railway.internal:8080 | Direct reference PROXY_TARGET=http://backend.railway.internal:8080   Using Railway variables PROXY_TARGET=http://${{backend.RAILWAY_PRIVATE_DOMAIN}}:${{backend.PORT}} |

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/caddy-proxy)
