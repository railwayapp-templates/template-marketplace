# Deploy Ollama + Open WebUI | Fast CPU Inference, Model Preloaded on Railway

Ollama tuned for Railway CPU: ~78x faster, model pulled on first boot.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-open-webui-or-fast-cpu-inference-)

## About

Ollama runs open-weight language models — Llama, Qwen, Gemma, Mistral, Phi and hundreds more — behind a simple HTTP API. This template pairs it with Open WebUI, a ChatGPT-style interface with real user accounts, **tunes Ollama for the CPU it is actually running on**, and **downloads a model for you on the first boot** — so the deploy finishes with something you can talk to at a usable speed, instead of an empty model list and one token a second.

Ollama has no authentication. None. Its API is open to anyone who can reach it, and that is by design — it expects to sit on localhost or a trusted network. Publishing Ollama directly on a public domain, which is the shape of several one-click Ollama templates, means anyone who finds the URL can list your models, pull new ones onto your disk, and run inference that you pay for.

This template does not do that. Ollama runs as a **private** service with no public domain, reachable only over Railway's internal network. The only thing exposed is Open WebUI, which sits in front with its own account system. The first account to sign up automatically becomes the admin; every signup after that lands in a `pending` role and cannot use the instance until the admin approves it. Register your own account immediately after deploying — whoever signs up first owns the instance.

Ollama's own default is to listen on loopback only, so a private Ollama service reports healthy while the container next to it gets connection refused. This template sets `OLLAMA_HOST=::`, which binds every interface, v4 and v6.

### The CPU tuning, and why it matters more than anything else here

A container reports the **host's** core count, not the CPU quota it actually has. Ollama's inference runner auto-detects threads from that number, spawns far more than the container can run, and spends most of its time fighting itself. Measured on Railway with `llama3.2:1b`, same instance, same model, same prompt:

| Threads | Generation |
| --- | --- |
| auto-detected (the default) | **1.11 tokens/sec** |
| capped at the container's vCPU | **87 tokens/sec** |

That is roughly **78x**, and it applies to every request and every model — not just the preloaded one. This template's Ollama image reads the container's own cgroup CPU quota at startup and sets the thread count from it, so you get the second row without configuring anything. Override `LLAMA_ARG_THREADS` on the Ollama service if you want a different number.

The first boot pulls `llama3.2:1b` (about 1.3 GB) *behind* an already-listening server, so nothing waits on the download — the model simply appears in Open WebUI's model list when it finishes. Change `OLLAMA_PRELOAD_MODEL` on the Ollama service to preload something else from the [Ollama library](https://ollama.com/library), or set it to an empty string to start with no model at all.

Both services keep state on volumes: downloaded weights at `/root/.ollama` (these are large, and re-pulling them on every redeploy is slow and wasteful) and Open WebUI's users, chats, and settings at `/app/backend/data`.

Inference here is CPU-bound — Railway has no GPU. Models in the 1B–8B range are the practical band; the 1B default is chosen so the first chat responds at a usable speed on a small instance. Larger models will run, more slowly, and need RAM to match: roughly 6 GB for an 8B model at 4-bit quantization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ollama | `ghcr.io/bon5co/ollama-railway:latest` | Database |
| open-webui | `ghcr.io/bon5co/ollama-railway-webui:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `WEBUI_SECRET_KEY` | (secret) |

## Configuration

- **Volume:** `/root/.ollama`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ollama-open-webui-or-fast-cpu-inference-)
