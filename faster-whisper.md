# Deploy Faster Whisper on Railway

Private Speech-to-Text STT & Text-to-Speech TTS, OpenAI & 52 voices

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/faster-whisper)

## About

**100% Private Speech-to-Text and Text-to-Speech. One-click deploy, ready in 2 minutes.** Your audio never leaves your server —
  unlike OpenAI, Google, or AssemblyAI. No Docker knowledge needed. Includes 52 natural voices and 100+ languages.

  ## About Hosting Faster Whisper

  With cloud transcription services, every audio file is uploaded to someone else's servers. With Faster Whisper on Railway, your
  audio is processed locally and never sent to any third party. No vendor training on your data. Full compliance control for GDPR,
  HIPAA, and data residency requirements.

  This template deploys a complete speech platform: Speech-to-Text transcription with subtitle generation (SRT/VTT), plus
  Text-to-Speech with 52 natural voices across 9 languages. It includes a polished web interface for browser use and an
  OpenAI-compatible REST API for programmatic access. API key authentication is auto-configured on deploy.

  | | **This Template** | **OpenAI Whisper API** | **Google Speech-to-Text** |
  |---|---|---|---|
  | **Data privacy** | Your server only | Uploaded to OpenAI | Uploaded to Google |
  | **Data training** | Never | May be used per ToS | May be used per ToS |
  | **Pricing** | ~$7-15/mo flat | $0.006/min (usage) | $0.006-0.009/min |
  | **Setup time** | 2 minutes | API key signup | Console + billing |
  | **API format** | OpenAI-compatible | OpenAI | Google |
  | **Text-to-Speech** | 52 voices included | Separate API | Separate API |

  ## Common Use Cases

  - **Confidential transcription** — medical, legal, or financial recordings stay on your server
  - **Subtitle generation** — create SRT/VTT files for video, YouTube, and social media
  - **Text-to-Speech** — generate spoken audio with 52 natural voices across 9 languages
  - **Voice-to-text for apps** — add speech recognition to any application via a simple OpenAI-compatible API call
  - **AI agent audio processing** — give AI agents the ability to process voice inputs and generate speech

  ## Dependencies for Faster Whisper Hosting

  - **Faster Whisper** — CTranslate2-based speech recognition engine (MIT, 20.9k GitHub stars)
  - **Speaches** — OpenAI-compatible API server (MIT, 2.9k stars)
  - **Kokoro TTS** — lightweight ONNX text-to-speech model with 52 voices (Apache 2.0)
  - **Volume storage** — caches downloaded AI models (~300 MB for default configuration)

  ### Deployment Dependencies

  - [Speaches](https://github.com/speaches-ai/speaches) — API server
  - [Faster Whisper](https://github.com/SYSTRAN/faster-whisper) — STT engine
  - [Kokoro TTS](https://huggingface.co/speaches-ai/Kokoro-82M-v1.0-ONNX) — TTS model
  - [Whisper Models](https://huggingface.co/Systran) — speech recognition models
  - Docker Image: `ghcr.io/speaches-ai/speaches:0.9.0-rc.3-cpu`

  ### Why Deploy Faster Whisper on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to
  deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying Faster Whisper on Railway, you are one step closer to supporting a complete full-stack application with minimal
  burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Faster Whisper | [ACT900/faster-whisper-railway](https://github.com/ACT900/faster-whisper-railway) (branch: master) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Server port. Do not change. |
| `API_KEY` | (secret) | Auto-generated API key. Find in Variables tab after deploy. |
| `ENABLE_UI` | false | Custom frontend enabled. Do not change. |
| `LOG_LEVEL` | info | Logging verbosity: debug, info, warning, error. |
| `ALLOW_ORIGINS` | ["*"] | CORS allowed origins. Change to your domain for production. |
| `STT_MODEL_TTL` | -1 | Seconds before unloading model from memory. -1 = never unload. |
| `PRELOAD_MODELS` | ["Systran/faster-whisper-base","speaches-ai/Kokoro-82M-v1.0-ONNX"] | AI models downloaded at startup. Includes STT (base) and TTS (Kokoro). See README for model options. |
| `WHISPER__COMPUTE_TYPE` | int8 | Quantization type for CPU inference. INT8 recommended. |
| `WHISPER__INFERENCE_DEVICE` | cpu | Inference device. CPU only on Railway. |

## Configuration

- **Healthcheck:** `/docs`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/ubuntu/.cache/huggingface/hub`

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/faster-whisper)
