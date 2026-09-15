# Deploy BankMCP on Railway

Deploy and Host BankMCP™ on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bankmcptm)

## About

This template deploys the published image with a volume at `/data` and a public domain. A fresh server shows a setup page in the browser, where you enter your own Enable Banking application id, private key and a password. Everything stays on your volume. You are the only user of your copy; there is no hosted BankMCP™ and nobody else handles your key or consents.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bankmcp | `ghcr.io/noskillish/bankmcp:latest` | Web service |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bankmcptm)
