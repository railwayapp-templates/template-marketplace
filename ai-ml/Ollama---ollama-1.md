# Deploy Ollama on Railway

Ollama with an API key in front, models on a volume, pinned release

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-1)

## About

[Ollama](https://github.com/ollama/ollama) runs open language models (Qwen, Llama, Gemma, DeepSeek, Mistral and hundreds more from its library) behind a simple HTTP API, plus an OpenAI-compatible endpoint at `/v1`, so most AI tools can use it by changing a base URL.

This template runs the official image (pinned to 0.34.4) with an API key in front of it and your models on a volume.

Ollama has no authentication. A public Ollama lets anyone who finds the address run your models, pull new ones onto your volume or delete them, all on your bill. Here Ollama listens only inside the container, and Caddy in front of it lets a request through only if it carries `Authorization: Bearer `. The key is generated at deploy. Only `/` is open, because Railway's healthcheck uses it; it just says "Ollama is running".

Models in `OLLAMA_PULL_MODELS` are pulled on start (only what's missing, so later starts are quick) and kept on the volume. The default is `qwen2.5:0.5b`, which fits a 1 GB plan. Models load on the first request and unload after `OLLAMA_KEEP_ALIVE` (5 minutes) without requests, so an idle service doesn't keep gigabytes of RAM busy.

My first deploy failed its healthcheck with a 403 from Ollama: it rejects requests whose Host header isn't local, which protects against DNS rebinding. Caddy now sends the local address upstream.

Before publishing I tested it on Railway. `/` answered without a key, `/api/tags` without a key or with a wrong key got 401, and with the key the model was listed and both `/api/generate` and `/v1/chat/completions` answered. After a restart the model was still on the volume and answered again.

Numbers from that test: the first answer took 19.7 seconds (loading the model), later ones 5 to 10 seconds on Railway's CPUs. With the 0.5B model loaded the service used about 1.0 GB, most of it the model file Ollama maps into memory; after the idle unload it dropped to 0.08 GB. Railway has no GPUs, so this is for small models, embeddings and light use. A 7B model needs about 5 to 8 GB of RAM, depending on quantization and context size.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ollama | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /ollama) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway routes to (Caddy) |
| `OLLAMA_URL` | - | API base URL. OpenAI-compatible clients use OLLAMA_URL/v1 |
| `OLLAMA_API_KEY` | (secret) | Send it as Authorization: Bearer <key> (generated) |
| `OLLAMA_KEEP_ALIVE` | 5m | Unload a model after this much idle time, so RAM (and cost) drops when nobody uses it |
| `OLLAMA_PULL_MODELS` | qwen2.5:0.5b | Models pulled at start, comma-separated (ollama.com/library). Bigger models need more RAM than a 1 GB plan |
| `OLLAMA_NUM_PARALLEL` | 1 | Requests served at once per model; each one needs its own context memory |
| `OLLAMA_CONTEXT_LENGTH` | 4096 | Default context window in tokens; larger windows need more RAM |
| `OLLAMA_MAX_LOADED_MODELS` | 1 | Models kept in memory at once |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.ollama`

**Category:** AI/ML · **Tags:** ollama, llm, local-llm, openai-compatible, qwen, llama · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ollama-1)
