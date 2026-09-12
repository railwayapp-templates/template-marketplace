# Deploy Background Removal API | (Just Updated) rembg, Weights Baked In, 2GB RAM Floor on Railway

rembg cutouts, weights baked in, commercial-safe models only, 2GB RAM floor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/background-removal-api-or-just-updated-r)

## About

rembg is the open-source background remover: send it a photo, get back a transparent PNG with the subject cut out. This template serves rembg's own HTTP API with the ONNX weights already inside the image, a bearer token on every route, and a model set restricted to weights that are licensed for commercial use.

This template runs rembg 2.0.84's FastAPI server on CPU — no GPU bill. The default U²-Net weights are baked into the image, so the very first request is answered in under a second instead of downloading hundreds of megabytes inside a request the platform edge abandons after five minutes. ONNX Runtime's thread pools are sized from the container's own CPU quota rather than the host's core count, which a container otherwise sees and oversubscribes. Every route except the health check requires `Authorization: Bearer $API_KEY`, and the key is generated for you at deploy; the container refuses to start without one. A volume at `/data` keeps the model cache across redeploys. Measured floor is **2 GB of RAM**: on Railway's 8 vCPU box the service sits at 0.70 GB idle and 1.63 GB with the default model serving, and a 1 GB container is OOM-killed on its first image. Keep several models loaded at once and it reaches 2.4 GB, so give it 4 GB if you plan to switch models per request. Free and Trial plans cannot run it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rembg | `ghcr.io/bon5co/rembg-railway:2.0.84` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/background-removal-api-or-just-updated-r)
