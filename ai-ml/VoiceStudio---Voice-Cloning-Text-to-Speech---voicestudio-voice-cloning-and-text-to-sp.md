# Deploy VoiceStudio - Voice Cloning & Text-to-Speech on Railway

VoiceStudio web: voice cloning, TTS & transcription on CPU. voice studio

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/voicestudio-voice-cloning-and-text-to-sp)

## About

VoiceStudio is an open-source voice production studio for voice cloning, text-to-speech, transcription, video dubbing and audiobook creation. This template hosts the official browser interface and audio API on Railway, with persistent storage and administrator authentication. Open the Railway URL in a browser to use the studio; no desktop installation is needed.

This template deploys one service from the official VoiceStudio 0.5.6 Docker image. The container serves the web interface and backend together on port 3900. Railway provides HTTPS networking, health checks and a persistent volume for your projects, voice profiles, generated audio, settings and downloaded models. Every deployment receives its own administrator key. Inference runs on Railway CPU resources because Railway does not provide GPUs. Install the models you need from the studio's Model Catalogue after signing in. The standard OmniVoice workflow does not require a paid AI provider or a Hugging Face token.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VoiceStudio | `ghcr.io/debpalash/voicestudio:0.5.6` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3900 | HTTP port used by VoiceStudio and Railway public networking. Keep 3900. |
| `HF_HOME` | /app/omnivoice_data/huggingface | Persistent Hugging Face model cache on the Railway volume. |
| `MKL_NUM_THREADS` | 8 | Maximum MKL CPU threads used for inference. Default: 8. |
| `OMP_NUM_THREADS` | 8 | Maximum OpenMP CPU threads used for inference. Default: 8. |
| `OMNIVOICE_DEVICE` | cpu | CPU inference for Railway services, which do not provide GPUs. |
| `PYTHONUNBUFFERED` | 1 | Flush Python logs immediately so startup and model progress appear in Railway logs. |
| `OMNIVOICE_API_KEY` | (secret) | Automatically generates a unique administrator key. After deployment, copy it from Railway Variables to sign in to the web UI. |
| `OMNIVOICE_DATA_DIR` | /app/omnivoice_data | Persistent directory for projects, voice profiles, generated audio and settings. Matches the attached Railway volume. |
| `OMNIVOICE_SERVER_MODE` | 1 | Enable the supported Docker server mode and authenticated browser administration. Keep 1. |
| `OMNIVOICE_ALLOWED_HOSTS` | - | Automatically allow this deployment’s Railway public domain. Add a custom hostname here when using a custom domain. |
| `OMNIVOICE_ALLOWED_ORIGINS` | - | Exact HTTPS browser origin for this deployment. Add your custom domain origin when using a custom domain. |
| `OMNIVOICE_ANALYTICS_DISABLED` | 1 | Disable optional usage analytics for the hosted instance. Default: 1. |

## Configuration

- **Start command:** `python3 -m uvicorn backend.main:app --host 0.0.0.0 --port 3900 --proxy-headers --forwarded-allow-ips '*'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/omnivoice_data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/voicestudio-voice-cloning-and-text-to-sp)
