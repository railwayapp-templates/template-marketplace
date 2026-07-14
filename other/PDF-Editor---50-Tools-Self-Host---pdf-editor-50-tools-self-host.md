# Deploy PDF Editor - 50+ Tools | Self Host on Railway

Edit, sign, merge, split, and convert PDFs fast with String PDF.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pdf-editor-50-tools-self-host)

## About

PDF Editor - 50+ Tools - Self Host is a powerful web-based application for viewing, editing, converting, organizing, and securing PDF documents. It provides over 50 built-in PDF tools, including merging, splitting, compressing, signing, watermarking, page management, metadata editing, and file conversion, making it an ideal self-hosted solution for individuals, businesses, and privacy-focused teams.

Hosting PDF Editor - 50+ Tools - Self Host on Railway allows you to deploy a fully featured PDF processing platform without managing servers or infrastructure. The application runs inside a Docker container while Railway automatically handles deployments, HTTPS, networking, logging, and monitoring. It can operate as a standalone service for most deployments, with optional support for authentication and advanced features through additional configuration. Railway Volumes can be attached to retain application data and backups across deployments when needed. With automatic domain generation and scalable infrastructure, Railway makes it simple to host a secure, self-hosted PDF editor that is accessible from anywhere.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| stirlingtools/stirling-pdf:latest-ultra-lite | `stirlingtools/stirling-pdf:latest-fat` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `UI_APPNAME` | PDF Editor |
| `METRICS_ENABLED` | true |
| `UI_APPNAMENAVBAR` | PDF Editor |
| `JAVA_TOOL_OPTIONS` | -Xms512m -Xmx4g |
| `SYSTEM_MAXFILESIZE` | 100 |
| `SECURITY_ENABLELOGIN` | (secret) |
| `SYSTEM_DEFAULTLOCALE` | en-US |
| `DOCKER_ENABLE_SECURITY` | false |
| `SECURITY_INITIALLOGIN_PASSWORD` | (secret) |
| `SECURITY_INITIALLOGIN_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/stirling-data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pdf-editor-50-tools-self-host)
