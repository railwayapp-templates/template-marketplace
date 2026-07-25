# Deploy LibreChat — Multi-Provider AI Chat with RAG on Railway

Self-hosted ChatGPT UI — GPT, Claude, Gemini, RAG, multi-user

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librechat-multi-provider-rag)

## About

LibreChat is the leading open-source, multi-provider AI chat platform — a self-hosted ChatGPT-style interface that connects OpenAI, Anthropic, Google, and dozens of other providers in one place. Switch between GPT, Claude, and Gemini mid-conversation, run RAG over your own documents, search your full chat history, and give a whole team access without sharing raw API keys. This template deploys the full stack: LibreChat, MongoDB, Meilisearch, PGVector, and the RAG API.

---

LibreChat is a five-service application, and two configuration details cause most failed deployments — both worth getting right before anything else.

**`CREDS_KEY` and `CREDS_IV` are exact lengths, not just "random strings."** LibreChat encrypts every stored provider API key with them, and the encryption is length-specific: `CREDS_KEY` must be **32 bytes** (`openssl rand -hex 32`) and `CREDS_IV` must be **16 bytes** (`openssl rand -hex 16`). Get the IV length wrong and LibreChat cannot decrypt saved keys — every provider connection breaks with an opaque error. This template generates both at the correct lengths.

**`MEILI_MASTER_KEY` must match across two services.** The LibreChat service and the Meilisearch service must share the exact same master key, and Meilisearch refuses to start if it is under 16 bytes. A mismatch means search silently fails while everything else works. This template wires the same key to both.

The RAG API and PGVector add real memory overhead. Budget **2 GB RAM minimum** for the full stack; a lighter deployment can drop RAG if document Q&A isn't needed.

