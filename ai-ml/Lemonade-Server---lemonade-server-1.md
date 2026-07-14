# Deploy Lemonade Server on Railway

Self-host Lemonade — an OpenAI-compatible local AI server on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lemonade-server-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/lemonade-server-1)

Lemonade Server runs as a single Docker container wrapping the official `ghcr.io/lemonade-sdk/lemonade-server:latest` image. A thin entrypoint launches the `lemond` binary on Railway's injected `$PORT`, exposes a `/live` healthcheck, and defaults to the **CPU** backend (Railway's managed containers have no GPU passthrough). Models auto-download from HuggingFace on first request and are cached on a persistent Railway volume, so reboots don't re-fetch weights.

- **Default Port:** Railway injects `$PORT` (the server binds it directly)
- **Built-in Web UI:** Lemonade's own model manager + chat GUI is served at the service root (`/`) on the same port as the API — open your Railway domain in a browser to use it (no Open WebUI or extra service needed)
- **Health Check:** `GET /live` → `{"status":"ok"}`
- **Startup Time:** ~10-20 seconds (server boots; model weights download on demand)
- **Resource Usage:** CPU-only; a 0.6B Q4 model is usable, larger models are slow

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Lemonade Server | [INAPP-Mobile/railway-lemonade](https://github.com/INAPP-Mobile/railway-lemonade) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LEMONADE_BACKEND` | cpu | llama.cpp backend for inference. 'cpu' is reliable on Railway's managed containers. Advanced GPU hosts may try 'vulkan'/'rocm'. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.cache`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/lemonade-server-1)
