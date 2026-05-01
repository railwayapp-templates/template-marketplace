# Deploy Xinference (Xorbits Inference) | OpenAI-Compatible API on Railway

Self-host Xinference. Self host LLMs, embeddings, rerankers & more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xinference)

## About

Xinference (Xorbits Inference) is an open-source model serving platform that lets you run large language models, speech recognition, image generation, and embedding models behind an OpenAI-compatible API. Self-host Xinference on Railway when you want a single private endpoint that swaps OpenAI/Anthropic for local GGUF, Llama, Qwen, Mistral, and Whisper models — without rewriting any of your application code.

This Railway template deploys the official `xprobe/xinference:latest-cpu` image as a single service with a persistent volume for model weights, an auto-generated public domain on port 9997, and built-in JWT + API key authentication rendered from environment variables at boot. There is no external database — Xinference stores model registry, virtual environments, and HuggingFace cache directly on the attached volume.

Xinference is a model orchestration layer maintained by Xorbits. It wraps llama.cpp, transformers, sentence-transformers, and several other inference backends behind one HTTP API and one Python SDK. You launch any supported model with one click, scale replicas up and down, and call them through the same `/v1/chat/completions`, `/v1/embeddings`, `/v1/audio/transcriptions`, and `/v1/images/generations` endpoints OpenAI uses.

Key features:
- **OpenAI-compatible REST API** — drop-in replacement for `openai.OpenAI()` clients
- **Web UI for model management** — launch, stop, list, monitor without writing code
- **Model registry** — built-in catalog of dozens of LLMs, embedding, rerank, audio, and image models
- **Multi-backend** — llama.cpp (GGUF), transformers, sentence-transformers, FunASR, ChatTTS
- **Built-in auth** — JWT sessions plus per-user API keys with admin/read/start/stop permissions
- **Custom model registration** — point at any HuggingFace repo or local GGUF file

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Xinference | `xprobe/xinference:latest-cpu` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9997 | Container HTTP port |
| `HF_HOME` | /data/huggingface | HuggingFace cache directory |
| `XINFERENCE_HOME` | /data | Persistent model + state directory |
| `XINFERENCE_API_KEY` | (secret) | Bearer token (16 chars total) |
| `XINFERENCE_MODEL_SRC` | huggingface | Model registry source |
| `XINFERENCE_ADMIN_USER` | (secret) | Admin login username |
| `XINFERENCE_SECRET_KEY` | (secret) | JWT signing secret |
| `XINFERENCE_ADMIN_PASSWORD` | (secret) | Admin login password |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /data && printf "{\"auth_config\":{\"algorithm\":\"HS256\",\"secret_key\":\"%s\",\"token_expire_in_minutes\":60},\"user_config\":[{\"username\":\"%s\",\"password\":\"%s\",\"permissions\":[\"admin\"],\"api_keys\":[\"%s\"]}]}" "$XINFERENCE_SECRET_KEY" "$XINFERENCE_ADMIN_USER" "$XINFERENCE_ADMIN_PASSWORD" "$XINFERENCE_API_KEY" > /tmp/auth.json && exec xinference-local --host 0.0.0.0 --port 9997 --auth-config /tmp/auth.json'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/xinference)