Typical cost: **~$10–20/month** on Railway for all five services, plus your model providers' usage. Connect cloud LLMs and no GPU is needed.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pg_vector | `pgvector/pgvector:pg18` | Database |
| MongoDB | `mongo:8.0` | Database |
| RAG | `danny-avila/librechat-rag-api-dev-lite` | Worker |
| LibreChat | `danny-avila/librechat-dev:latest` | Worker |
| Meilisearch | `getmeili/meilisearch:v1.11.3` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | pg_vector | railway | - |
| `POSTGRES_USER` | pg_vector | (secret) | - |
| `PGPORT_PRIVATE` | pg_vector | 5432 | - |
| `POSTGRES_PASSWORD` | pg_vector | (secret) | - |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `PORT` | RAG | 8000 | - |
| `DB_PORT` | RAG | 5432 | - |
| `JWT_SECRET` | RAG | (secret) | - |
| `DEBUG_RAG_API` | RAG | false | - |
| `POSTGRES_USER` | RAG | (secret) | - |
| `OPENAI_API_KEY` | RAG | (secret) | API key for embeddings provider |
| `POSTGRES_PASSWORD` | RAG | (secret) | - |
| `EMBEDDINGS_PROVIDER` | RAG | openai | - |
| `HOST` | LibreChat | 0.0.0.0 | - |
| `SEARCH` | LibreChat | true | - |
| `NO_INDEX` | LibreChat | true | - |
| `APP_TITLE` | LibreChat | LibreChat | - |
| `ENDPOINTS` | LibreChat | openAI,agents,assistants,azureOpenAI,google,anthropic,custom | - |
| `LOGIN_MAX` | LibreChat | (secret) | - |
| `GOOGLE_KEY` | LibreChat | user_provided | - |
| `JWT_SECRET` | LibreChat | (secret) | - |
| `CONFIG_PATH` | LibreChat | https://raw.githubusercontent.com/LibreChat-AI/librechat-config-yaml/main/librechat-up-l.yaml | - |
| `TITLE_CONVO` | LibreChat | true | - |
| `BAN_DURATION` | LibreChat | 1000 * 60 * 60 * 2 | - |
| `BAN_INTERVAL` | LibreChat | 20 | - |
| `DEBUG_OPENAI` | LibreChat | false | - |
| `GROQ_API_KEY` | LibreChat | (secret) | - |
| `LOGIN_WINDOW` | LibreChat | (secret) | - |
| `REGISTER_MAX` | LibreChat | 5 | - |
| `CHECK_BALANCE` | LibreChat | false | - |
| `DEBUG_CONSOLE` | LibreChat | false | - |
| `DEBUG_LOGGING` | LibreChat | true | - |
| `DEBUG_PLUGINS` | LibreChat | true | - |
| `GOOGLE_MODELS` | LibreChat | gemini-2.5-pro,gemini-2.5-pro-preview-06-05,gemini-2.5-pro-preview-05-06,gemini-2.5-pro-preview-03-25,gemini-2.5-flash,gemini-2.5-flash-preview-05-20,gemini-2.5-flash-lite-preview-06-17,gemini-2.0-flash,gemini-2.0-flash-exp,gemini-2.0-flash-lite-preview-02-05,gemini-2.0-flash-thinking-exp,gemini-2.0-flash-thinking-exp-1219,gemini-2.0-pro-exp-02-05,gemini-exp-1206,gemini-1.5-flash-001,gemini-1.5-flash-002,gemini-1.5-flash-latest,gemini-1.5-pro-001,gemini-1.5-pro-002,gemini-1.5-pro-latest | - |
| `OPENAI_MODELS` | LibreChat | gpt-3.5-turbo,gpt-4,gpt-4o,gpt-4.1,gpt-5,chatgpt-4o-latest | - |
| `BAN_VIOLATIONS` | LibreChat | true | - |
| `MESSAGE_IP_MAX` | LibreChat | 40 | - |
| `OPENAI_API_KEY` | LibreChat | (secret) | - |
| `OPENROUTER_KEY` | LibreChat | user_provided | - |
| `SESSION_EXPIRY` | LibreChat | 1000 * 60 * 15 | - |
| `MISTRAL_API_KEY` | LibreChat | (secret) | - |
| `REGISTER_WINDOW` | LibreChat | 60 | - |
| `ANYSCALE_API_KEY` | LibreChat | (secret) | - |
| `LIMIT_MESSAGE_IP` | LibreChat | true | - |
| `MESSAGE_USER_MAX` | LibreChat | 40 | - |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) | - |
| `ANTHROPIC_API_KEY` | LibreChat | (secret) | - |
| `FIREWORKS_API_KEY` | LibreChat | (secret) | - |
| `MESSAGE_IP_WINDOW` | LibreChat | 1 | - |
| `OPENAI_MODERATION` | LibreChat | false | - |
| `ALLOW_REGISTRATION` | LibreChat | true | - |
| `ALLOW_SOCIAL_LOGIN` | LibreChat | (secret) | - |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) | - |
| `LIMIT_MESSAGE_USER` | LibreChat | (secret) | - |
| `PERPLEXITY_API_KEY` | LibreChat | (secret) | - |
| `TOGETHERAI_API_KEY` | LibreChat | (secret) | - |
| `GITHUB_CALLBACK_URL` | LibreChat | /oauth/github/callback | - |
| `GOOGLE_CALLBACK_URL` | LibreChat | /oauth/google/callback | - |
| `MESSAGE_USER_WINDOW` | LibreChat | 1 | - |
| `DISCORD_CALLBACK_URL` | LibreChat | /oauth/discord/callback | - |
| `REFRESH_TOKEN_EXPIRY` | LibreChat | (secret) | - |
| `FACEBOOK_CALLBACK_URL` | LibreChat | /oauth/facebook/callback | - |
| `LOGIN_VIOLATION_SCORE` | LibreChat | (secret) | - |
| `CONCURRENT_MESSAGE_MAX` | LibreChat | 2 | - |
| `MESSAGE_VIOLATION_SCORE` | LibreChat | 1 | - |
| `ALLOW_SOCIAL_REGISTRATION` | LibreChat | false | - |
| `LIMIT_CONCURRENT_MESSAGES` | LibreChat | true | - |
| `CONCURRENT_VIOLATION_SCORE` | LibreChat | 1 | - |
| `NON_BROWSER_VIOLATION_SCORE` | LibreChat | 20 | - |
| `REGISTRATION_VIOLATION_SCORE` | LibreChat | 1 | - |
| `MEILI_ENV` | Meilisearch | production | - |
| `MEILI_DB_PATH` | Meilisearch | /meili_data/data.ms | - |
| `MEILI_HTTP_ADDR` | Meilisearch | :::7700 | - |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | - |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Volume:** `/meili_data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/librechat-multi-provider-rag)
