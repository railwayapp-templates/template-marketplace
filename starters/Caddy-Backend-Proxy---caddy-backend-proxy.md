# Deploy Caddy Backend Proxy on Railway

Minimal Caddy reverse proxy for backend services on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/caddy-backend-proxy)

## About

Caddy Backend Proxy is a minimal, production-ready reverse proxy built with Caddy. It forwards incoming HTTP traffic to a private backend service using Railway’s internal network. The proxy is framework-agnostic and works with any HTTP backend such as Django, FastAPI, Node.js, Go, or Rails, while Railway handles HTTPS and networking.

---

Hosting Caddy Backend Proxy on Railway is straightforward and requires minimal configuration. The proxy runs as a lightweight container that listens on Railway’s assigned port and forwards requests to a backend service via a private Railway domain. You only need to specify the backend host and port using environment variables. Railway manages deployment, scaling, networking, and TLS termination, allowing Caddy to focus purely on reverse proxy responsibilities without additional plugins or custom builds.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Caddy Backend Proxy | [BigDaddyAman/caddy-reverse-proxy-backend-railway](https://github.com/BigDaddyAman/caddy-reverse-proxy-backend-railway) | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `BACKEND_HOST` | Private Railway domain of your backend service (e.g. ${{BACKEND.RAILWAY_PRIVATE_DOMAIN}}) |
| `BACKEND_PORT` | Internal port exposed by your backend service (e.g. 8000) |

**Category:** Starters · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/caddy-backend-proxy)
