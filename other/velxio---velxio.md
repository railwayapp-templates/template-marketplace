# Deploy velxio on Railway

Browser-based Arduino, ESP32, RP2040, and circuit simulator.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/velxio)

## About

Velxio is an open-source browser-based electronics simulator for Arduino, ESP32, RP2040, and other embedded boards. Users write code, wire circuits, compile sketches, and run interactive emulations directly in a web browser. Its self-hosted image bundles the frontend, FastAPI compiler backend, nginx proxy, and embedded toolchains.

Railway runs the official multi-architecture GHCR image as a single HTTP service with a generated public domain. A persistent volume stores project data and the generated signing key, while Railway variables configure routing and optional product news.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| velxio | `ghcr.io/davidmonterocrespo24/velxio:master` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECRET_KEY` | (secret) |

## Configuration

- **Start command:** `sh -c 'rm -f /etc/nginx/sites-enabled/default && exec /app/entrypoint.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/velxio)
