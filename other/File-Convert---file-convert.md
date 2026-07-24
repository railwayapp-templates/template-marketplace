# Deploy File Convert on Railway

Unlimited Files Converter, No Limits, Self Host ,Free

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/file-convert)

## About

Transmute is an open-source, self-hosted file conversion platform that supports over 2,000 file format conversions across images, videos, audio, documents, spreadsheets, subtitles, fonts, and structured data. It includes a modern web interface, a REST API, and built-in authentication, allowing you to convert files privately without relying on third-party conversion services.

Hosting Transmute on Railway provides a fully managed environment for running your own file conversion service while keeping all file processing within your infrastructure. This template deploys a single Transmute service with a Railway Volume for persistent file storage and user data. Railway automatically provisions HTTPS, public networking, and deployment management without requiring additional services such as databases or Redis. The built-in REST API enables integration with automation platforms like n8n, Make, and custom applications, while user authentication and per-user data isolation make the service suitable for both personal and team deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| File-Convert | `ghcr.io/transmute-app/transmute` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/file-convert)
