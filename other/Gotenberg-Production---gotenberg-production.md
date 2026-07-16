# Deploy Gotenberg Production on Railway

Docker-based API for converting web pages and office documents to PDF

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gotenberg-production)

## About

Gotenberg is a Docker-based API for converting web pages and office documents into PDFs. It bundles Chromium, LibreOffice, and PDF engines for rendering HTML, Markdown, Word, Excel, PowerPoint, and more. This template deploys the official image with private networking, generated Basic Auth credentials, healthchecks, and production-oriented defaults.

Hosting Gotenberg Production on Railway gives you a ready-to-use PDF conversion service without building or maintaining a custom image. This template deploys the official gotenberg/gotenberg:8 image as a single stateless service, keeps the API private by default, and configures generated Basic Auth credentials for clients that later expose it publicly. Chromium and LibreOffice start with the container to avoid first-request cold starts, while Railway checks /health before a deployment becomes active. Request timeouts, graceful shutdown, structured JSON logs, and restart behavior are preconfigured. No database, volume, or external service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gotenberg | `gotenberg/gotenberg:8` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port used by Gotenberg and Railway public networking. |
| `API_TIMEOUT` | 60s | Maximum duration allowed for a conversion request. |
| `LOG_STD_FORMAT` | json | Emit structured JSON logs for Railway. |
| `CHROMIUM_AUTO_START` | true | Start Chromium during container startup to avoid first-request cold starts. |
| `API_ENABLE_BASIC_AUTH` | true | Enable HTTP Basic Auth for API routes. |
| `LIBREOFFICE_AUTO_START` | true | Start LibreOffice during container startup to avoid first-request cold starts. |
| `GOTENBERG_API_BASIC_AUTH_PASSWORD` | (secret) | Randomly generated password used for HTTP Basic Auth. |
| `GOTENBERG_API_BASIC_AUTH_USERNAME` | (secret) | Username used for HTTP Basic Auth. |
| `GOTENBERG_GRACEFUL_SHUTDOWN_DURATION` | 60s | Time allowed for active conversions to finish during shutdown. |

## Configuration

- **Healthcheck:** `/health`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gotenberg-production)
