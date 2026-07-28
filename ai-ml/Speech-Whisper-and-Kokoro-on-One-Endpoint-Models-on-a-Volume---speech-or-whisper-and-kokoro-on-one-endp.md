# Deploy Speech | Whisper and Kokoro on One Endpoint, Models on a Volume on Railway

Speech to text and text to speech on one endpoint, models kept on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/speech-or-whisper-and-kokoro-on-one-endp)

## About

Speech to text and text to speech behind one OpenAI-compatible address, running on CPU, with the models kept on a volume so they are downloaded once rather than on every deploy.

Point any OpenAI client at it: `/v1/audio/transcriptions` for recognition, `/v1/audio/speech` for synthesis.

Nine templates in the catalogue offer some piece of this. The most installed has 73 deployments at a 64% success rate; the only healthy one has 14. That many attempts with nothing working is a demand signal by itself.

Three things go wrong, and they are always the same three. The models are re-downloaded on every deploy because nothing persists them, so the first request after each deploy stalls for minutes. The API is left open on a public domain, so anyone who finds the URL runs models on your CPU. And only half the pair ships — recognition without synthesis, or the reverse — so you end up running two services that cannot share a cache.

This template is [Speaches](https://github.com/speaches-ai/speaches) pinned to an exact release, with a volume for the model cache, an API key that is enforced on every route, and both halves of the pair on one endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Speech | `ghcr.io/speaches-ai/speaches:0.9.0-rc.3-cpu` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `API_KEY` | (secret) |
| `ENABLE_UI` | false |
| `LOG_LEVEL` | info |
| `UVICORN_HOST` | 0.0.0.0 |
| `UVICORN_PORT` | 8000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/ubuntu/.cache/huggingface/hub`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/speech-or-whisper-and-kokoro-on-one-endp)
