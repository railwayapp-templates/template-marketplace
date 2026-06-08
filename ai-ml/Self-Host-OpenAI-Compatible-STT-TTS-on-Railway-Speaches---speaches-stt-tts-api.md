# Deploy Self-Host OpenAI-Compatible STT & TTS on Railway — Speaches on Railway

Self-host OpenAI-compatible STT & TTS. No per-minute fee. Audio stays local

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/speaches-stt-tts-api)

## About

![Speaches self-hosted STT/TTS dashboard](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777644493/3b7cf7e4-9bf6-4ff4-95af-823538c8face.png)

Speaches is an open-source, OpenAI API-compatible speech server — **like Ollama, but for
audio models**. Drop-in replacement for OpenAI's `/v1/audio/transcriptions` (STT) and
`/v1/audio/speech` (TTS) endpoints. Powered by faster-whisper (4× faster than standard
Whisper on CPU), Kokoro (ranked #1 on TTS Arena), and Piper (20+ languages) — all running
locally on your Railway instance with no audio ever leaving your server.

Self-host on Railway for ~$5–10/month versus OpenAI Whisper API at $0.36/hour or ElevenLabs
at $5–22/month with character caps. Zero per-minute fees. Unlimited transcriptions and speech
generation at flat compute cost.

---

Running a production STT/TTS server requires managing model downloads, CPU/GPU inference
configuration, API authentication, and a public HTTPS endpoint for application integration.
Without a managed host, you're configuring Docker, model storage volumes, SSL, and compute
resource allocation manually.

Railway pre-configures Speaches with CPU-optimized `int8` quantization, API key auth, a
persistent HuggingFace cache volume, and Gradio web UI — all at deploy time.

Typical cost: **~$5–10/month** on Railway's Hobby plan. OpenAI Whisper API costs $0.36/hour
— 30 hours of audio costs $10.80 before any TTS usage. ElevenLabs caps at 30,000 characters
on the starter plan. Speaches gives you unlimited STT and TTS at flat compute pricing.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Speaches | `speaches-ai/speaches:0.9.0-rc.3-cpu` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `API_KEY` | (secret) |
| `ENABLE_UI` | true |
| `LOG_LEVEL` | info |
| `UVICORN_HOST` | 0.0.0.0 |
| `UVICORN_PORT` | 8000 |
| `STT_MODEL_TTL` | -1 |
| `TTS_MODEL_TTL` | -1 |
| `WHISPER__COMPUTE_TYPE` | int8 |
| `WHISPER__INFERENCE_DEVICE` | cpu |

## Configuration

- **Volume:** `/home/ubuntu/.cache/huggingface/hub`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/speaches-stt-tts-api)
