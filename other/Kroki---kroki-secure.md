# Deploy Kroki on Railway

Authenticated text-to-diagram rendering API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kroki-secure)

## About

Kroki provides a unified HTTP API that turns text descriptions into SVG, PNG, PDF, and other diagram formats. This template deploys stable Kroki 0.32.1 privately behind an authenticated Caddy proxy.

Retrieve `BASIC_AUTH_USER` and the generated `BASIC_AUTH_PASSWORD` from the proxy service before calling rendering endpoints. Kroki 0.32.1 includes the secure-mode fix for nested Vega URL SSRF and local-file reads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxy | [monotykamary/railway-template-kroki](https://github.com/monotykamary/railway-template-kroki) (root: /proxy) | Web service |
| kroki | [monotykamary/railway-template-kroki](https://github.com/monotykamary/railway-template-kroki) (root: /kroki) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | proxy | 8080 | Authenticated proxy port used by the Railway public domain. |
| `KROKI_URL` | proxy | - | Private Kroki gateway origin. Keep this service reference unchanged. |
| `BASIC_AUTH_USER` | proxy | (secret) | HTTP Basic username for rendering endpoints. |
| `BASIC_AUTH_PASSWORD` | proxy | (secret) | Generated HTTP Basic password for rendering endpoints. |
| `PORT` | kroki | 8000 | Kroki HTTP port on Railway private networking. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`

**Category:** Other · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/kroki-secure)
