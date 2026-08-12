# Deploy Kokoro TTS Lite | OpenAI-Compatible Voice API, Runs on the Free Plan on Railway

OpenAI-compatible TTS on ONNX. Fits 512MB, runs on the Free plan.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kokoro-tts-lite)

## About

Kokoro TTS Lite is an OpenAI-compatible text-to-speech API for the Kokoro-82M model, running on ONNX
Runtime instead of PyTorch. It answers `POST /v1/audio/speech` exactly like OpenAI's endpoint, so the
official OpenAI SDKs work against it with nothing changed but the base URL — and it fits inside
Railway's smallest memory limits, including the 0.5 GB Free plan.

The usual Kokoro server images run PyTorch and hold about 1.1 GB resident, which is more memory than
the Free (0.5 GB) and Trial (1 GB) plans allow — the container is killed during model load and never
serves a request. This template runs the ONNX build and ships both quantised and full-precision
weights, so one variable picks the tradeoff that matches your plan:

| `MODEL_PRECISION` | Resident memory | 11 seconds of audio | Runs on |
| --- | --- | --- | --- |
| `int8` (default) | ~375 MB | ~9 s | Free, Trial, Hobby |
| `fp32` | ~610 MB | ~3 s | Trial, Hobby |

Both numbers are measured, not estimated. The model weights are baked into the image rather than
downloaded at boot, so a cold start is a few seconds and does not depend on your network. A
healthcheck on `/health` means Railway only routes traffic once the model is actually loaded.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kokoro TTS Lite | [bon5co/kokoro-lite-railway](https://github.com/bon5co/kokoro-lite-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8880 | Listen port |
| `API_KEY` | (secret) | Optional. When set, /v1/* requires Authorization: Bearer <key> |
| `DEFAULT_VOICE` | af_heart | Voice used when a request does not name one |
| `MODEL_PRECISION` | int8 | int8 fits the 0.5GB Free plan; fp32 is ~4x faster and needs ~610MB (Trial or above) |
| `OMP_NUM_THREADS` | 2 | ONNX thread cap. Raise to match your plan's vCPU count |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/kokoro-tts-lite)
