# Deploy convert-railway on Railway

Private browser-based universal file conversion on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convert-railway)

## About

Convert is a private browser-based universal file conversion on Railway.

Deploy the upstream GHCR container as a single Railway web service. Railway provides managed networking and a public HTTPS domain for the browser-based file conversion UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| convert | `ghcr.io/p2r3/convert@sha256:bceb2cd600fce6460411362b797768840a6a09a38a1adc8edafa3334c36bfc85` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/convert-railway)
