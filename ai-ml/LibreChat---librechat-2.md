# Deploy LibreChat on Railway

LibreChat on a pinned release: admin set at deploy, file search, Mongo

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librechat-2)

## About

[LibreChat](https://github.com/LibreChat-AI/LibreChat) (MIT) is a self-hosted chat interface for OpenAI, Anthropic, Google, OpenRouter and other providers, with agents, file search, conversation search and accounts for several people.

This template runs a pinned LibreChat release (v0.8.7) with MongoDB, Meilisearch for searching conversations, and LibreChat's RAG API on pgvector for chatting with uploaded files.

LibreChat gives the admin role to the first account that registers, so on a public URL whoever gets there first owns the instance. This template keeps registration closed from the start and creates the admin account itself: the deploy form asks for your email, a password is generated into `ADMIN_PASSWORD`, and a start step runs LibreChat's own `create-user` script with both. When the deploy finishes, open `LIBRECHAT_URL` and sign in with that email and `ADMIN_PASSWORD`.

`OPENROUTER_KEY` is optional. If you set it on the LibreChat service, everyone on the instance can chat with OpenRouter models, and the RAG API uses the same key for the embeddings behind file search. If you leave it empty, each user adds their own OpenRouter, OpenAI, Anthropic or Google key in the interface. When you add the key after deploying, redeploy the rag-api service too: in my test Railway redeployed LibreChat but left rag-api on the old value until I redeployed it.

Before publishing I tested it end to end. Registering a new account returned "Registration is not allowed", and the admin signed in with the admin role. With an OpenRouter key set, a message to `openai/gpt-4o-mini` came back with the expected answer and LibreChat titled the conversation. A text file I uploaded was embedded by the RAG API. After a restart the admin signed in again and the conversations were still there.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| VectorDB | `pgvector/pgvector:pg17` | Database |
| rag-api | `ghcr.io/danny-avila/librechat-rag-api-dev-lite:latest` | Worker |
| MongoDB | `mongo:8.0` | Database |
| LibreChat | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /librechat) | Web service |
| Meilisearch | `getmeili/meilisearch:v1.35.1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | VectorDB | rag | Database for file embeddings |
| `POSTGRES_USER` | VectorDB | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | VectorDB | (secret) | Database password (generated) |
| `DB_HOST` | rag-api | - | pgvector database |
| `DB_PORT` | rag-api | 5432 | Database port |
| `RAG_HOST` | rag-api | :: | Listen on IPv6 for Railway's private network |
| `RAG_PORT` | rag-api | 8000 | Port of the RAG API (private network only) |
| `JWT_SECRET` | rag-api | (secret) | Shared with LibreChat to verify requests |
| `POSTGRES_DB` | rag-api | - | Database name |
| `POSTGRES_USER` | rag-api | (secret) | Database user |
| `EMBEDDINGS_MODEL` | rag-api | openai/text-embedding-3-small | Embedding model for uploaded files |
| `POSTGRES_PASSWORD` | rag-api | (secret) | Database password |
| `RAG_OPENAI_API_KEY` | rag-api | (secret) | Uses the OpenRouter key from the LibreChat service |
| `RAG_OPENAI_BASEURL` | rag-api | https://openrouter.ai/api/v1 | Embeddings through OpenRouter |
| `EMBEDDINGS_PROVIDER` | rag-api | openai | OpenAI-compatible embeddings |
| `MONGO_URL` | MongoDB | - | Private connection string used by LibreChat |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | MongoDB root password (generated) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | MongoDB root user |
| `HOST` | LibreChat | 0.0.0.0 | Listen on all interfaces |
| `PORT` | LibreChat | 3080 | Port of the web app |
| `SEARCH` | LibreChat | true | Search your conversations |
| `CREDS_IV` | LibreChat | - | Encryption IV for stored API keys (generated). Keep it |
| `NO_INDEX` | LibreChat | true | Ask search engines not to index the instance |
| `CREDS_KEY` | LibreChat | - | Encrypts stored API keys (generated). Keep it |
| `MONGO_URI` | LibreChat | - | MongoDB over the private network |
| `GOOGLE_KEY` | LibreChat | user_provided | Users paste their own Google key in the UI (or put a key here for everyone) |
| `JWT_SECRET` | LibreChat | (secret) | Signs sessions (generated) |
| `MEILI_HOST` | LibreChat | - | Conversation search |
| `ADMIN_EMAIL` | LibreChat | - | Email for the admin account, created on first start. Sign in with it and ADMIN_PASSWORD |
| `RAG_API_URL` | LibreChat | - | File search (RAG API) |
| `TRUST_PROXY` | LibreChat | 1 | Behind Railway's proxy |
| `DOMAIN_CLIENT` | LibreChat | - | Public URL |
| `DOMAIN_SERVER` | LibreChat | - | Public URL |
| `LIBRECHAT_URL` | LibreChat | - | Open this and sign in with ADMIN_EMAIL and ADMIN_PASSWORD |
| `ADMIN_PASSWORD` | LibreChat | (secret) | Password of the admin account (generated) |
| `OPENAI_API_KEY` | LibreChat | (secret) | Users paste their own OpenAI key in the UI (or put a key here for everyone) |
| `OPENROUTER_KEY` | LibreChat | - | Optional: OpenRouter key for chat and file search for everyone (openrouter.ai/keys). Empty: each user adds their own |
| `MEILI_MASTER_KEY` | LibreChat | - | Meilisearch key |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) | Email and password sign-in |
| `ANTHROPIC_API_KEY` | LibreChat | (secret) | Users paste their own Anthropic key in the UI (or put a key here for everyone) |
| `ALLOW_REGISTRATION` | LibreChat | false | Closed: the admin can open it later or create accounts |
| `ALLOW_SOCIAL_LOGIN` | LibreChat | (secret) | No social sign-in until you configure a provider |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) | Signs refresh tokens (generated) |
| `LIBRECHAT_DATA_DIR` | LibreChat | /data | Uploads, generated images and logs (on the volume) |
| `MEILI_ENV` | Meilisearch | production | Require the key |
| `MEILI_HTTP_ADDR` | Meilisearch | [::]:7700 | Listen on IPv6 for Railway's private network |
| `MEILI_MASTER_KEY` | Meilisearch | - | Meilisearch key (generated) |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | No telemetry |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'export RAG_OPENAI_API_KEY="${RAG_OPENAI_API_KEY:-not-set}"; exec python main.py'`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip_all`
- **Volume:** `/data/db`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Tags:** librechat, ai-chat, chatgpt, rag, openrouter, mongodb · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/librechat-2)
