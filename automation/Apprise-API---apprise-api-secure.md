# Deploy Apprise API on Railway

Password-protected persistent notification gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apprise-api-secure)

## About

Apprise API wraps the Apprise notification library in a web UI and REST API supporting many chat, email, push, incident, and webhook services. This template deploys stable version 1.5.1 with generated Basic Auth and durable configuration storage.

Authenticate with `APPRISE_AUTH_USER` and the generated `APPRISE_AUTH_PASSWORD` service variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| apprise | [monotykamary/railway-template-apprise-api](https://github.com/monotykamary/railway-template-apprise-api) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Runtime timezone. |
| `PORT` | 8000 | Internal Nginx port. |
| `APPRISE_ADMIN` | y | Allow the authenticated operator to list stored configuration keys. |
| `APPRISE_AUTH_USER` | (secret) | Nginx Basic Auth username. |
| `APPRISE_WORKER_COUNT` | 1 | Single worker suited to the one-volume topology. |
| `APPRISE_AUTH_PASSWORD` | (secret) | Generated Nginx Basic Auth password. |
| `APPRISE_STATEFUL_MODE` | simple | Store named Apprise configurations as persistent files. |

## Configuration

- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** Shell, Python, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/apprise-api-secure)
