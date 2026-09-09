# Deploy Stirling-PDF — Self-Hosted PDF Toolkit on Railway

Self-hosted Stirling-PDF with auth, persistence, and API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stirling-pdf-railw-1)

## About

Stirling PDF is a powerful self-hosted PDF toolkit with 50+ tools for merging, splitting, compressing, converting, OCR, signing, redacting, watermarking, and organizing PDF documents. This Railway template gives you a ready-to-run Stirling PDF instance with authentication, persistent storage, HTTPS, and REST API access without managing your own server or Docker infrastructure.

Stirling PDF is a self-hosted alternative to online PDF tools and desktop PDF software. It provides a single web interface for everyday PDF workflows including merge, split, compression, OCR, conversion, signing, redaction, watermarking, page manipulation, and more.

With this Railway template, Stirling PDF runs on your own Railway infrastructure. Your documents are processed by your deployed instance instead of being sent to a third-party PDF processing service.

This template is configured with authentication, persistent configuration storage, a Railway health check, public HTTPS networking, and API access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| stirling-pdf | [Timboslice212/stirling-pdf-railway](https://github.com/Timboslice212/stirling-pdf-railway) (branch: main) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Application port |
| `SERVER_PORT` | 8080 | Server port |
| `SECURITY_ENABLELOGIN` | (secret) | Enable login security |
| `SYSTEM_DEFAULTLOCALE` | en-US | Default system locale |
| `SYSTEM_GOOGLEVISIBILITY` | false | Google visibility setting |
| `SECURITY_INITIALLOGIN_PASSWORD` | (secret) | Initial login password (auto-generated) |
| `SECURITY_INITIALLOGIN_USERNAME` | (secret) | Initial login username |

## Configuration

- **Healthcheck:** `/api/v1/info/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/configs`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/stirling-pdf-railw-1)
