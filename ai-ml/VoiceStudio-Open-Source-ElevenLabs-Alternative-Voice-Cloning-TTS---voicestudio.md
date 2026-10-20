# Deploy VoiceStudio | Open-Source ElevenLabs Alternative, Voice Cloning & TTS on Railway

Voice cloning, text-to-speech, dubbing and transcription in your browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/voicestudio)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/voicestudio?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=voicestudio)

[VoiceStudio](https://github.com/debpalash/VoiceStudio) is an open-source alternative to ElevenLabs. It clones a voice from a short sample, designs new voices from a description, generates speech in hundreds of languages, dubs videos, transcribes audio and builds audiobooks. This template runs the official VoiceStudio server image, so you get the full Studio web UI in your browser plus an OpenAI-compatible speech API. The models run inside the container, so your text and voice samples never go to a third-party API.

It's one service and a Railway volume.

- **Locked from the first boot.** A random admin key (`OMNIVOICE_API_KEY`) is generated at deploy time. The web UI asks for it once and swaps it for a short-lived browser session; API clients send it as a Bearer token. Without it, everything except the page shell is refused.
- **HTTPS out of the box.** Railway terminates TLS, so the key and session cookie never travel in plain text.
- **Models and voices survive redeploys.** The project database, your cloned voices, settings and the Hugging Face model cache all live on the volume at `/app/omnivoice_data`.
- **Lean on memory.** Cached files the server isn't using are dropped every 5 minutes, because Railway bills the cache as RAM: about 600 MB idle before the first generation instead of 2 GB.
- **CPU inference, tuned.** Railway has no GPUs, so VoiceStudio runs on CPU. The template caps PyTorch at your plan's vCPUs (`OMP_NUM_THREADS`, default 8). Without that cap PyTorch sees the host's 48 cores, oversubscribes the 8 it's allowed, and a single sentence took over 15 minutes in our tests; with it, a short sentence takes about 20 seconds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VoiceStudio | `ghcr.io/debpalash/voicestudio:0.5.6` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3900 | Port Railway routes to - leave as is |
| `HF_TOKEN` | (secret) | Optional Hugging Face token, for gated models and faster downloads |
| `MKL_NUM_THREADS` | - | Same thread cap for the math library - leave as is |
| `OMP_NUM_THREADS` | 8 | CPU threads for inference - match your plan's vCPUs (Hobby 8, Pro up to 32). Without it PyTorch oversubscribes and stalls |
| `OMNIVOICE_API_KEY` | (secret) | Admin key - the web UI asks for it once; also the Bearer token for the API |

## Configuration

- **Start command:** `/bin/sh -c "(while sleep 300; do find / /app/omnivoice_data -xdev -type f -size +64k 2>/dev/null | while read -r f; do dd if=$f iflag=nocache count=0 status=none 2>/dev/null; done; done) & exec python3 -m uvicorn backend.main:app --host 0.0.0.0 --port 3900"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/omnivoice_data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/voicestudio)
