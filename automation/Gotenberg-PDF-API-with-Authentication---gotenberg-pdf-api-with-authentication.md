# Deploy Gotenberg PDF API with Authentication on Railway

PDF conversion API with generated Basic Auth and private URL filtering.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gotenberg-pdf-api-with-authentication)

## About

PDF conversion API with generated Basic Auth and private URL filtering.

Deploying this template creates Gotenberg in your Railway project. The application receives an HTTPS domain automatically. Database and Redis services, when included, use private networking and generated credentials. The conversion API is stateless; save completed files in your own storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gotenberg | `gotenberg/gotenberg@sha256:aa552cc115db488e0f0bcb07446aac13071ad51505b642c84bb894500907b42b` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `API_PORT` | 3000 | - |
| `API_BIND_IP` | :: | - |
| `API_TIMEOUT` | 60s | - |
| `API_BODY_LIMIT` | 25MB | - |
| `API_ENABLE_BASIC_AUTH` | true | - |
| `CHROMIUM_MAX_QUEUE_SIZE` | 20 | - |
| `WEBHOOK_DENY_PRIVATE_IPS` | true | - |
| `CHROMIUM_DENY_PRIVATE_IPS` | true | - |
| `LIBREOFFICE_MAX_QUEUE_SIZE` | 20 | - |
| `LIBREOFFICE_DENY_PRIVATE_IPS` | true | - |
| `GOTENBERG_API_BASIC_AUTH_PASSWORD` | (secret) | Generated API password; use Basic Auth on conversion requests. |
| `GOTENBERG_API_BASIC_AUTH_USERNAME` | (secret) | - |
| `API_DOWNLOAD_FROM_DENY_PRIVATE_IPS` | true | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/gotenberg-pdf-api-with-authentication)
