# Deploy Excalidraw on Railway

Self-hosted virtual whiteboard for diagrams and system design.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/excalidraw)

## About

Excalidraw is a free, open-source virtual whiteboard for creating hand-drawn style diagrams directly in the browser. It requires no account, stores nothing on third-party servers, and exports to PNG and SVG — making it a popular tool for engineers, designers, and teams.

Excalidraw is a single-container static web app served via nginx. There is no database, no authentication layer, and no runtime configuration required. Hosting it on Railway takes under a minute — Railway pulls the official `excalidraw/excalidraw` Docker image, provisions a public HTTPS URL, and handles SSL automatically. No environment variables, no volume mounts, no external services needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| excalidraw-railway | [Amritasha/excalidraw-railway](https://github.com/Amritasha/excalidraw-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/excalidraw)
