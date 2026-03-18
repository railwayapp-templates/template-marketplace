# Deploy Stirling-PDF on Railway

Deploy and Host Stirling-PDF with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/stirling-pdf)

## About

Stirling-PDF is a powerful open-source PDF manipulation platform with 50+ tools for merging, splitting, converting, OCR, signing, and more. All processing happens on your server—no documents are sent to external services. This template deploys with built-in authentication to protect your instance.

This template deploys Stirling-PDF as a single service with:

- **PDF Processing**: 50+ tools for all your PDF manipulation needs
- **REST API**: Full API access with Swagger documentation for automation
- **Built-in Authentication**: Native login system with configurable admin credentials
- **Persistent Storage**: Railway volume for configs, logs, and OCR language data

Railway volumes ensure your configuration, pipelines, logs, and OCR data persist across redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| StirlingPDF | [nick0lay/railway-templates](https://github.com/nick0lay/railway-templates) (root: /solutions/stirling-pdf/app) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `UI_APPNAME` | Stirling-PDF | - |
| `METRICS_ENABLED` | true | UI Branding (Optional) |
| `UI_APPNAMENAVBAR` | Stirling-PDF | Optional: API Key for external API access |
| `SYSTEM_MAXFILESIZE` | 100 | - |
| `SECURITY_ENABLELOGIN` | (secret) | - |
| `SYSTEM_DEFAULTLOCALE` | en-US | - |
| `DOCKER_ENABLE_SECURITY` | true | - |
| `SECURITY_INITIALLOGIN_PASSWORD` | (secret) | System Settings |
| `SECURITY_INITIALLOGIN_USERNAME` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/template/stirling-pdf)
