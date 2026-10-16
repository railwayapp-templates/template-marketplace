# Deploy Moocup on Railway

Create stunning screenshots in seconds

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moocup-1)

## About

![Moocup Banner](https://github.com/jellydeck/moocup/raw/main/static/og.webp)

Moocup is a free, open-source screenshot editor that helps you create polished visuals from screenshots. Upload an image, apply a base style, customize its appearance, and export the result. Deploy Moocup on Railway to run your own online screenshot editor, accessible through a public domain.

Hosting Moocup on Railway gives you a personal, web-based screenshot editor without needing to run it on your computer. The template deploys Moocup using its official Docker image and makes the application accessible through a Railway-generated domain. Once deployment is complete, open the domain in your browser to start editing screenshots. The application uses HTTP proxy port `80`. No separate database or additional services are required for the basic deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Moocup | `jellydeck/moocup:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/moocup-1)
