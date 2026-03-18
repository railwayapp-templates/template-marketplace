# Deploy Serverpod reverse proxy on Railway

Unite your frontend and serverpod backend under one domain

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fiqpE3)

## About

Based on Brody's [Reverse Proxy](https://railway.app/template/7uDSyj) with support for Serverpod websocket paths

Allows you to have both frontend and backend under one domain with different ports and/hosts

Hosts your frontend at `/*`,backend at `/api/*` while still preserving /v1/websocket and /websocket paths for Serverpod realtime connections

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Serverpod Caddy proxy | [Andrew-Bekhiet/serverpod-caddy-reverse-proxy](https://github.com/Andrew-Bekhiet/serverpod-caddy-reverse-proxy) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `BACKEND_PORT` | The backend's internal port Use variable references, eg. ${{Backend.PORT}} |
| `FRONTEND_PORT` | The frontend's internal port Use variable references, eg. ${{Frontend.PORT}} |
| `BACKEND_DOMAIN` | The backend's private domain Use variable references, eg. ${{Backend.RAILWAY_PRIVATE_DOMAIN}} |
| `FRONTEND_DOMAIN` | The frontend's private domain Use variable references, eg. ${{Frontend.RAILWAY_PRIVATE_DOMAIN}} |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/fiqpE3)
