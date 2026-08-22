# Deploy Pocket TTS on Railway

CPU-only text-to-speech API. Send text, get audio back.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocket-tts)

## About

Pocket TTS is a text-to-speech engine from Kyutai Labs that runs entirely on CPU. No GPU needed. Send text to its API, get natural-sounding audio back in under 200 milliseconds. The model is 100 million parameters — small enough to run on two CPU cores, fast enough for real-time use.

Pocket TTS runs as a Python service that loads a lightweight speech model into memory and serves an HTTP API. You send a text string, it returns an audio file. The model runs inference on CPU only, so it works on any Railway plan without GPU add-ons. Expect the service to use moderate CPU during synthesis and idle between requests.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocket-tts | [kyutai-labs/pocket-tts](https://github.com/kyutai-labs/pocket-tts) | Worker |

**Category:** AI/ML · **Languages:** Python, HTML, HCL, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/pocket-tts)
