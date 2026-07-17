# Deploy Cobalt Web UI on Railway

Self-hosted beautiful web interface for your Cobalt Tools API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cobalt-web-ui)

## About

Self-hosted beautiful web interface for your Cobalt Tools API.

This template deploys the official Cobalt web frontend so you can use a clean and modern web UI connected to your self-hosted Cobalt API.

![Cobalt Web UI](https://imgur.com/4kBxy2C.png)

> **Important**: This template only deploys the **Web UI**. You must deploy the Cobalt Tools API separately.

Hosting the Cobalt Web UI allows you to run a beautiful frontend for your self-hosted Cobalt Tools instance. Instead of relying on the public cobalt.tools website or using only the API, you can deploy your own web interface that connects directly to your Cobalt API.

This Web UI communicates with your Cobalt API to process media download requests from supported platforms such as YouTube, TikTok, Instagram, Twitter/X, Reddit, and more.

The template is designed to work together with the existing Cobalt Tools API deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cobalt-web | `ghcr.io/spotdemo4/cobalt-web:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8787 |
| `LOG_LEVEL` | info |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/cobalt-web-ui)
