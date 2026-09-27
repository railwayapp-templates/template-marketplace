# Deploy Open WebUI on Railway

Open WebUI on Postgres with pgvector, admin account set at deploy time

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-8)

## About

[Open WebUI](https://github.com/open-webui/open-webui) is a self-hosted AI chat interface: models from OpenAI-compatible APIs or Ollama, document chat (RAG), tools, web search and accounts for a team.

This template runs the official image (v0.11.4) with Postgres and pgvector, which holds both the app's database and the embeddings of your documents.

Open WebUI makes the first account that signs up the admin, which is a race on a public URL. It can also create the admin itself at startup from `WEBUI_ADMIN_EMAIL` and `WEBUI_ADMIN_PASSWORD` and then turn sign-up off, so this template uses that: the deploy form asks for your email and the password is generated. Open `OPEN_WEBUI_URL` and sign in with them. Add people from the admin panel, or open sign-up there.

`OPENROUTER_API_KEY` is optional. With it, every OpenRouter model shows up in the model list and uploaded documents are embedded through OpenRouter (`openai/text-embedding-3-small`). Without it, add a connection in Admin Settings; chat and document search need a key either way.

I first ran document embeddings on Open WebUI's built-in local model. That worked, but idle RAM went from 0.73 GB to 0.92 GB, too close to the 1 GB per service that Railway's trial allows, so the template sends embeddings to OpenRouter.

Before publishing I tested it end to end on a fresh deploy. Signing up returned 403 and the admin signed in with the admin role. With an OpenRouter key, 459 models were listed and a chat completion with `openai/gpt-4o-mini` answered. A text file I uploaded finished processing. After a restart the admin signed in again and the saved chat was still there.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| Open WebUI | `ghcr.io/open-webui/open-webui:v0.11.4` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | openwebui | Database name |
| `DATABASE_URL` | Postgres | - | Private connection string used by Open WebUI |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password (generated) |
| `PORT` | Open WebUI | 8080 | Port of the web app |
| `VECTOR_DB` | Open WebUI | pgvector | Store document embeddings in the same Postgres |
| `WEBUI_URL` | Open WebUI | - | Public URL |
| `DATABASE_URL` | Open WebUI | - | Postgres over the private network |
| `ENABLE_SIGNUP` | Open WebUI | false | Closed; the admin adds users or opens sign-up in Admin Settings |
| `OPENAI_API_KEY` | Open WebUI | (secret) | Key for that connection |
| `OPEN_WEBUI_URL` | Open WebUI | - | Open this and sign in with WEBUI_ADMIN_EMAIL and WEBUI_ADMIN_PASSWORD |
| `PGVECTOR_DB_URL` | Open WebUI | - | pgvector database |
| `WEBUI_ADMIN_NAME` | Open WebUI | Admin | Display name of the admin |
| `WEBUI_SECRET_KEY` | Open WebUI | (secret) | Signs sessions (generated) |
| `ENABLE_OLLAMA_API` | Open WebUI | false | No Ollama in this template |
| `WEBUI_ADMIN_EMAIL` | Open WebUI | - | Email of the admin account, created on first start. Sign in with it and WEBUI_ADMIN_PASSWORD |
| `OPENROUTER_API_KEY` | Open WebUI | (secret) | Optional: OpenRouter key, so every OpenRouter model is available (openrouter.ai/keys). You can also add connections later in Admin Settings |
| `RAG_OPENAI_API_KEY` | Open WebUI | (secret) | Same OpenRouter key |
| `OPENAI_API_BASE_URL` | Open WebUI | https://openrouter.ai/api/v1 | OpenAI-compatible connection, pointed at OpenRouter |
| `RAG_EMBEDDING_MODEL` | Open WebUI | openai/text-embedding-3-small | Embedding model for uploaded documents |
| `RAG_EMBEDDING_ENGINE` | Open WebUI | openai | Embeddings through an API, not a local model: the local one pushed idle RAM from 0.73 to 0.92 GB |
| `WEBUI_ADMIN_PASSWORD` | Open WebUI | (secret) | Password of the admin account (generated) |
| `RAG_OPENAI_API_BASE_URL` | Open WebUI | https://openrouter.ai/api/v1 | Embeddings through OpenRouter |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML · **Tags:** open-webui, ai-chat, chatgpt, rag, openrouter, postgres

[View on Railway →](https://railway.com/deploy/open-webui-8)
