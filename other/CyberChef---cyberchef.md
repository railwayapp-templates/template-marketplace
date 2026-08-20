# Deploy CyberChef on Railway

Web app for encryption, encoding, compression and data analysis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cyberchef)

## About

The Cyber Swiss Army Knife - a web app for encryption, encoding, compression and data analysis.

Hosting CyberChef is lightweight because it runs entirely in the browser as a static web app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CyberChef | `ghcr.io/gchq/cyberchef:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Listening Port - Keep 8080 |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/cyberchef)
