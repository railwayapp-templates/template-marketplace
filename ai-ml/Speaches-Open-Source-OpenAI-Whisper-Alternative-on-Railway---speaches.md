# Deploy Speaches | Open-Source OpenAI Whisper Alternative on Railway on Railway

Self Host Speaches — OpenAI-compatible STT/TTS API server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/speaches)

## About

Deploy Speaches on Railway to run a fully self-hosted, OpenAI API-compatible speech-to-text and text-to-speech server. Speaches uses faster-whisper for transcription and Kokoro/Piper for speech synthesis — like Ollama, but for audio models. This template pre-configures Speaches with CPU-optimized int8 quantization, API key authentication, a persistent volume for model caching, and the Gradio web UI for interactive testing.

Self-host Speaches to process audio without sending data to third-party APIs. The deployment includes a single Speaches service with a HuggingFace model cache volume — no database required.

![Speaches dashboard screenshot](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777644493/3b7cf7e4-9bf6-4ff4-95af-823538c8face.png)

Speaches is an open-source (MIT) server that provides OpenAI-compatible speech-to-text and text-to-speech APIs. It dynamically loads and unloads models on demand — specify the model in your API request and Speaches downloads it from HuggingFace, runs inference, and optionally offloads it after a configurable TTL.

- **STT** via faster-whisper (4x faster than standard Whisper on CPU)
- **TTS** via Kokoro (#1 ranked on TTS Arena) and Piper (20+ languages)
- **Realtime WebSocket API** at `/v1/realtime` for two-way voice conversations
- **Streaming transcription** via Server-Sent Events
- **Dynamic model management** — models auto-download and auto-unload based on TTL settings

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Speaches | `ghcr.io/speaches-ai/speaches:0.9.0-rc.3-cpu` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | HTTP server listening port |
| `API_KEY` | (secret) | API key for endpoint auth |
| `ENABLE_UI` | true | Enable Gradio web interface |
| `LOG_LEVEL` | info | Production logging level |
| `UVICORN_HOST` | 0.0.0.0 | Server bind address |
| `UVICORN_PORT` | 8000 | Uvicorn server port |
| `STT_MODEL_TTL` | -1 | Never unload STT models |
| `TTS_MODEL_TTL` | -1 | Never unload TTS models |
| `WHISPER__COMPUTE_TYPE` | int8 | CPU-optimized quantization |
| `WHISPER__INFERENCE_DEVICE` | cpu | Force CPU inference |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/ubuntu/.cache/huggingface/hub`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/speaches)
