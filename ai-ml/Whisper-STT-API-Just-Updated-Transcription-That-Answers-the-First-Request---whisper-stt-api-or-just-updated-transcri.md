# Deploy Whisper STT API | (Just Updated) Transcription That Answers the First Request on Railway

OpenAI-compatible speech to text, model baked in, threads sized to the box

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whisper-stt-api-or-just-updated-transcri)

## About

An OpenAI-compatible speech-to-text endpoint — `POST /v1/audio/transcriptions` — running
Whisper on CPU through [Speaches](https://github.com/speaches-ai/speaches) and
faster-whisper. Point any OpenAI client at the URL, change the base URL, and keep the
audio on your own infrastructure.

The transcription model ships **inside the image**, so the first request after the deploy
returns a transcript instead of an error.

Speaches serves the OpenAI audio API on top of CTranslate2. Three things decide whether a
deployment of it is usable, and they are the three this template fixes.

**A model has to be present before the first call.** Speaches does not fetch a model on
demand — a deploy with an empty cache answers `404 Model 'Systran/faster-whisper-small' is
not installed locally` to every transcription request while the container stays healthy
and `/v1/models` lists only the voice-activity detector. This template bakes
`Systran/faster-whisper-small` into the image and copies it onto the volume on first boot,
because a Railway volume is a bind mount that would otherwise hide anything the image
build left under its path.

**The thread pool should match the container.** `cpu_threads` defaults to `0`, which lets
CTranslate2 size its pool from the cores it can see — the host's count, not the
container's quota; this deploy's container saw 32 cores against a quota of 8. The
entrypoint reads `/sys/fs/cgroup/cpu.max` and pins the pool per deploy. Measured on one
host at `--cpus 2 --memory 2g` on the same 60.9-second file, warm: 15.03 s and 14.35 s
with the default against 11.54 s and 11.69 s pinned. On Railway itself the same test is a
smaller and noisier win — around 3.2 s pinned against 3.5 s unpinned — so this is a
modest, not a dramatic, difference.

**The endpoint has to be closed.** Speaches installs its auth dependency only when
`API_KEY` is set, so an unset key publishes transcription to anyone who finds the URL.
The key is generated per deploy and the container refuses to boot without one. The Gradio
playground, which is served with no authentication of its own, is off.

The volume is mounted as uid 0 by the platform while the image runs as `ubuntu`
(uid 1000); the entrypoint repairs the ownership and drops privileges rather than running
the server as root.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| whisper | `ghcr.io/bon5co/whisper-railway:0.9.0-rc.3` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/ubuntu/.cache/huggingface/hub`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/whisper-stt-api-or-just-updated-transcri)
