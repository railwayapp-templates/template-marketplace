# Deploy stirling-image on Railway

 Stirling-PDF but for images. 30+ tools in a single Docker container 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stirling-image)

## About

Stirling Image runs as a single Docker service on Railway using a pinned upstream image. Deployment is image-only and keeps setup simple.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app-lite | `stirlingimage/stirling-image:1.7.6-lite` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 1349 |
| `AUTH_ENABLED` | true |
| `DEFAULT_PASSWORD` | (secret) |
| `DEFAULT_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/stirling-image)
