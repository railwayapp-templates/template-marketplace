# Deploy Secured Signal Rest API on Railway

Template for a secure Signal Rest API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/secured-signal-rest-api)

## About

Secured Signal Rest API is a lightweight authentication proxy for signal-cli-rest-api. It adds bearer token authentication to protect your Signal messaging API, allowing you to safely expose Signal messaging capabilities to your applications without exposing the underlying API directly.

Hosting Secured Signal Rest API requires deploying two services: the signal-cli-rest-api backend (which handles actual Signal protocol communication) and the secured-signal proxy (which adds authentication). The signal-cli-rest-api service needs persistent storage to maintain your Signal account registration and encryption keys. The proxy sits in front, validating bearer tokens before forwarding requests to the backend. Railway's internal networking allows the backend to remain private while only the authenticated proxy is publicly accessible.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| secured-signal | `ghcr.io/codeshelldev/secured-signal-api:latest` | Web service |
| signal-api | `bbernhard/signal-cli-rest-api:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API__URL` | secured-signal | - | API Url for the Signal Rest API |
| `API__TOKENS` | secured-signal | (secret) | API tokens used to secure |
| `MODE` | signal-api | normal | Execution Mode  |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/v1/health`
- **Volume:** `/home/.local/share/signal-cli`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/secured-signal-rest-api)
