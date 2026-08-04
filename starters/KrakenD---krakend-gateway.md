# Deploy KrakenD on Railway

KrakenD API gateway with a working private backend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/krakend-gateway)

## About

KrakenD Community Edition is a high-performance stateless API gateway. This template deploys stable version 2.13.8 with a working private echo backend so the gateway path can be tested immediately and then replaced with your own APIs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | [monotykamary/railway-template-krakend](https://github.com/monotykamary/railway-template-krakend) (root: /gateway) | Web service |
| echo | [monotykamary/railway-template-krakend](https://github.com/monotykamary/railway-template-krakend) (root: /echo) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gateway | 8080 | KrakenD HTTP port used by the Railway public domain. |
| `BACKEND_URL` | gateway | - | Private example backend origin. Update the gateway config and references when replacing it. |
| `PORT` | echo | 8081 | Private example backend HTTP port. |

## Configuration

- **Healthcheck:** `/__health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`

**Category:** Starters · **Languages:** Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/krakend-gateway)
