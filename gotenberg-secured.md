# Deploy Gotenberg (Secured) on Railway

API for PDF conversion | StirlingPDF, PDF.co alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gotenberg-secured)

## About

Gotenberg is an open-source, containerized API service that converts various document formats into PDF. It runs as a self-contained Docker image with all necessary dependencies bundled.

It seamlessly integrates into distributed systems for efficient scaling and exposes versatile multipart/form-data endpoints supporting HTML, Markdown, Office docs and URLs.

This version deploys the official Gotenberg docker image and adds basic auth security to protect the API routes

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gotenberg | `gotenberg/gotenberg:8` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `API_ENABLE_BASIC_AUTH` | TRUE |
| `GOTENBERG_API_BASIC_AUTH_PASSWORD` | (secret) |
| `GOTENBERG_API_BASIC_AUTH_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/gotenberg-secured)
