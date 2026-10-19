# Deploy LibreChat Multi-Model Chat Starter on Railway

AI chat with MongoDB, private search and a vector-backed document API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librechat-multi-model-chat-starter)

## About

AI chat with MongoDB, private search and a vector-backed document API.

This deployment fork provisions VectorDB, RAG API, LibreChat, Meilisearch, MongoDB. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo@sha256:dc28ed5a9d0fc616903c3f463bb1e53b92b49f441721b91926e87d90bf957ce8` | Database |
| Meilisearch | `getmeili/meilisearch@sha256:6f8f1fc29d1ff67b4d8d503bb4e0a69b55c8d42600decafde951344218193a27` | Database |
| LibreChat | `ghcr.io/danny-avila/librechat-dev@sha256:b278c620834c5653801030091072cad1974b47d0fc15a5009ed1a7d6e4c4f0d7` | Web service |
| VectorDB | `pgvector/pgvector@sha256:7b822b0aac60967beb1ea5e576b8602c94c300a157d187f385ae3e0da199b90a` | Database |
| RAG API | `ghcr.io/danny-avila/librechat-rag-api-dev-lite@sha256:a62ce2221b43a9bb57fa6cb733e7047c80132960272c33d5704028f3071a1251` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Private hostname of this MongoDB service |
| `MONGOPORT` | MongoDB | 27017 | MongoDB listening port |
| `MONGOUSER` | MongoDB | - | MongoDB root username |
| `MONGO_URL` | MongoDB | - | Public connection string via the Railway TCP proxy |
| `MONGOPASSWORD` | MongoDB | (secret) | MongoDB root password |
| `MONGO_PRIVATE_URL` | MongoDB | - | Private-network connection string consumed by LibreChat |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Auto-generated root password created on first boot |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root username created on first boot |
| `MEILI_ENV` | Meilisearch | production | Meilisearch environment; production disables the bundled web UI |
| `MEILI_DB_PATH` | Meilisearch | /meili_data/data.ms | Meilisearch index directory inside the mounted volume |
| `MEILI_HTTP_ADDR` | Meilisearch | [::]:7700 | Listen address; [::] binds all interfaces for Railway private networking |
| `MEILI_MASTER_KEY` | Meilisearch | - | Master key, mirrored from LibreChat so both services agree |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | Disable anonymized Meilisearch telemetry |
| `HOST` | LibreChat | 0.0.0.0 | Interface LibreChat binds to inside the container |
| `PROXY` | LibreChat | - | Proxy URL used by all endpoints (leave empty if not needed) |
| `SEARCH` | LibreChat | true | Enable search in messages and conversations via Meilisearch |
| `NO_INDEX` | LibreChat | true | Ask search engines not to index this deployment |
| `APP_TITLE` | LibreChat | LibreChat | Application name shown in the UI and browser tab |
| `ENDPOINTS` | LibreChat | openAI,agents,assistants,google,anthropic,custom | Comma-separated list of available endpoints |
| `LOGIN_MAX` | LibreChat | (secret) | Max logins allowed per IP per LOGIN_WINDOW |
| `MONGO_URI` | LibreChat | - | MongoDB connection string over the Railway private network |
| `GOOGLE_KEY` | LibreChat | user_provided | Google Gemini API key; user_provided lets each user enter their own |
| `JWT_SECRET` | LibreChat | (secret) | Secret used to sign access tokens; also shared with the RAG API |
| `MEILI_HOST` | LibreChat | - | Meilisearch URL on the private network |
| `CONFIG_PATH` | LibreChat | https://raw.githubusercontent.com/LibreChat-AI/librechat-config-yaml/c0c64090b6e06bc4c1764e424bdc282de718bdbc/librechat-env-l.yaml | Pinned librechat.yaml. Uses local file storage and env-based provider keys. |
| `RAG_API_URL` | LibreChat | - | RAG API URL on the private network |
| `TITLE_CONVO` | LibreChat | true | Auto-generate conversation titles |
| `TRUST_PROXY` | LibreChat | 1 | Trust Railway reverse proxy so client IPs resolve correctly |
| `XAI_API_KEY` | LibreChat | (secret) | xAI (Grok) API key; user_provided lets each user enter their own in the UI |
| `BAN_DURATION` | LibreChat | 7200000 | Ban duration in milliseconds (default: 2 hours) |
| `BAN_INTERVAL` | LibreChat | 20 | Ban triggers when violation score reaches this threshold |
| `GITHUB_TOKEN` | LibreChat | (secret) | GitHub Models token |
| `GROQ_API_KEY` | LibreChat | (secret) | Groq API key |
| `LOGIN_WINDOW` | LibreChat | (secret) | Login rate limit window in minutes |
| `REGISTER_MAX` | LibreChat | 5 | Max registrations allowed per IP per REGISTER_WINDOW |
| `AI302_API_KEY` | LibreChat | (secret) | 302AI API key |
| `CHECK_BALANCE` | LibreChat | false | Enable token balance enforcement per user |
| `CUSTOM_FOOTER` | LibreChat | - | Custom footer text displayed in the UI |
| `DEBUG_CONSOLE` | LibreChat | false | Enable verbose server output in the console (not recommended for production) |
| `DEBUG_LOGGING` | LibreChat | false | Enable verbose application logs (not recommended for production) |
| `DOMAIN_CLIENT` | LibreChat | - | Public URL of the frontend |
| `DOMAIN_SERVER` | LibreChat | - | Public URL of the backend |
| `UNIFY_API_KEY` | LibreChat | (secret) | Unify API key |
| `APIPIE_API_KEY` | LibreChat | (secret) | APIpie API key |
| `BAN_VIOLATIONS` | LibreChat | true | Enable banning users for violations |
| `COHERE_API_KEY` | LibreChat | (secret) | Cohere API key |
| `MESSAGE_IP_MAX` | LibreChat | 40 | Max messages per IP per MESSAGE_IP_WINDOW |
| `NVIDIA_API_KEY` | LibreChat | (secret) | NVIDIA NIM API key |
| `OPENAI_API_KEY` | LibreChat | (secret) | OpenAI API key; user_provided lets each user enter their own |
| `OPENROUTER_KEY` | LibreChat | user_provided | OpenRouter API key |
| `SESSION_EXPIRY` | LibreChat | 900000 | Access token lifetime in milliseconds |
| `KLUSTER_API_KEY` | LibreChat | (secret) | Kluster.ai API key |
| `MISTRAL_API_KEY` | LibreChat | (secret) | Mistral API key |
| `NANOGPT_API_KEY` | LibreChat | (secret) | NanoGPT API key |
| `REGISTER_WINDOW` | LibreChat | 60 | Registration rate limit window in minutes |
| `DEEPSEEK_API_KEY` | LibreChat | (secret) | API key for DeepSeek |
| `GITHUB_CLIENT_ID` | LibreChat | - | GitHub OAuth client ID (only needed if social login is enabled) |
| `GOOGLE_CLIENT_ID` | LibreChat | - | Google OAuth client ID (only needed if social login is enabled) |
| `LIMIT_MESSAGE_IP` | LibreChat | true | Enable IP-based message rate limiting |
| `MEILI_MASTER_KEY` | LibreChat | - | Meilisearch master key; mirrored into the Meilisearch service |
| `MESSAGE_USER_MAX` | LibreChat | 40 | Max messages per user per MESSAGE_USER_WINDOW |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) | Enable or disable email/password login |
| `ANTHROPIC_API_KEY` | LibreChat | (secret) | Anthropic API key; user_provided lets each user enter their own |
| `DISCORD_CLIENT_ID` | LibreChat | - | Discord OAuth client ID (only needed if social login is enabled) |
| `FIREWORKS_API_KEY` | LibreChat | (secret) | Fireworks AI API key |
| `HUGGINGFACE_TOKEN` | LibreChat | (secret) | HuggingFace access token |
| `MESSAGE_IP_WINDOW` | LibreChat | 1 | IP message rate limit window in minutes |
| `SAMBANOVA_API_KEY` | LibreChat | (secret) | SambaNova API key |
| `ALLOW_REGISTRATION` | LibreChat | true | Enable or disable email registration of new users |
| `ALLOW_SOCIAL_LOGIN` | LibreChat | (secret) | Enable social login (configure provider client IDs/secrets below) |
| `ASSISTANTS_API_KEY` | LibreChat | (secret) | OpenAI Assistants API key |
| `HYPERBOLIC_API_KEY` | LibreChat | (secret) | Hyperbolic API key |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) | Secret used to sign refresh tokens |
| `LIMIT_MESSAGE_USER` | LibreChat | (secret) | Enable user-based message rate limiting |
| `MEILI_NO_ANALYTICS` | LibreChat | true | Disable anonymized telemetry analytics for Meilisearch |
| `PERPLEXITY_API_KEY` | LibreChat | (secret) | Perplexity API key |
| `TOGETHERAI_API_KEY` | LibreChat | (secret) | Together AI API key |
| `GITHUB_CALLBACK_URL` | LibreChat | /oauth/github/callback | GitHub OAuth callback path |
| `GOOGLE_CALLBACK_URL` | LibreChat | /oauth/google/callback | Google OAuth callback path |
| `MESSAGE_USER_WINDOW` | LibreChat | 1 | User message rate limit window in minutes |
| `DISCORD_CALLBACK_URL` | LibreChat | /oauth/discord/callback | Discord OAuth callback path |
| `GITHUB_CLIENT_SECRET` | LibreChat | (secret) | GitHub OAuth client secret |
| `GOOGLE_CLIENT_SECRET` | LibreChat | (secret) | Google OAuth client secret |
| `REFRESH_TOKEN_EXPIRY` | LibreChat | (secret) | Refresh token lifetime in milliseconds |
| `DISCORD_CLIENT_SECRET` | LibreChat | (secret) | Discord OAuth client secret |
| `LOGIN_VIOLATION_SCORE` | LibreChat | (secret) | Score added to the ban counter for a failed login |
| `CONCURRENT_MESSAGE_MAX` | LibreChat | 2 | Max concurrent messages per user |
| `MESSAGE_VIOLATION_SCORE` | LibreChat | 1 | Score added to the ban counter when a message limit is exceeded |
| `ALLOW_SOCIAL_REGISTRATION` | LibreChat | false | Allow new users to register via social login |
| `LIMIT_CONCURRENT_MESSAGES` | LibreChat | true | Limit concurrent messages per user |
| `CONCURRENT_VIOLATION_SCORE` | LibreChat | 1 | Score added to the ban counter for exceeding concurrent messages |
| `NON_BROWSER_VIOLATION_SCORE` | LibreChat | 20 | Score added to the ban counter for non-browser requests |
| `REGISTRATION_VIOLATION_SCORE` | LibreChat | 1 | Score added to the ban counter for registration abuse |
| `POSTGRES_DB` | VectorDB | railway | Name of the vector database used by the RAG API |
| `POSTGRES_USER` | VectorDB | (secret) | PostgreSQL superuser for the vector database |
| `POSTGRES_PASSWORD` | VectorDB | (secret) | Auto-generated PostgreSQL password |
| `PORT` | RAG API | 8000 | Port the RAG API listens on; referenced by LibreChat RAG_API_URL |
| `DB_HOST` | RAG API | - | Private hostname of the VectorDB service |
| `DB_PORT` | RAG API | 5432 | PostgreSQL port on the VectorDB service |
| `JWT_SECRET` | RAG API | (secret) | Shared secret used to validate JWTs issued by LibreChat |
| `POSTGRES_DB` | RAG API | - | Vector database name, mirrored from the VectorDB service |
| `DEBUG_RAG_API` | RAG API | false | Enable verbose RAG API logging |
| `POSTGRES_USER` | RAG API | (secret) | PostgreSQL user, mirrored from the VectorDB service |
| `POSTGRES_PASSWORD` | RAG API | (secret) | PostgreSQL password, mirrored from the VectorDB service |
| `RAG_OPENAI_API_KEY` | RAG API | (secret) | Your own embedding-provider API key; required to use OpenAI-backed RAG. |
| `EMBEDDINGS_PROVIDER` | RAG API | openai | Embeddings backend used to index uploaded files |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **Volume:** `/data/db`
- **Volume:** `/meili_data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/librechat-multi-model-chat-starter)
