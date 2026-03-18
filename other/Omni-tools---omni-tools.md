# Deploy Omni tools on Railway

Deploy and Host Omni tools with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omni-tools)

## About

Omni Tools is a self​-hosted, web​-based suite of utilities—ranging from image/video converters and PDF manipulators to string, date, and math tools. It runs entirely in your browser without ads or tracking, packaged in a lightweight Docker container.

Deploying Omni Tools on Railway is seamless and efficient. The app is built to run as a static frontend, with no backend dependencies, and can be hosted via a lightweight Docker container or directly from source. On Railway, you can simply connect the GitHub repo, use the Dockerfile or prebuilt image, expose port 80, and deploy. Railway manages all the infrastructure, SSL certificates, and deployment pipelines, making it ideal for hosting a client-side utility suite like Omni Tools with minimal overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| omni-tools | [iib0011/omni-tools](https://github.com/iib0011/omni-tools) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/omni-tools)
