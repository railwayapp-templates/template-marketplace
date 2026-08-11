# Deploy Yes Play Music - API on Railway

High aesthetic third-party NetEase cloud player.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yesplaymusic)

## About

YesPlayMusic is a third-party NetEase Cloud Music player focused on providing a polished and visually appealing music listening experience. It provides an alternative web interface for accessing NetEase Cloud Music content and is designed for users who prefer a modern, aesthetic player experience.

Hosting YesPlayMusic on Railway involves deploying the provided `fogforest/yesplaymusic` Docker image as a Railway service. The application exposes its web interface on port `3001`, which should be configured as a public HTTP port so users can access the player through a Railway-generated domain. Railway handles the container runtime and public networking, including HTTPS access through the generated domain. The supplied deployment template does not document any required environment variables, databases, persistent volumes, or additional services. As a result, YesPlayMusic can be deployed as a single Railway service using the provided container image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fogforest/yesplaymusic | `fogforest/yesplaymusic` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 3001 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/yesplaymusic)
