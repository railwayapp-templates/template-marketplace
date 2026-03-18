# Deploy MarkItDown API on Railway

Converts files to Markdown via REST API, secured with Bearer auth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/markitdown-api)

## About

MarkItDown API is a lightweight REST API server built with FastAPI that accepts file uploads and converts them to Markdown using Microsoft's MarkItDown library. It supports documents, spreadsheets, presentations, PDFs, and more, returning clean Markdown via a simple HTTP endpoint protected by bearer token authentication.

Hosting MarkItDown API involves running a Python-based FastAPI application served by Uvicorn. The service runs on port 8490 and requires one environment variable — `API_BEARER_TOKEN` — to be configured before the server will start. Uploaded files are written to a temporary directory during conversion, then removed immediately after. A pre-built Docker image is published to GitHub Container Registry, making containerized deployment the simplest and recommended path to getting the service running.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MarkItDown API | `ghcr.io/bon5co/markitdown-api-auth:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8490 |
| `API_BEARER_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/markitdown-api)
