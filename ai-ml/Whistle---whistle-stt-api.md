# Deploy Whistle on Railway

Tiny on-device speech-to-text API. OpenAI-compatible

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whistle-stt-api)

## About

Deploying this template provisions exactly one Railway service: a Docker container built from
the [public repo](https://github.com/lNamelessl/whistle-stt-api) (`python:3.12-slim` + ffmpeg +
`cactus-needle==3.1.0`, with the Whistle weights and engine binary baked in at build time).
Railway assigns a public domain automatically and health-checks `/health` (restart on failure,
up to 10 retries). There are no databases, no required variables, and no credentials: the only
pre-set variable is `PORT=8000`, and every other setting ships as a sane image default listed
in the table above. Idling memory is ~80 MB; expect roughly 120 MB under load, comfortably
within free-tier limits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| whistle | [lNamelessl/whistle-stt-api](https://github.com/lNamelessl/whistle-stt-api) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/whistle-stt-api)
