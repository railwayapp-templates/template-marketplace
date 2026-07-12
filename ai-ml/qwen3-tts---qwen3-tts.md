# Deploy qwen3-tts on Railway

Self-hosted TTS API, OpenAI-compatible. CPU-only Qwen3-TTS - no GPU bill.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qwen3-tts)

## About

# Qwen3-TTS — Text-to-Speech API (CPU, OpenAI-compatible)

**Qwen3-TTS** is Alibaba's open text-to-speech model family, served here by a **pure-C inference engine** — no Python, no PyTorch, **no GPU**. Point your existing OpenAI SDK at it and get natural speech in 10 languages (EN, ZH, JA, KO, DE, FR, RU, PT, ES, IT) with 9 preset voices, per-sentence emotion markup, style instructions, and chunked audio streaming.

## Endpoints

| Endpoint | What |
|---|---|
| `POST /v1/audio/speech` | **OpenAI-compatible**: `{"input":"text","voice":"ryan"}` → WAV |
| `POST /v1/tts` | `{"text","speaker","emotion","instruct","volume","rate"}` → WAV |
| `POST /v1/tts/stream` | same body → chunked PCM stream (low time-to-first-audio) |
| `GET /v1/speakers` | list preset voices |
| `GET /v1/health` | 200 when model is loaded |

Inline emotion markup works in the text: `"[joy] Great news! [sad] But I must go."`

## Quick start

```bash
curl -X POST https:///v1/tts \
  -H 'Content-Type: application/json' \
  -d '{"text":"Hello from Railway!","speaker":"ryan"}' -o hello.wav
```

## First boot

The 1.7B model (~3.4 GB) downloads to the attached volume on first start — **allow ~5–10 minutes before the service responds**. The download happens once; redeploys reuse the volume.

## Configuration (optional env vars)

| Var | Default | Options |
|---|---|---|
| `MODEL` | `large` | `small` (0.6B, ~2.5× faster) · `large` (1.7B, best quality) · `voice-design` · `base-small` / `base-large` |
| `WORKERS` | `4` | concurrent synthesis workers |
| `QUANT` | `int8` | `int4` (1.7B only, least RAM) · `bf16` (full precision) |
| `BATCH_SIZE` | `1` | ≥2 enables request batching for concurrent users |

## Notes

- CPU-bound: synthesis is slower than realtime on shared vCPUs — use the streaming endpoint for lower perceived latency, or `MODEL=small` for speed.
- RAM: ~4–6 GB for the default 1.7B int8 (~3 GB with `MODEL=small`).
- Engine: [bon5co/qwen3-tts](https://github.com/bon5co/qwen3-tts) (fork of [gabriele-mastrapasqua/qwen3-tts](https://github.com/gabriele-mastrapasqua/qwen3-tts) with Linux server fix + container packaging). MIT / Apache-2.0 model weights.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qwen3-tts | `ghcr.io/bon5co/qwen3-tts:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/models`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/qwen3-tts)
