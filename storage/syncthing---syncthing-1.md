# Deploy syncthing on Railway

Continuous file synchronization — private, secure, decentralized.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/syncthing-1)

## About

This template deploys **Syncthing 2.1.1** on Railway using the official Docker image. It provides a self-hosted, private file synchronization server with a browser-based management interface. The deployment maps Railway's `PORT` environment variable directly to Syncthing's web UI port, ensuring seamless platform health checks and public routing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| syncthing | [INAPP-Mobile/railway-syncthing](https://github.com/INAPP-Mobile/railway-syncthing) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/syncthing-1)
