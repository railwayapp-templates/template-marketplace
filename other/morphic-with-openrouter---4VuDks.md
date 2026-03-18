# Deploy morphic [with openrouter] on Railway

AI-powered search, perplexity-clone, works with openrouter API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/4VuDks)

## About

### morphic [w/ openrouter]

A powerful AI search assistant that combines real-time web search with multiple AI models, similar to Perplexity.ai. Get accurate, up-to-date answers powered by leading language models through a single unified interface.

### ✨ Features

- 🔍 **AI-Powered Search**: Utilizes Tavily's advanced search API for real-time, accurate web results
- 🤖 **Multiple AI Models**: Access leading AI models through OpenRouter:
  - OpenAI GPT models
  - Anthropic Claude
  - Google Gemini
- 💡 **Smart Context**: Combines search results with AI responses for comprehensive answers
- 🚀 **One-Click Deploy**: Easy setup on Railway.app

### 🔧 Requirements

- OpenRouter API key (for accessing multiple AI models) https://openrouter.ai
- Tavily API key (for web search capabilities) https://tavily.com

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Morphic | [Chinpeerapat/morphic](https://github.com/Chinpeerapat/morphic) (branch: openrouter) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TAVILY_API_KEY` | Morphic | (secret) | - |
| `USE_LOCAL_REDIS` | Morphic | true | - |
| `OPENROUTER_API_KEY` | Morphic | (secret) | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/4VuDks)
