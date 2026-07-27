# Deploy Ollama with Open WebUI on Railway

Private Ollama behind Open WebUI auth; model server never publicly exposed

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-with-open-webui)

## About

Ollama runs open-weight language models — Llama, Qwen, Gemma, Mistral, Phi and hundreds more — behind a simple HTTP API. This template pairs it with Open WebUI, a ChatGPT-style interface with real user accounts, so you get a private LLM stack where the model server itself is never exposed to the internet.

Ollama has no authentication. None. Its API is open to anyone who can reach it, and that is by design — it expects to sit on localhost or a trusted network. Publishing Ollama directly on a public domain, which is the usual shape of a one-click Ollama deployment, means anyone who finds the URL can list your models, pull new ones onto your disk, and run inference that you pay for.

This template does not do that. Ollama runs as a **private** service with no public domain, reachable only over Railway's internal network. The only thing exposed is Open WebUI, which sits in front with its own account system. The first account to sign up automatically becomes the admin; every signup after that lands in a `pending` role and cannot use the instance until the admin approves it. Register your own account immediately after deploying — whoever signs up first owns the instance.

Ollama binds to `[::]` rather than `0.0.0.0`, because Railway's private network resolves service hostnames over IPv6 — an IPv4-only bind is unreachable from a sibling container and is the usual reason a private Ollama service appears healthy but nothing can talk to it.

Both services keep state on volumes: downloaded model weights at `/root/.ollama` (these are large, and re-pulling them on every redeploy is slow and wasteful) and Open WebUI's users, chats, and settings at `/app/backend/data`.

Inference here is CPU-bound. Small models in the 1B–8B range are practical; large models will run but slowly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui | `openwebui/open-webui:0.10.2` | Web service |
| ollama | `ollama/ollama:0.32.4` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `WEBUI_SECRET_KEY` | (secret) |
| `ENABLE_LOGIN_FORM` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ollama-with-open-webui)
