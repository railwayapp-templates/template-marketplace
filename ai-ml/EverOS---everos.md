# Deploy EverOS on Railway

EverOS agent memory server behind a bearer-token gateway, data on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/everos)

## About

EverOS is an open-source memory layer for AI agents: it turns conversations into durable, user-owned Markdown memories with a local index, and serves them back to any agent through an HTTP API. It powers the memory plugins for OpenClaw, Hermes, DeepSeek Harness and Dify. This template deploys EverOS 1.3.1 with the multimodal extra as a single Railway service with a persistent volume and a token-protected public API.

Hosting EverOS on Railway means one container running two processes: EverOS itself and a small Caddy gateway. EverOS ships no authentication and expects a trusted caller, so the gateway requires a bearer token, generated at deploy time, on the public domain; only the health endpoint stays open. On Railway's private network the same instance is reachable without a token, which is what the official plugins expect. Memories, the SQLite state and the LanceDB indexes live on one volume. You bring one LLM key (OpenRouter by default, any OpenAI-compatible endpoint works); embedding and rerank providers are optional upgrades that unlock vector and hybrid search.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| everos | [RockinPaul/everos_railway_template](https://github.com/RockinPaul/everos_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Container time zone. |
| `PORT` | 8080 | Public port served by the Caddy gateway. Must match the service's domain port. EverOS itself stays on 8000 for the private network. |
| `API_TOKEN` | (secret) | Bearer token for the public URL. Send it as Authorization: Bearer  <token>. At least 24 characters from A-Z a-z 0-9 _ - or the container refuses to start. |
| `EVEROS_LOG_LEVEL` | INFO | Log level: DEBUG, INFO, WARNING or ERROR. |
| `EVEROS_LLM__MODEL` | openai/gpt-4.1-mini | Chat model used for memory extraction, in the provider's naming. |
| `EVEROS_LOG_FORMAT` | json | Log format, json or text. |
| `EVEROS_LLM__API_KEY` | (secret) | Key for the chat model that extracts memories, an OpenRouter key by default. Required: EverOS does not start without it. |
| `EVEROS_LLM__BASE_URL` | https://openrouter.ai/api/v1 | OpenAI-compatible endpoint for the chat model. |
| `EVEROS_RERANK__MODEL` | - | Optional rerank model for search results. |
| `EVEROS_RERANK__API_KEY` | (secret) | Optional key for the rerank endpoint. |
| `EVEROS_EMBEDDING__MODEL` | - | Optional embedding model. Enables vector and hybrid search, reflection and skills. Without it use "method": "keyword". |
| `EVEROS_RERANK__BASE_URL` | - | Optional OpenAI-compatible /rerank endpoint. |
| `EVEROS_MULTIMODAL__MODEL` | google/gemini-3.8-flash | Vision model for images, PDFs and audio. Must accept OpenAI image_url parts. |
| `EVEROS_EMBEDDING__API_KEY` | (secret) | Optional key for the embedding endpoint. |
| `EVEROS_EMBEDDING__BASE_URL` | - | Optional OpenAI-compatible /embeddings endpoint. |
| `EVEROS_MULTIMODAL__API_KEY` | (secret) | Key for the vision model. Defaults to the same key as the chat model. |
| `EVEROS_MULTIMODAL__BASE_URL` | https://openrouter.ai/api/v1 | OpenAI-compatible endpoint for the vision model. |
| `EVEROS_MULTIMODAL__FILE_URI_ALLOW_DIRS` | ["/data/uploads"] | JSON list of directories that file:// content items may read. Keep it inside the volume; the API is reachable from outside. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/everos)
