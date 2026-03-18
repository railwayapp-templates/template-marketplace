# Deploy LibreChat | Self-Hosted AI Chat with Multi-Provider Support on Railway

1-Click LibreChat deploy (OpenAI, Anthropic, Google, Ollama, RAG API)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/librechat)

## About

Deploy a fully self-hosted AI chat platform on Railway in one click. This template provisions LibreChat alongside MongoDB, Meilisearch, PGVector, and a RAG API — everything pre-wired with private networking, secrets auto-generated, and a public URL ready on deploy.

![LibreChat template](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773069490/architecture-librechat_thfrln.png)

LibreChat ([github.com/danny-avila/LibreChat](https://github.com/danny-avila/LibreChat)) is an open-source, self-hosted alternative to ChatGPT that unifies multiple AI providers — OpenAI, Anthropic, Google, Groq, Mistral, and more — in a single interface. You own the data, control the models, and pay only for the API calls you make.

**Key features:**
- Multi-provider AI: switch between GPT, Claude, Gemini, and custom endpoints in one UI
- RAG pipeline: chat with uploaded files using retrieval-augmented generation
- Agents & MCP support: build tool-using AI assistants without code
- Code interpreter: execute Python, JS, Go, and more in a sandboxed environment
- Full-text search across conversations via Meilisearch
- Multi-user auth with email login, OAuth2, rate limiting, and moderation

**Template architecture:**

| Service | Image |
|---|---|
| LibreChat | `ghcr.io/danny-avila/librechat-dev:latest` |
| RAG API | `ghcr.io/danny-avila/librechat-rag-api-dev-lite` |
| PGVector | `pgvector/pgvector:pg18` |
| MongoDB | `mongo` |
| Meilisearch | `getmeili/meilisearch:v1.11.3` |

All services communicate over Railway's private network — no public exposure of internal ports.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pg_vector | `pgvector/pgvector:pg18` | Web service |
| MongoDB | `mongo` | Database |
| RAG | `ghcr.io/danny-avila/librechat-rag-api-dev-lite` | Web service |
| Meilisearch | `getmeili/meilisearch:v1.11.3` | Database |
| LibreChat | `ghcr.io/danny-avila/librechat-dev:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | pg_vector | railway | Database created on initialization |
| `DATABASE_URL` | pg_vector | - | Public Postgres connection URI |
| `POSTGRES_USER` | pg_vector | (secret) | Default Postgres admin username |
| `PGHOST_PRIVATE` | pg_vector | - | Internal Postgres hostname |
| `PGPORT_PRIVATE` | pg_vector | 5432 | Internal Postgres server port |
| `POSTGRES_PASSWORD` | pg_vector | (secret) | Postgres user authentication password |
| `DATABASE_URL_PRIVATE` | pg_vector | - | Internal Postgres connection URI |
| `MONGOHOST` | MongoDB | - | Internal MongoDB hostname |
| `MONGOPORT` | MongoDB | 27017 | Default MongoDB server port |
| `MONGOUSER` | MongoDB | - | MongoDB authentication username |
| `MONGO_URL` | MongoDB | - | External MongoDB connection URI |
| `MONGOPASSWORD` | MongoDB | (secret) | MongoDB authentication password |
| `MONGO_PRIVATE_URL` | MongoDB | - | Internal MongoDB connection URI |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root password for MongoDB |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root admin username |
| `PORT` | RAG | 8000 | RAG API server listening port |
| `DB_HOST` | RAG | - | Postgres host for vector database |
| `DB_PORT` | RAG | 5432 | Postgres server listening port |
| `JWT_SECRET` | RAG | (secret) | Shared authentication JWT secret |
| `POSTGRES_DB` | RAG | - | Database storing vector embeddings |
| `DEBUG_RAG_API` | RAG | false | Disable RAG API debug logs |
| `POSTGRES_USER` | RAG | (secret) | Postgres database username |
| `OPENAI_API_KEY` | RAG | (secret) | API key for embeddings provider |
| `POSTGRES_PASSWORD` | RAG | (secret) | Password for Postgres user |
| `EMBEDDINGS_PROVIDER` | RAG | openai | Embedding model provider used |
| `MEILI_ENV` | Meilisearch | production | Run Meilisearch in production mode |
| `MEILI_DB_PATH` | Meilisearch | /meili_data/data.ms | Path storing Meilisearch index data |
| `MEILI_HTTP_ADDR` | Meilisearch | :::7700 | Network address Meilisearch listens on |
| `MEILI_MASTER_KEY` | Meilisearch | - | Master API key for search |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | Disable Meilisearch usage analytics |
| `HOST` | LibreChat | 0.0.0.0 | Bind server to all interfaces |
| `SEARCH` | LibreChat | true | Enable internal search feature |
| `CREDS_IV` | LibreChat | - | Initialization vector for encryption |
| `NO_INDEX` | LibreChat | true | Disable indexing by search engines |
| `APP_TITLE` | LibreChat | LibreChat | Application display title |
| `CREDS_KEY` | LibreChat | - | Encryption key for stored credentials |
| `ENDPOINTS` | LibreChat | openAI,agents,assistants,azureOpenAI,google,anthropic,custom | Enabled AI provider endpoints |
| `LOGIN_MAX` | LibreChat | (secret) | Maximum login attempts allowed |
| `MONGO_URI` | LibreChat | - | MongoDB connection string |
| `GOOGLE_KEY` | LibreChat | user_provided | API key for Google models |
| `JWT_SECRET` | LibreChat | (secret) | Secret for JWT authentication |
| `MEILI_HOST` | LibreChat | - | Meilisearch internal endpoint |
| `CONFIG_PATH` | LibreChat | https://raw.githubusercontent.com/LibreChat-AI/librechat-config-yaml/main/librechat-up-l.yaml | External LibreChat configuration file |
| `RAG_API_URL` | LibreChat | - | Public endpoint of RAG pipeline |
| `TITLE_CONVO` | LibreChat | true | Automatically title conversations |
| `BAN_DURATION` | LibreChat | 1000 * 60 * 60 * 2 | Duration of temporary bans |
| `BAN_INTERVAL` | LibreChat | 20 | Interval tracking violation frequency |
| `DEBUG_OPENAI` | LibreChat | false | Disable OpenAI debug output |
| `GROQ_API_KEY` | LibreChat | (secret) | API key for Groq models |
| `LOGIN_WINDOW` | LibreChat | (secret) | Time window tracking logins |
| `REGISTER_MAX` | LibreChat | 5 | Max registration attempts allowed |
| `CHECK_BALANCE` | LibreChat | false | Disable API balance checking |
| `DEBUG_CONSOLE` | LibreChat | false | Disable debug console output |
| `DEBUG_LOGGING` | LibreChat | true | Enable server debug logging |
| `DEBUG_PLUGINS` | LibreChat | true | Enable plugin debug logging |
| `GOOGLE_MODELS` | LibreChat | gemini-2.5-pro,gemini-2.5-pro-preview-06-05,gemini-2.5-pro-preview-05-06,gemini-2.5-pro-preview-03-25,gemini-2.5-flash,gemini-2.5-flash-preview-05-20,gemini-2.5-flash-lite-preview-06-17,gemini-2.0-flash,gemini-2.0-flash-exp,gemini-2.0-flash-lite-preview-02-05,gemini-2.0-flash-thinking-exp,gemini-2.0-flash-thinking-exp-1219,gemini-2.0-pro-exp-02-05,gemini-exp-1206,gemini-1.5-flash-001,gemini-1.5-flash-002,gemini-1.5-flash-latest,gemini-1.5-pro-001,gemini-1.5-pro-002,gemini-1.5-pro-latest | Allowed Google Gemini models |
| `OPENAI_MODELS` | LibreChat | gpt-3.5-turbo,gpt-4,gpt-4o,gpt-4.1,gpt-5,chatgpt-4o-latest | Allowed OpenAI model list |
| `BAN_VIOLATIONS` | LibreChat | true | Enable automatic banning system |
| `MESSAGE_IP_MAX` | LibreChat | 40 | Max messages per IP |
| `OPENAI_API_KEY` | LibreChat | (secret) | API key for OpenAI models |
| `OPENROUTER_KEY` | LibreChat | user_provided | API key for OpenRouter gateway |
| `SESSION_EXPIRY` | LibreChat | 1000 * 60 * 15 | User session expiration time |
| `MISTRAL_API_KEY` | LibreChat | (secret) | API key for Mistral models |
| `REGISTER_WINDOW` | LibreChat | 60 | Registration attempt tracking window |
| `ANYSCALE_API_KEY` | LibreChat | (secret) | API key for Anyscale inference |
| `LIMIT_MESSAGE_IP` | LibreChat | true | Limit messages per IP |
| `MEILI_MASTER_KEY` | LibreChat | - | Shared Meilisearch authentication key |
| `MESSAGE_USER_MAX` | LibreChat | 40 | Max messages per user |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) | Allow users to login via email |
| `ANTHROPIC_API_KEY` | LibreChat | (secret) | API key for Anthropic models |
| `FIREWORKS_API_KEY` | LibreChat | (secret) | API key for Fireworks models |
| `MESSAGE_IP_WINDOW` | LibreChat | 1 | Time window for IP limit |
| `OPENAI_MODERATION` | LibreChat | false | Disable OpenAI moderation endpoint |
| `ALLOW_REGISTRATION` | LibreChat | true | Allow new user registrations |
| `ALLOW_SOCIAL_LOGIN` | LibreChat | (secret) | Disable social provider login |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) | Secret for refresh tokens |
| `LIMIT_MESSAGE_USER` | LibreChat | (secret) | Disable user message limit |
| `MEILI_NO_ANALYTICS` | LibreChat | - | Disable Meilisearch analytics |
| `PERPLEXITY_API_KEY` | LibreChat | (secret) | API key for Perplexity AI |
| `TOGETHERAI_API_KEY` | LibreChat | (secret) | API key for TogetherAI models |
| `GITHUB_CALLBACK_URL` | LibreChat | /oauth/github/callback | GitHub OAuth callback path |
| `GOOGLE_CALLBACK_URL` | LibreChat | /oauth/google/callback | Google OAuth callback path |
| `MESSAGE_USER_WINDOW` | LibreChat | 1 | Time window for user limit |
| `DISCORD_CALLBACK_URL` | LibreChat | /oauth/discord/callback | Discord OAuth callback path |
| `REFRESH_TOKEN_EXPIRY` | LibreChat | (secret) | Refresh token expiry duration |
| `FACEBOOK_CALLBACK_URL` | LibreChat | /oauth/facebook/callback | Facebook OAuth callback path |
| `LOGIN_VIOLATION_SCORE` | LibreChat | (secret) | Score added on login violation |
| `CONCURRENT_MESSAGE_MAX` | LibreChat | 2 | Max simultaneous messages per user |
| `MESSAGE_VIOLATION_SCORE` | LibreChat | 1 | Score added on message violations |
| `ALLOW_SOCIAL_REGISTRATION` | LibreChat | false | Disable social account registration |
| `LIMIT_CONCURRENT_MESSAGES` | LibreChat | true | Enable concurrency message limits |
| `CONCURRENT_VIOLATION_SCORE` | LibreChat | 1 | Score added on concurrency violation |
| `NON_BROWSER_VIOLATION_SCORE` | LibreChat | 20 | Score added for non-browser access |
| `REGISTRATION_VIOLATION_SCORE` | LibreChat | 1 | Score added on registration violations |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **Volume:** `/data/db`
- **Volume:** `/meili_data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/librechat)
