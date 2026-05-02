# Deploy Transmute on Railway

Convert images, video, audio, 2,000+ formats | CloudConvert alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/transmute)

## About

Transmute is a free, open-source, self-hosted file converter built for privacy and automation. It converts images, video, audio, documents, spreadsheets, subtitles, fonts, and structured data through a web UI or API. Files stay on your own infrastructure, with no watermarks, file size caps, or third-party uploads.

Hosting Transmute on Railway gives you a managed way to run a private conversion service without maintaining your own server by hand. Transmute is designed for self-hosting and can be deployed with Docker, exposing a web app and API for converting files across more than 2,000 supported formats and combinations. It is built for local-first processing, so your files remain within your own infrastructure rather than being sent to an external SaaS provider. This makes it a strong fit for internal tools, automation workflows, and customer-facing applications that need secure, programmable file conversion.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Transmute | `ghcr.io/transmute-app/transmute:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/transmute)
