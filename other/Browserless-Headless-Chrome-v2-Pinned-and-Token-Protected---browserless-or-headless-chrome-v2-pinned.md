# Deploy Browserless | Headless Chrome v2, Pinned and Token-Protected on Railway

Browserless v2 pinned, token-protected headless Chrome as a service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/browserless-or-headless-chrome-v2-pinned)

## About

Headless Chrome as a service - Browserless v2, pinned, behind a generated token.

The Browserless template on Railway is literally called "Browserless v1", and that is the problem. Upstream moved to v2 in 2023; v1 stopped at 1.61.1 and receives nothing - no Chrome updates, no security fixes. It also builds from a repository rather than the published image, which is why about one deployment in six fails.

This one runs the official v2 image at a pinned version, with a generated token and sane concurrency limits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Browserless | `ghcr.io/browserless/chromium:v2.55.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CORS` | true |
| `HOST` | 0.0.0.0 |
| `PORT` | 3000 |
| `TOKEN` | (secret) |
| `QUEUED` | 10 |
| `TIMEOUT` | 300000 |
| `CONCURRENT` | 5 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/browserless-or-headless-chrome-v2-pinned)
