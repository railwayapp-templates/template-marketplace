# Deploy Kokoro-TTS on Railway

Turns written text into natural-sounding speech, in 60+ voices

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kokoro-tts)

## About

Kokoro TTS turns written text into natural-sounding speech from an API that speaks the same dialect as OpenAI's `/v1/audio/speech`. It wraps Kokoro-82M, an Apache-2.0 model small enough — 82 million parameters, about 330 MB of weights — to run faster than real time on ordinary CPUs, no GPU involved. Teams self-host Kokoro TTS for audiobook narration, screen readers, voice assistants and video voiceover: it stops the per-character bill, keeps the text on infrastructure they control, and drops into existing code by changing one base URL. The server is `remsky/Kokoro-FastAPI`, which adds streaming, voice blending, caption timestamps, SSML and a browser player.

This template runs it as two Railway services. `kokoro` holds the model and does the synthesis; it gets no public domain, because Kokoro-FastAPI ships with no authentication of its own and its docs tell clients to send `api_key="not-needed"`. A small Caddy `gateway` owns the only public URL: API clients send `Authorization: Bearer` with the generated key exactly as an OpenAI SDK would, while browsers get a basic-auth prompt whose credentials the browser then replays on the player's own requests. The model and all 68 voice packs are baked into the image, so there is no first-boot download, no volume, no database.

![Kokoro TTS service behind a Caddy gateway on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787236301/kokoro-tts-architecture.png)

Commercial speech APIs bill per character, and that bill scales with exactly the workloads that make text-to-speech worth having: long documents, whole audiobooks, every message in a chat assistant. Kokoro TTS removes the meter, and being small and CPU-friendly, one container serves a steady stream of requests on ordinary hardware.

- **OpenAI-compatible endpoints** — `/v1/audio/speech`, `/v1/audio/voices`, `/v1/models`; existing code needs only a new base URL and key
- **68 voices across eight languages** — English (US and UK), Spanish, French, Hindi, Italian, Japanese, Brazilian Portuguese, Mandarin
- **Weighted voice blending** — combine voices by weight, as in `af_bella(2)+af_sky(1)`
- **Inline multi-speaker dialogue** — `[voice:name]` tags switch speaker mid-document
- **Streaming output** — audio arrives while the rest renders, as MP3, WAV, PCM, Opus, FLAC or AAC
- **Caption timestamps and SSML** — word-level timings for read-along interfaces

`kokoro` loads the model at startup, keeps it warm and answers every synthesis request. `gateway` terminates the public URL, checks credentials, forwards over the private network, and streams responses unbuffered so long passages still start playing quickly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | [gridalpha/kokoro-tts-railway](https://github.com/gridalpha/kokoro-tts-railway) | Web service |
| kokoro | `ghcr.io/remsky/kokoro-fastapi-cpu:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gateway | 8080 | Port Caddy binds for public traffic |
| `KOKORO_API_KEY` | gateway | (secret) | Bearer token for the OpenAI-compatible API |
| `KOKORO_PASSWORD` | gateway | (secret) | Basic-auth password for the web player |
| `KOKORO_UPSTREAM` | gateway | - | Private address of the inference service |
| `KOKORO_USERNAME` | gateway | (secret) | Basic-auth user for the web player |
| `PORT` | kokoro | 8880 | Port Railway probes; the app hardcodes 8880 |
| `USE_GPU` | kokoro | false | CPU inference only |
| `DEVICE_TYPE` | kokoro | cpu | Skips MPS and CUDA auto-detection |
| `ENABLE_SSML` | kokoro | true | SSML translation and SSML routes |
| `API_LOG_LEVEL` | kokoro | INFO | Log verbosity, upstream default is DEBUG |
| `DEFAULT_VOICE` | kokoro | af_heart | Voice used when a request names none |
| `ALLOW_DEV_UNLOAD` | kokoro | false | Keeps the model unload route off |
| `ENABLE_VOICE_TAGS` | kokoro | true | Inline [voice:name] multi-speaker parsing |
| `ENABLE_WEB_PLAYER` | kokoro | true | Serves the browser player at /web/ |
| `ENABLE_DEBUG_ENDPOINTS` | kokoro | false | Keeps host introspection routes off |
| `ALLOW_LOCAL_VOICE_SAVING` | kokoro | false | Writing blended voices would need a volume |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'read -r q p < /sys/fs/cgroup/cpu.max || true; case "$q" in ""|max) C=8;; *) C=$((q/p));; esac; [ "${C:-0}" -lt 1 ] && C=1; export OMP_NUM_THREADS=$C MKL_NUM_THREADS=$C OPENBLAS_NUM_THREADS=$C NUMEXPR_NUM_THREADS=$C; echo "kokoro: cgroup cpu quota -> OMP_NUM_THREADS=$C"; exec ./entrypoint.sh'`
- **Healthcheck:** `/health`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/kokoro-tts)
