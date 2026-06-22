# Deploy Andromeda - Shrink on Railway

A minimal image compression and resizing tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/andromeda-shrink)

## About

Andromeda - Shrink is a self-hosted Go image tool that compresses and resizes JPEGs using the standard library `image` package plus `golang.org/x/image/draw` for Catmull-Rom scaling. It exposes a simple upload UI and a compress endpoint; EXIF metadata is preserved while GPS data is stripped.

Hosting Andromeda - Shrink means running a single, stateless Go binary that serves an upload UI and processes images in memory over HTTP. There is no database and nothing to persist, so deployment requires only setting the bind host and port. The image is built from the included Dockerfile. On Railway, the build produces the container, the service listens on the configured port, and no volume or external service is needed. Upload limit is 20 MB.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| shrink | `ghcr.io/stevedylandev/andromeda/shrink` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/andromeda-shrink)
