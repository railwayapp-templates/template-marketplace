# Deploy Reverse Proxy on Railway

Unite your frontend & backend into one domain

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/7uDSyj)

## About

Caddy is a powerful, enterprise-ready, open source web server that can combine your separate frontend and backend services into one domain. This template configures Caddy as a reverse proxy to route traffic between your services seamlessly.

Hosting a Caddy reverse proxy involves deploying a web server that routes incoming requests to different backend services based on URL patterns. This allows you to access your frontend from `/*` and your backend from `/api/*` on the same domain, eliminating CORS issues and simplifying your application architecture. Caddy handles automatic HTTPS, compression, and load balancing while providing a clean configuration through the Caddyfile format.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Caddy Proxy | [railwayapp-templates/caddy-reverse-proxy](https://github.com/railwayapp-templates/caddy-reverse-proxy) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `BACKEND_PORT` | The backend's internal port</br>Use variable references, eg. ${{Backend.PORT}} |
| `FRONTEND_PORT` | The frontend's internal port</br>Use variable references, eg. ${{Frontend.PORT}} |
| `BACKEND_DOMAIN` | The backend's private domain</br>Use variable references, eg. ${{Backend.RAILWAY_PRIVATE_DOMAIN}} |
| `FRONTEND_DOMAIN` | The frontend's private domain</br>Use variable references, eg. ${{Frontend.RAILWAY_PRIVATE_DOMAIN}} |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/7uDSyj)
