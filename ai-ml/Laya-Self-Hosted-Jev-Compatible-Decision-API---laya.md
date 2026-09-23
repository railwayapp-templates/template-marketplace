# Deploy Laya | Self-Hosted Jev-Compatible Decision API on Railway

Open-weights Laya decision model behind a TypeSafe/Jev-compatible API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/laya)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/laya?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=laya)

[Laya](https://github.com/NandhaKishorM/laya) is an open-weights (Apache-2.0) decision model. You give it a piece of text (a ticket, an email, a JSON record) and typed questions: pick one of several options, place it on a scale, or yes/no. It answers each with calibrated probabilities in a single forward pass and never generates text. The interface follows TypeSafe's Jev, and this template serves Laya over Jev's HTTP API, so code written for the TypeSafe SDKs runs against your own server once you change one environment variable.

One service, no database or volume. The checkpoints ship inside the image.

- **Drop-in for the TypeSafe API.** `POST /v1/systemone` and `GET /v1/models` take and return the same shapes as `api.typesafe.ai`. The official Python and JavaScript SDKs work unchanged; both were tested against this template.
- **Route mode, as upstream recommends.** Both general-purpose checkpoints are loaded: English (ModernBERT-large, 421M) and multilingual (mmBERT-base, 322M, 100+ languages). Each request goes to the right one by script and language.
- **No GPU, no downloads at boot.** The weights are baked into the image at a pinned Hugging Face revision, so answers don't change under you, and a restart never waits on Hugging Face. It runs on Railway's CPUs at about 0.2–0.9 s per call.
- **Private by default.** Every `/v1` call needs the generated `LAYA_API_KEY` as a Bearer token. The server refuses to start without one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Laya | [nomideusz/laya-railway](https://github.com/nomideusz/laya-railway) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port the API listens on behind the Railway domain - leave as is |
| `LAYA_MODELS` | english,multilingual | Checkpoints to load: english, multilingual, or both. multilingual alone uses about half the memory |
| `LAYA_API_KEY` | (secret) | Bearer token for every /v1 call - clients send it as TYPESAFE_API_KEY |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/laya)
