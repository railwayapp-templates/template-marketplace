# Deploy LibreChat + Meilisearch + RAG on Railway

LibreChat with Meilisearch search and a keyless RAG API for file chat

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librechat-meilisearch-rag)

## About

LibreChat is an enhanced, open-source ChatGPT clone that unifies OpenAI, Anthropic, Google, Azure, and local models behind one familiar chat interface. It adds agents, plugins, file uploads, multimodal conversations, and full-text search, giving teams a self-hosted, privacy-first alternative to commercial AI chat products.

LibreChat is a Node.js and React application that stores users, conversations, presets, and messages in MongoDB and indexes messages in Meilisearch for fast search. Self-hosting normally means provisioning a database, standing up a search engine, generating four separate encryption and JWT secrets (the app refuses to boot without them), wiring every component over a private network, and mounting a volume so uploaded files survive restarts. This template does all of that wiring for you: it deploys LibreChat from the public GHCR image alongside MongoDB 8 and Meilisearch, generates the required hex secrets automatically, references the Meilisearch master key across services, and persists uploads on a Railway volume — a complete chat stack in a few minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LibreChat | `ghcr.io/danny-avila/librechat:v0.8.7` | Web service |
| Meilisearch | `getmeili/meilisearch:v1.35.1` | Database |
| MongoDB | `mongo:8.0.20` | Database |
| RAG-API | `ghcr.io/danny-avila/librechat-rag-api-dev:v0.8.0` | Worker |
| VectorDB | `pgvector/pgvector:pg16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | LibreChat | 0.0.0.0 | - |
| `PORT` | LibreChat | 3080 | - |
| `SEARCH` | LibreChat | true | - |
| `CREDS_IV` | LibreChat | - | 32-char hex initialization vector paired with CREDS_KEY. Required. |
| `RAG_PORT` | LibreChat | 8000 | - |
| `CREDS_KEY` | LibreChat | - | 64-char hex key used to encrypt stored API credentials. Required - app crashes if missing. |
| `GOOGLE_KEY` | LibreChat | user_provided | Set to your Google AI key to enable Gemini models, or leave as user_provided. |
| `JWT_SECRET` | LibreChat | (secret) | Signing secret for access tokens. Required. |
| `RAG_API_URL` | LibreChat | - | Internal URL of the RAG API service. Enables document upload + retrieval-augmented chat. |
| `OPENAI_API_KEY` | LibreChat | (secret) | Set to your OpenAI key to enable OpenAI models, or leave as user_provided to let users enter their own. |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) | - |
| `ANTHROPIC_API_KEY` | LibreChat | (secret) | Set to your Anthropic key to enable Claude models, or leave as user_provided. |
| `ALLOW_REGISTRATION` | LibreChat | true | - |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) | Signing secret for refresh tokens. Required. |
| `MEILI_NO_ANALYTICS` | LibreChat | true | - |
| `PORT` | Meilisearch | 7700 | - |
| `MEILI_ENV` | Meilisearch | production | - |
| `MEILI_HTTP_ADDR` | Meilisearch | [::]:7700 | - |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | - |
| `DB_PORT` | RAG-API | 5432 | - |
| `RAG_HOST` | RAG-API | :: | Bind address. '::' makes the API reachable over Railway's IPv6 private network. |
| `RAG_PORT` | RAG-API | 8000 | - |
| `POSTGRES_USER` | RAG-API | (secret) | - |
| `EMBEDDINGS_MODEL` | RAG-API | sentence-transformers/all-MiniLM-L6-v2 | Local embedding model downloaded on first boot. Only used when EMBEDDINGS_PROVIDER=huggingface. |
| `POSTGRES_PASSWORD` | RAG-API | (secret) | - |
| `RAG_OPENAI_API_KEY` | RAG-API | (secret) | Only needed if you switch EMBEDDINGS_PROVIDER to 'openai'. Leave blank to use the default keyless local embeddings. |
| `EMBEDDINGS_PROVIDER` | RAG-API | huggingface | Embeds documents with a local model (sentence-transformers) so the stack needs NO API key out of the box. Set to 'openai' (and provide RAG_OPENAI_API_KEY) for faster/higher-quality cloud embeddings. |
| `POSTGRES_DB` | VectorDB | librechat | - |
| `POSTGRES_USER` | VectorDB | (secret) | - |
| `POSTGRES_PASSWORD` | VectorDB | (secret) | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`
- **Volume:** `/meili_data`
- **Start command:** `mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Start command:** `docker-entrypoint.sh postgres -c "listen_addresses=*"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/librechat-meilisearch-rag)
