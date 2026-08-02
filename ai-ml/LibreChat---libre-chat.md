# Deploy LibreChat on Railway

Private multi-provider AI chat: agents, code interpreter, document RAG

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libre-chat)

## About

LibreChat is a self-hosted, open-source AI chat platform that puts every model provider behind one ChatGPT-style interface. It is bring-your-own-key by design: add an OpenAI, Anthropic, Google or OpenRouter credential and your team gets one governed URL with AI agents, MCP tools, a code interpreter, RAG file uploads and multi-user auth — every prompt and message in a database you own.

Self-host LibreChat on Railway as five services behind one public domain. `librechat` (port `3080`) serves it and mounts a volume for uploaded images. Managed **MongoDB** stores users, conversations, prompts and agents; **Meilisearch** indexes them for search; the **RAG API** embeds uploaded files into managed **Postgres** with pgvector.

![LibreChat Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1785648839/969_1x_shots_so_aowkgd.png)

Self-host LibreChat when chat history cannot sit in a vendor's account, or when a team needs several providers side by side without an enterprise contract.

- **Every provider in one UI** — OpenAI, Anthropic, Azure, Google, Bedrock, Groq, Mistral, DeepSeek, OpenRouter and Ollama, switchable mid-conversation.
- **Agents, tools and artifacts** — file handling, OpenAPI actions, MCP servers, a code interpreter, React/HTML/Mermaid artifacts and image generation.
- **Multi-user by default** — email login, OAuth2, LDAP and SAML, two-factor auth, an admin panel and encrypted per-user credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LibreChat | `ghcr.io/danny-avila/librechat:v0.8.7` | Web service |
| meilisearch | `getmeili/meilisearch:v1.35.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| MongoDB | `mongo:8.0` | Database |
| rag-api | `ghcr.io/danny-avila/librechat-rag-api-dev:v0.8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | LibreChat | 0.0.0.0 | Bind address inside the container |
| `PORT` | LibreChat | 3080 | HTTP port, matches public target port |
| `SEARCH` | LibreChat | true | Enable conversation and message search |
| `CREDS_IV` | LibreChat | - | Init vector for credential encryption |
| `NODE_ENV` | LibreChat | production | Production runtime mode |
| `NO_INDEX` | LibreChat | true | Block search engine indexing |
| `RAG_PORT` | LibreChat | 8000 | RAG service port for internal calls |
| `CREDS_KEY` | LibreChat | - | Encrypts stored provider credentials |
| `MONGO_URI` | LibreChat | - | Primary datastore, admin auth source |
| `JWT_SECRET` | LibreChat | (secret) | Signs access tokens, keep stable |
| `MEILI_HOST` | LibreChat | - | Private Meilisearch endpoint |
| `RAG_API_URL` | LibreChat | - | Private document embedding endpoint |
| `TRUST_PROXY` | LibreChat | 1 | Trust one reverse proxy hop |
| `DOMAIN_CLIENT` | LibreChat | - | Public front-end URL |
| `DOMAIN_SERVER` | LibreChat | - | Public API URL |
| `MEILI_MASTER_KEY` | LibreChat | - | Shared Meilisearch authentication key |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) | Permit email and password sign-in |
| `ALLOW_REGISTRATION` | LibreChat | true | Open until the first admin exists |
| `ALLOW_SOCIAL_LOGIN` | LibreChat | (secret) | No OAuth providers configured |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) | Signs refresh tokens, keep stable |
| `MEILI_NO_ANALYTICS` | LibreChat | true | Disable Meilisearch telemetry |
| `MIN_PASSWORD_LENGTH` | LibreChat | (secret) | Minimum account password length |
| `ALLOW_PASSWORD_RESET` | LibreChat | (secret) | No mail transport configured |
| `PORT` | meilisearch | 7700 | Port the health check probes |
| `MEILI_ENV` | meilisearch | production | Disable the bundled dev dashboard |
| `MEILI_MASTER_KEY` | meilisearch | - | Master key for search API access |
| `MEILI_NO_ANALYTICS` | meilisearch | true | Disable Meilisearch telemetry |
| `MEILI_MAX_INDEXING_THREADS` | meilisearch | 2 | Caps thread pool, required on Railway |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `MONGOHOST` | MongoDB | - | Private hostname, reachable only inside the project |
| `MONGOPORT` | MongoDB | 27017 | Standard MongoDB port |
| `MONGOUSER` | MongoDB | - | Convenience alias of the root username |
| `MONGO_URL` | MongoDB | - | Private connection string, no database path — append /<db>?authSource=admin |
| `MONGOPASSWORD` | MongoDB | (secret) | Convenience alias of the root password |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public connection string over the TCP proxy, for external tools |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Generated root password |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user created on first boot, lives in the admin database |
| `PORT` | rag-api | 8000 | Port Railway health-checks |
| `DB_HOST` | rag-api | - | Private Postgres hostname |
| `DB_PORT` | rag-api | 5432 | Postgres port |
| `HF_HOME` | rag-api | /app/hf-cache | Model cache path on volume |
| `RAG_HOST` | rag-api | 0.0.0.0 | Bind address inside the container |
| `RAG_PORT` | rag-api | 8000 | FastAPI listening port |
| `JWT_SECRET` | rag-api | (secret) | Must match LibreChat token secret |
| `POSTGRES_DB` | rag-api | - | Vector store database name |
| `POSTGRES_USER` | rag-api | (secret) | Postgres user |
| `VECTOR_DB_TYPE` | rag-api | pgvector | Use Postgres pgvector backend |
| `COLLECTION_NAME` | rag-api | librechat | Vector collection name |
| `EMBEDDINGS_MODEL` | rag-api | sentence-transformers/all-MiniLM-L6-v2 | Local sentence transformer model |
| `POSTGRES_PASSWORD` | rag-api | (secret) | Postgres password |
| `EMBEDDINGS_PROVIDER` | rag-api | huggingface | Local embeddings, no API key |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/client/public/images`
- **Volume:** `/meili_data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Volume:** `/app/hf-cache`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/libre-chat)
