# Deploy AnythingLLM on Railway

Private AI workspace for chat, documents, agents, and RAG.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anythingllm)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anythingllm)

**Published on the Railway marketplace:** https://railway.com/deploy/anythingllm

AnythingLLM is a private, self-hosted AI workspace for chatting with language models, building document knowledge bases, running agents, and using retrieval-augmented generation. It combines a browser UI, document collector, local LanceDB vector storage, native embeddings, multi-user controls, and integrations for commercial or self-hosted model providers.

This template runs the official `mintplexlabs/anythingllm:1.15.0` image as one stateful service on port 3001. A Railway volume stores the SQLite database, documents, LanceDB indexes, generated files, model and vector caches, collector hot directory, and collector outputs. Native embeddings and LanceDB work without an external credential; choose an LLM provider after login. Railway generates the initial access password, JWT signing secret, and AnythingLLM encryption key and salt. The deployment also enforces a 12-character multi-user password policy, disables telemetry and Swagger, and denies embed widgets until an allowlist is configured.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AnythingLLM | `mintplexlabs/anythingllm:1.15.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GID` | 1000 |
| `UID` | 1000 |
| `PORT` | 3001 |
| `VECTOR_DB` | lancedb |
| `AUTH_TOKEN` | (secret) |
| `JWT_EXPIRY` | 30d |
| `JWT_SECRET` | (secret) |
| `SERVER_PORT` | 3001 |
| `STORAGE_DIR` | /app/server/storage |
| `CHROMA_API_KEY` | (secret) |
| `COHERE_API_KEY` | (secret) |
| `GEMINI_API_KEY` | (secret) |
| `PASSWORDSYMBOL` | (secret) |
| `QDRANT_API_KEY` | (secret) |
| `PASSWORDMAXCHAR` | (secret) |
| `PASSWORDMINCHAR` | (secret) |
| `PASSWORDNUMERIC` | (secret) |
| `EMBEDDING_ENGINE` | native |
| `LITE_LLM_API_KEY` | (secret) |
| `PINECONE_API_KEY` | (secret) |
| `VOYAGEAI_API_KEY` | (secret) |
| `WEAVIATE_API_KEY` | (secret) |
| `ZILLIZ_API_TOKEN` | (secret) |
| `ANTHROPIC_API_KEY` | (secret) |
| `DISABLE_TELEMETRY` | true |
| `PASSWORDLOWERCASE` | (secret) |
| `PASSWORDUPPERCASE` | (secret) |
| `OPENROUTER_API_KEY` | (secret) |
| `CHROMACLOUD_API_KEY` | (secret) |
| `DISABLE_SWAGGER_DOCS` | true |
| `EMBEDDING_MODEL_PREF` | Xenova/all-MiniLM-L6-v2 |
| `PASSWORDREQUIREMENTS` | (secret) |
| `EMBED_REQUIRE_ALLOWLIST` | true |
| `GENERIC_OPEN_AI_API_KEY` | (secret) |
| `GEMINI_EMBEDDING_API_KEY` | (secret) |
| `ANYTHINGLLM_CHROMIUM_ARGS` | --no-sandbox,--disable-setuid-sandbox |
| `ASTRA_DB_APPLICATION_TOKEN` | (secret) |
| `GENERIC_OPEN_AI_EMBEDDING_API_KEY` | (secret) |

## Configuration

- **Start command:** `/bin/bash -lc 'set -eu; mkdir -p /app/server/storage/collector-hotdir /app/server/storage/collector-outputs; chown 1000:1000 /app/server/storage /app/server/storage/collector-hotdir /app/server/storage/collector-outputs; rm -rf /app/collector/hotdir /app/collector/outputs; ln -s /app/server/storage/collector-hotdir /app/collector/hotdir; ln -s /app/server/storage/collector-outputs /app/collector/outputs; exec runuser -u anythingllm -- /bin/bash /usr/local/bin/docker-entrypoint.sh'`
- **Healthcheck:** `/api/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/server/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/anythingllm)
