# Deploy Sirene Inference on Railway

Speech generation worker for Sirene, self-registering on first start.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sirene-inference)

## About

Sirene Inference is the worker that runs text-to-speech generation for Sirene, an open-source TTS studio with voice cloning and voice design. This template
  deploys one worker that registers itself with your Sirene server on first start, so it shows up in your inference server list without any manual setup.

  ## About Hosting Sirene Inference

  The worker is a FastAPI service packaged as a Docker image. It listens on the port Railway provides, exposes a /health endpoint that Sirene uses to monitor it,
  and keeps downloaded models and lazily installed backends on the attached volume so they survive redeploys. At startup it calls your Sirene server with its
  public URL and its own auth token; Sirene upserts the entry by URL, so redeploys never create duplicates. Railway offers CPU only, which suits light models
  such as Kokoro or Piper; larger models need a GPU host. Your Sirene server must be reachable from the internet.

  ## Common Use Cases

  - Offload speech generation from a small Sirene server to a separate worker
  - Try Sirene's multi-server failover without a second machine
  - Run light TTS models close to your users

  ## Dependencies for Sirene Inference Hosting

  - A running Sirene server with a public URL
  - A registration token from Sirene, under Administration → Inference servers → Add server (valid one hour)

  ### Implementation Details

  Set `SIRENE_URL` and `SIRENE_REGISTRATION_TOKEN` when deploying; every other variable is generated or derived from Railway. Source and documentation:
  https://github.com/KevinBonnoron/sirene

  ## Why Deploy Sirene Inference on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while
  allowing you to vertically and horizontally scale it.

  By deploying Sirene Inference on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers,
  databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kevinbonnoron/sirene-inference | `ghcr.io/kevinbonnoron/sirene-inference` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | - |
| `SIRENE_URL` | - | Public URL of your Sirene server, for example https://sirene.example.com |
| `INFERENCE_NAME` | - | Name shown in the Sirene inference server list. |
| `INFERENCE_DEVICE` | cpu | Compute device. Railway has no GPU, keep cpu |
| `INFERENCE_AUTH_TOKEN` | (secret) | Secret Sirene uses to call this worker. Generated automatically, no need to change it. |
| `INFERENCE_PUBLIC_URL` | - | URL Sirene uses to reach this worker. Derived from the Railway public domain. |
| `SIRENE_REGISTRATION_TOKEN` | (secret) | Token shown in Sirene under Administration → Inference servers → Add server. Valid for one hour. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sirene-inference)
