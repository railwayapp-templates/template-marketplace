# Deploy LibreChat [Updated Sep '26] on Railway

LibreChat [Sep '26] (Self-Hosted ChatGPT UI, Multi-Provider + RAG)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librechat-open-source)

## About

LibreChat is the open-source answer to ChatGPT: a polished, multi-provider chat interface that connects to OpenAI, Anthropic, Google, and dozens of other AI providers from one login, while keeping every conversation on infrastructure you actually control. This template deploys LibreChat's real production architecture, five services wired together, verified live end-to-end, not a simplified demo.

ChatGPT Team costs $25-30 per seat per month with a minimum seat count, so a 10-person team pays $250-300/month before any usage overages, every seat billed regardless of actual use. Self-hosting LibreChat on Railway flips that: a flat infrastructure cost regardless of team size, plus metered AI provider usage for exactly the tokens you consume, often cheaper when usage varies a lot person to person.

There's a second reason beyond price, provider flexibility. ChatGPT locks you into OpenAI's models. LibreChat lets you mix OpenAI, Anthropic, Google, and more from the same interface, switching per conversation without losing history or re-learning a new tool.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch | `getmeili/meilisearch:v1.53.1` | Database |
| rag_api | `ghcr.io/danny-avila/librechat-rag-api-dev-lite:v0.9.0` | Worker |
| librechat | `ghcr.io/danny-avila/librechat-dev:latest` | Web service |
| vectordb | `pgvector/pgvector:0.8.6-pg16` | Database |
| mongodb | `mongo:8.0.20` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MEILI_HOST` | meilisearch | http://meilisearch.railway.internal:7700 | Meilisearch's own self-reference, required by LibreChat's official compose pattern. |
| `MEILI_MASTER_KEY` | meilisearch | - | Auth key for this Meilisearch instance — referenced by librechat's own MEILI_MASTER_KEY variable, must match exactly. |
| `MEILI_NO_ANALYTICS` | meilisearch | true | Disables Meilisearch's anonymized telemetry. |
| `DB_HOST` | rag_api | vectordb.railway.internal | Private-network hostname of the vectordb service. |
| `RAG_PORT` | rag_api | 8000 | Port this service listens on — must match librechat's RAG_API_URL port. |
| `POSTGRES_DB` | rag_api | - | Must match vectordb's own database name exactly. |
| `POSTGRES_USER` | rag_api | (secret) | Must match vectordb's own username exactly. |
| `POSTGRES_PASSWORD` | rag_api | (secret) | Must match vectordb's own password exactly. |
| `RAG_OPENAI_API_KEY` | rag_api | (secret) | Required for this service to boot at all, not just for RAG features to work. Confirmed live: rag_api initializes its embeddings client at import time and crash-loops forever with openai.OpenAIError: Missing credentials if this is unset, before the server even starts listening. Any non-empty value clears the boot crash (the client library doesn't validate authenticity at construction time), but only a real key makes file-upload Q&A actually function. |
| `HOST` | librechat | 0.0.0.0 | Must bind to all interfaces, not localhost, for Railway's proxy to reach the container. |
| `PORT` | librechat | 3080 | LibreChat's own default port. Must match the service's Networking target port. |
| `SEARCH` | librechat | true | Enables message/conversation search — requires MEILI_HOST and MEILI_MASTER_KEY both set correctly, which this template wires automatically. |
| `CREDS_IV` | librechat | - | 16-byte hex initialization vector paired with CREDS_KEY. Must be exactly 16 bytes. |
| `NO_INDEX` | librechat | true | Prevents search engines from indexing your private LibreChat instance. |
| `RAG_PORT` | librechat | 8000 | Port the rag_api service listens on — must match RAG_API_URL's port. |
| `CREDS_KEY` | librechat | - | 32-byte hex key used to encrypt stored provider credentials (API keys users add in-app). Must be exactly 32 bytes — a wrong length breaks credential encryption entirely, not just weakens it. |
| `MONGO_URI` | librechat | - | Connection string to the mongodb service. No username/password — Mongo runs with --noauth on the private network, matching LibreChat's own official compose file exactly. |
| `JWT_SECRET` | librechat | (secret) | Signs user session JWTs. Minimum 32 bytes per LibreChat's own docs. |
| `MEILI_HOST` | librechat | - | Connection to the meilisearch service for conversation search indexing. |
| `RAG_API_URL` | librechat | - | Connection to the rag_api service for file/document retrieval-augmented generation. |
| `DOMAIN_CLIENT` | librechat | - | Full URL including protocol — unlike some other templates in this project, LibreChat's own config expects the scheme prefix here, not a bare hostname. |
| `DOMAIN_SERVER` | librechat | - | Same value as DOMAIN_CLIENT for this single-domain deploy. |
| `MEILI_MASTER_KEY` | librechat | - | Must exactly match the meilisearch service's own master key or search silently fails to index. |
| `ALLOW_REGISTRATION` | librechat | true | Whether new users can self-register an account. LibreChat's own default is already true; set explicitly here so deployers can find and flip it without hunting through docs. |
| `JWT_REFRESH_SECRET` | librechat | (secret) | Signs refresh tokens. Must differ from JWT_SECRET — never reuse the same value for both. |
| `POSTGRES_DB` | vectordb | librechat_vectors | Database name for stored document embeddings. |
| `POSTGRES_USER` | vectordb | (secret) | Must match the username rag_api connects with. |
| `POSTGRES_PASSWORD` | vectordb | (secret) | Referenced by rag_api's own POSTGRES_PASSWORD variable — must match exactly. |

## Configuration

- **Volume:** `/meili_data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `mongod --noauth --bind_ip_all`
- **Volume:** `/data/db`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/librechat-open-source)
