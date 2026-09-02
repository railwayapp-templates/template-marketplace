# Deploy LocalAI | (Just Updated) Self-Hosted OpenAI API With The Model Baked In on Railway

OpenAI-compatible LLM API. Model and backend baked in, ready on first boot.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/localai-or-just-updated-self-hosted-open)

## About

LocalAI is the free, open-source drop-in replacement for the OpenAI API: it serves
`/v1/chat/completions`, `/v1/embeddings`, `/v1/audio/*` and `/v1/images/*` from models that
run on your own CPU, with no API key sold by anybody and no request leaving your project.
This template runs LocalAI v4 as a single service with one volume, an inference backend and
a chat model already installed in the image, and an API key enforced from the first request.

LocalAI v4 ships a deliberately small base image. The inference backends live in a separate
OCI gallery and the models live in a model gallery, so a stock container starts with neither:
the API answers `backend not found: llama-cpp`, and the deployer has to install a backend and
a model by hand before anything works. That is a reasonable design for a workstation and a
poor one for a platform deploy, where the first thing a person does with the URL is send a
request to it.

Two further things need handling on Railway. A volume is a bind mount, so it hides whatever
the image build wrote underneath its mount path — anything baked into the image has to be
kept outside the mount and copied across on the first boot. And LocalAI does not read `$PORT`:
it takes its listen address from `LOCALAI_ADDRESS`, while Railway's health check dials the
port it injected, so the address has to be derived from the injected value before the server
starts.

This image handles all three, and refuses to start without an API key — LocalAI serves both
inference and its web UI to anyone when no key is set, and the URL is public from the moment
Railway assigns the domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| localai | `ghcr.io/bon5co/localai-railway:v4.9.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LOCALAI_API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/localai-or-just-updated-self-hosted-open)
