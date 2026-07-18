# Deploy MOSS TTS - Voice Cloning API (CPU, OpenAI-compatible) on Railway

Voice-cloning TTS with an OpenAI-compatible API. CPU-only, no GPU bill.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/moss-tts-voice-cloning-api-cpu-openai-co)

## About

MOSS-TTS is OpenMOSS's open text-to-speech model family with zero-shot voice cloning: give it a 5–15 second reference clip and it speaks any text in that voice. This template serves it behind an OpenAI-compatible API (`POST /v1/audio/speech`) on CPU — no GPU bill.

This template runs a FastAPI server wrapping the MOSS-TTS-Local-Transformer model (1.7B, bfloat16) — sized to fit Railway's 8GB / 8 vCPU tier. On first boot the server downloads ~13GB of model weights to ephemeral disk (a few minutes); warm it up with `POST /v1/models/preload` and watch `GET /health` for `loaded_model`. Uploaded voice reference clips persist on the attached volume at `/data`, so your cloned voices survive redeploys. All inference routes are protected by the `API_KEY` bearer token generated at deploy. Larger MOSS variants (4B, 8B) are one `MODEL_ID` env var away on bigger instances. Generation is CPU-bound — roughly 15s of compute per second of audio — ideal for async/batch workloads rather than realtime.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| moss-tts-api | `ghcr.io/bon5co/moss-tts-api:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/moss-tts-voice-cloning-api-cpu-openai-co)
