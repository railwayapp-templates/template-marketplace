# Deploy FreeLLMAPI on Railway

One OpenAI endpoint. Sixteen free LLM providers. ~1.7B tokens per month.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/freellmapi)

## About

One OpenAI-compatible endpoint. Sixteen free LLM providers. ~1.7B tokens per month.

! (unofficial template a.k.a "port" of official repo https://github.com/tashfeenahmed/freellmapi) !

![Fallback chain with per-provider token budget](https://github.com/tashfeenahmed/freellmapi/raw/main/repo-assets/fallback-chain.png)

Aggregate the free tiers from Google, Groq, Cerebras, NVIDIA, Mistral, OpenRouter, GitHub Models, Cohere, Cloudflare, HuggingFace, Z.ai (Zhipu), Ollama, Kilo, Pollinations, LLM7, OVH AI Endpoints, and OpenCode Zen — plus custom OpenAI-compatible chat, embedding, image, and audio endpoints — behind a single `/v1` API. Keys are stored encrypted. A router picks the best available model for each request, falls over to the next provider when one is rate-limited, and tracks per-key usage so you stay under every free-tier cap.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| freellmapi | `ghcr.io/tashfeenahmed/freellmapi:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | :: | To make it work locally |
| `ENCRYPTION_KEY` | 1564fae9e19ca39707bff8a3f69f67d50751bf3b1e1c625387b90a9ee3d2ee97 | Recommended to regenerate it just in case |
| `FREEAPI_DB_PATH` | /tmp/freellmapi.db | Path to the sqlite db. Dont change, as well as volume mounted path. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/tmp`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/freellmapi)
