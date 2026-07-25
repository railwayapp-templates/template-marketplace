# Deploy Stirling PDF (All-in-One PDF Tools) on Railway

Self-hosted PDF toolkit: merge, split, convert, OCR, sign & compress.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stirling-pdf-all-in-one-pdf-tools)

## About

Stirling PDF is a powerful, locally-hosted web app for working with PDFs. Merge, split, rotate, compress, convert, watermark, sign, add or remove passwords, run OCR, and 50+ other operations — all in your browser, with your files never leaving your own server.

This template runs Stirling PDF as a single self-contained container behind a public HTTPS domain, with a persistent volume for settings and any added OCR language packs. No external database is required. Login is enabled by default: sign in as `admin` using the auto-generated password stored in the service's `SECURITY_INITIALLOGIN_PASSWORD` variable, then change it in settings. To run it as an open, no-login tool instead, set `SECURITY_ENABLELOGIN=false`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| stirling-pdf | `stirlingtools/stirling-pdf:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECURITY_ENABLELOGIN` | (secret) |
| `SYSTEM_DEFAULTLOCALE` | en-US |
| `DOCKER_ENABLE_SECURITY` | true |
| `SECURITY_INITIALLOGIN_PASSWORD` | (secret) |
| `SECURITY_INITIALLOGIN_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/configs`

**Category:** Other

[View on Railway →](https://railway.com/deploy/stirling-pdf-all-in-one-pdf-tools)
