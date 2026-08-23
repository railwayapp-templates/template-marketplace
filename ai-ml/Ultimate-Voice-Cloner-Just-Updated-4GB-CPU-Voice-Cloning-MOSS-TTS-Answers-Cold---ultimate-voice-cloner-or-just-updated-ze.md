# Deploy Ultimate Voice Cloner | (Just Updated) 4GB CPU Voice Cloning, MOSS-TTS, Answers Cold on Railway

Zero-shot voice cloning on CPU, MOSS-TTS-Nano. One POST route, key-gated

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ultimate-voice-cloner-or-just-updated-ze)

## About

Ultimate Voice Cloner does one thing: you POST a short reference clip of a voice
plus some text, and it returns a WAV of that text spoken in that voice. There is
no voice menu, no transcription, no model picker and no second endpoint — one
route, key-gated, with every model weight already inside the image.

The model is [MOSS-TTS-Nano](https://huggingface.co/OpenMOSS-Team/MOSS-TTS-Nano-100M-ONNX),
the 0.1B-parameter member of the OpenMOSS MOSS-TTS family, paired with
[MOSS-Audio-Tokenizer-Nano](https://huggingface.co/OpenMOSS-Team/MOSS-Audio-Tokenizer-Nano-ONNX).
Both are **Apache-2.0**, so commercial use is allowed — which is why the two
better-known zero-shot cloners are not in here. XTTS-v2 ships under the Coqui
Public Model License (non-commercial), and F5-TTS has MIT code but CC-BY-NC-4.0
checkpoints; the licence that binds is the one on the weights, and handing a
one-click deploy of either to strangers would be handing them a problem.

MOSS-TTS-Nano is the smallest checkpoint in its family — the flagship MOSS-TTS
is 8B parameters and 17 GB of weights — and zero-shot cloning from a reference
clip is its primary documented workflow rather than a side capability. It runs
on CPU through OpenMOSS's own ONNX Runtime stack, so there is no GPU anywhere in
this template and no PyTorch in the image.

Every weight is baked in at build time. Nothing is fetched from Hugging Face at
boot. That matters more than it sounds: templates that download weights on first
use either serve errors until the download finishes or get killed outright by
Railway's healthcheck timeout. Measured here, the container is healthy about 11
seconds after start with the model loaded **and** the clone path warmed, and the
very first request after a cold deploy is answered — measured live on Railway at
HTTP 200 in 14.5 seconds wall clock, not a timeout.

`API_KEY` is generated for you and the service **refuses to start without it**.
An unauthenticated speech endpoint on a public URL is CPU-bound work anyone who
finds the URL can spend on your account, so failing closed is the only sane
default.

The entrypoint also sizes the inference thread pool from `/sys/fs/cgroup/cpu.max`
rather than `nproc`. Containers report the host's core count instead of their own
share — on Railway this service sees 32 cores and is given 8 — so an inference
container that trusts `nproc` starts four times more threads than it has CPU for.

**RAM floor: 4 GB.** Measured serving 8 of 8 consecutive requests at
`--memory 4g` with a flat 2.03 GB resident, and OOM-killed at 3 GB (exit 137,
which is the error Railway shows you nothing useful about). Railway's Trial cap
is 1 GB per service and Free is 0.5 GB, so this needs **Hobby or better**.

**It is slower than real time, and that is the honest number.** On Railway's
8 vCPU share the measured real-time factor is 1.5-1.8 — roughly 11 seconds of
compute for 7 seconds of speech. A 0.1B autoregressive model on a CPU share does
not beat real time, and if you need it to, you need a GPU and a different
template. What you get instead is an 11-second cold start and a first request
that works.

Cloning fidelity, measured rather than claimed, as cosine similarity between
speaker embeddings (Resemblyzer `VoiceEncoder`) with a 13.3-second reference:

| Pair | Similarity |
| --- | ---: |
| **output vs reference voice** | **0.917** |
| untouched base voice vs reference voice | 0.589 |
| output vs untouched base voice | 0.570 |

The output moves from 0.59 to 0.92 similarity with the target speaker and away
from the base voice. That is the clone working.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| voice-cloner | `ghcr.io/bon5co/voice-cloner-railway@sha256:876d7a027a7311796d982d2d54248f3f1dd173d7d2728eab7e065efbfe7519a4` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port the service binds. Must match the public domain's target port; leave it at 8080. |
| `API_KEY` | (secret) | Bearer token for POST /v1/clone. The service refuses to start without it, and refuses keys under 16 characters. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ultimate-voice-cloner-or-just-updated-ze)
