# Deploy Airi on Railway

AIRI Web, a self-hosted AI companion with Live2D, VRM and voice. airi

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/airi)

## About

AIRI is an open-source AI virtual companion inspired by AI VTubers such as Neuro-sama. Its browser edition supports Live2D and VRM characters, real-time voice interaction, multiple AI providers, local browser storage, WebGPU features, and Progressive Web App installation across desktop and mobile devices.

This template deploys AIRI Stage Web as a prebuilt Docker image served by Nginx. Railway provides the public HTTPS endpoint, health checks, and container hosting, while most AIRI features run directly in the user's browser. No database or Railway volume is required for the standard deployment. Users configure their preferred language model, speech provider, API credentials, and character model from the AIRI interface. This template includes only the browser edition; desktop-only features such as native overlays, CUDA or Metal acceleration, local application awareness, and direct game integrations are not included.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Airi | `ghcr.io/xavto/airi-web-railway:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AIRI_VERSION` | v0.11.3 | AIRI source tag used to build the image, e.g. v0.11.3. |
| `VITE_ENABLE_POSTHOG` | false | Enable PostHog analytics during the frontend build. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/airi)
