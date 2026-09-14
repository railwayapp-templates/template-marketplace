# Deploy Kokoro TTS API (CPU) on Railway

OpenAI-compatible Kokoro text-to-speech API on CPU, model baked in

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kokoro-tts-api-cpu)

## About

Kokoro TTS is an OpenAI-compatible text-to-speech API built on the open Kokoro-82M model, served by the Kokoro-FastAPI project. It speaks English, Spanish, French, Hindi, Italian, Japanese, Portuguese and Mandarin, supports voice mixing, inline multi-speaker tags and SSML, streams mp3, wav, opus, flac, aac or pcm, and ships a web player for trying voices in the browser.

Hosting Kokoro TTS is a single stateless container. This template uses the official CPU image `ghcr.io/remsky/kokoro-fastapi-cpu:v0.9.0` with the model weights and voice packs baked in, so there is no volume, no database, and no external API key. `PORT` is pinned to 8880 (the image entrypoint passes it to uvicorn) so Railway's healthcheck hits `/health` on the right port, `HOST` is `::` so other Railway services can reach it over IPv6 private networking, and the healthcheck window is 600 seconds because the model loads and warms up before the port opens. Inference runs on CPU and needs roughly 2 to 4 GB of RAM, so use the Hobby plan or higher.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kokoro TTS | `ghcr.io/remsky/kokoro-fastapi-cpu:v0.9.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Bind address. Keep 0.0.0.0: uvicorn binds '::' as IPv6-only (asyncio sets IPV6_V6ONLY) and Railway's healthcheck then never connects. |
| `PORT` | 8880 | Port uvicorn listens on. The image entrypoint passes it as --port, and Railway's healthcheck and edge proxy probe it. Keep at 8880 (the upstream default and the domain target port). |
| `USE_GPU` | false | Run inference on CPU. Railway has no GPUs; the CPU image already sets this, it is pinned here so it is visible. |
| `ENABLE_SSML` | true | Optional. Kill switch for SSML translation and the /dev/ssml routes. |
| `CORS_ORIGINS` | ["*"] | Optional. JSON list of allowed CORS origins for the web player and browser clients. Upstream default allows every origin; narrow it if you embed the API in your own site. |
| `API_LOG_LEVEL` | INFO | loguru log level for the API process (DEBUG, INFO, WARNING, ERROR). Upstream defaults to DEBUG, which is very chatty; INFO keeps Railway logs readable. |
| `DEFAULT_VOICE` | af_heart | Optional. Voice used when a request omits one, preselected in the web player, and used to warm the model at startup. List voices at GET /v1/audio/voices. |
| `WEB_CONCURRENCY` | 1 | Optional. uvicorn worker processes. Inference is synchronous and each worker loads its own model copy (roughly +1 GB RAM each). Keep at 1 unless you have raised the service memory limit. |
| `ENABLE_VOICE_TAGS` | true | Optional. Kill switch for inline [voice:...] tags and POST /dev/dialogue. Set false when proxying untrusted text. |
| `ENABLE_WEB_PLAYER` | true | Optional. Serve the browser UI at /web/. Set false for an API-only endpoint. |
| `ALLOW_LOCAL_VOICE_SAVING` | false | Optional. true lets POST /v1/audio/voices/combine download combined voice .pt files and /dev/tune save voices into the container. This service has no volume, so anything saved is lost on redeploy. |
| `MODEL_AUTO_UNLOAD_TIMEOUT_SECONDS` | 0 | Optional. Idle seconds before the model is unloaded from memory (reloaded lazily on the next request). 0 disables auto-unload. Useful to cut idle RAM on small plans at the cost of a slow first request. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/kokoro-tts-api-cpu)
