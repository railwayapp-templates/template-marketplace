# Deploy Debian 13 (Web Terminal) on Railway

Instant Debian 13 browser terminal powered by ttyd

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/debian-13-web-terminal)

## About

This template provides a **one-click Debian 13 web terminal** running on Railway, giving you instant browser-based access to a full Linux shell without managing servers or SSH keys. Debian 13 (Trixie) is a stable, community-driven Linux distribution known for reliability, security, and long-term support.

Deploying Debian 13 (Web Terminal) on Railway uses the official minimal Debian Docker image in a lightweight containerized environment. Railway manages orchestration, networking, and scaling, delivering a clean Debian instance without server management overhead. A persistent volume is mounted at `/data` to retain files, configurations, and application data across redeployments and restarts. This setup is ideal for reproducible Linux environments, testing, and long-running workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Debian 13 (Web Terminal) | [decoge/debian-13-webterminal-railway](https://github.com/decoge/debian-13-webterminal-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Choose a Password for ttyd web terminal basic authentication. |
| `USERNAME` | (secret) | Choose a Username for ttyd web terminal basic authentication. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/debian-13-web-terminal)
