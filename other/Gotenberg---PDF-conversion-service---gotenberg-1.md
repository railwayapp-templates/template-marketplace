# Deploy Gotenberg - PDF conversion service on Railway

Open-source HTML, Markdown, and Office to PDF conversion service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gotenberg-1)

## About

**Gotenberg** is an open-source, Docker-based API that converts HTML, Markdown, and Office documents into PDFs using Chromium and LibreOffice. It provides a reliable, stateless service for server-side PDF generation, ideal for backend applications, automation workflows, and document pipelines.

Hosting Gotenberg involves deploying a stateless HTTP API that exposes endpoints for converting documents to PDF. Gotenberg runs as a single container and does not require a database or persistent storage, making it easy to deploy and scale. On Railway, you can run Gotenberg with minimal configuration, expose it via a public URL, and integrate it with services such as n8n, backend APIs, or serverless functions. Scaling is handled at the container level, allowing you to increase resources as demand grows without changing application logic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gotenberg | `gotenberg/gotenberg:8` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `GOTENBERG_API_BASIC_AUTH_PASSWORD` | (secret) |
| `GOTENBERG_API_BASIC_AUTH_USERNAME` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/gotenberg-1)
