# Deploy Open WebUI and Ollama on Railway

Private AI: Ollama inference behind an authenticated Open WebUI chat UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-open-webui)

## About

Open WebUI is a self-hosted, ChatGPT-style AI chat platform with multi-user accounts, RBAC and document RAG; Ollama is the open-source runtime that serves quantised open-weight LLMs over HTTP. Together they are the default self-hosted local-LLM stack: private team chat with no API key, and no prompt leaving your own infrastructure.

Deploy Ollama and Open WebUI on Railway as four services. **open-webui** (`ghcr.io/open-webui/open-webui:v0.10.2`, port `8080`) is the only one with a public domain; it keeps users, chats and settings in managed **Postgres**, uses managed **Redis** for websockets, and mounts a volume at `/data`. **ollama** (`ollama/ollama:0.32.5`, port `11434`) gets **no public domain by design** — it enforces no authentication on any route — and answers only at `ollama.railway.internal:11434`, weights on `/root/.ollama`.

![Ollama + Open WebUI Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1785655340/531_1x_shots_so_uevb8t.png)

Self-hosting replaces personal vendor accounts, scattered keys and documents in someone else's logs with one governed URL.

- **ChatGPT-style UI over local models** — streaming threads, code rendering, multi-model comparison, voice input.
- **Built-in RAG** — documents and URLs in shared knowledge bases with hybrid search; embedding and Whisper models ship in the image, so nothing downloads at boot.
- **Multi-tenancy and tooling** — per-group model permissions, LDAP/OAuth/SSO/SCIM, Tools, Functions, Pipes, MCP servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| OpenWebUI | `ghcr.io/open-webui/open-webui:v0.10.2` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Ollama | `ollama/ollama:0.32.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | OpenWebUI | 8080 | HTTP port the app listens on |
| `HF_HOME` | OpenWebUI | /app/backend/data/cache/embedding/models | Baked-in Hugging Face cache |
| `DATA_DIR` | OpenWebUI | /data | Volume path for uploads and vectors |
| `REDIS_URL` | OpenWebUI | - | Shared application state store |
| `WEBUI_URL` | OpenWebUI | - | Public URL for OAuth and search |
| `USER_AGENT` | OpenWebUI | open-webui-railway/1.0 | Identifier for outbound fetches |
| `WEBUI_AUTH` | OpenWebUI | true | Require login for access |
| `DATABASE_URL` | OpenWebUI | - | Postgres connection string |
| `ENABLE_SIGNUP` | OpenWebUI | true | Open signup until first admin exists |
| `OLLAMA_BASE_URL` | OpenWebUI | - | Private Ollama endpoint |
| `OMP_NUM_THREADS` | OpenWebUI | 8 | Caps PyTorch threads to vCPU |
| `UVICORN_WORKERS` | OpenWebUI | 1 | Single worker avoids duplicate automations |
| `WEBUI_SECRET_KEY` | OpenWebUI | (secret) | Signs JWTs, cookies, sessions |
| `CORS_ALLOW_ORIGIN` | OpenWebUI | - | Restrict browser origins |
| `DEFAULT_USER_ROLE` | OpenWebUI | pending | New signups await admin review |
| `ENABLE_OLLAMA_API` | OpenWebUI | true | Enable the Ollama model provider |
| `ENABLE_OPENAI_API` | OpenWebUI | false | Keep the stack fully self-contained |
| `WEBSOCKET_MANAGER` | OpenWebUI | redis | Use Redis for websockets |
| `WHISPER_MODEL_DIR` | OpenWebUI | /app/backend/data/cache/whisper/models | Baked-in Whisper model cache |
| `DATABASE_POOL_SIZE` | OpenWebUI | 10 | Postgres connection pool size |
| `TIKTOKEN_CACHE_DIR` | OpenWebUI | (secret) | Baked-in tiktoken encoding cache |
| `WEBSOCKET_REDIS_URL` | OpenWebUI | - | Websocket coordination backend |
| `DATABASE_POOL_TIMEOUT` | OpenWebUI | 30 | Seconds to wait for connection |
| `AIOHTTP_CLIENT_TIMEOUT` | OpenWebUI | 300 | Upstream Ollama request timeout |
| `ENABLE_WEBSOCKET_SUPPORT` | OpenWebUI | true | Enable realtime streaming and channels |
| `WHISPER_MODEL_AUTO_UPDATE` | OpenWebUI | false | Use baked-in Whisper model |
| `DATABASE_POOL_MAX_OVERFLOW` | OpenWebUI | 5 | Extra pool connections allowed |
| `SENTENCE_TRANSFORMERS_HOME` | OpenWebUI | /app/backend/data/cache/embedding/models | Baked-in embedding model cache |
| `ENABLE_VERSION_UPDATE_CHECK` | OpenWebUI | false | Skip outbound version check calls |
| `RAG_EMBEDDING_MODEL_AUTO_UPDATE` | OpenWebUI | false | Use baked-in embedding model |
| `RAG_RERANKING_MODEL_AUTO_UPDATE` | OpenWebUI | false | Use baked-in reranking model |
| `OAUTH_SESSION_TOKEN_ENCRYPTION_KEY` | OpenWebUI | (secret) | Encrypts OAuth session tokens |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | Ollama | 11434 | Port Railway health-checks |
| `OLLAMA_HOST` | Ollama | [::]:11434 | IPv6 bind, required for private DNS |
| `OLLAMA_MODELS` | Ollama | /root/.ollama/models | Model storage path on volume |
| `OLLAMA_NO_CLOUD` | Ollama | 1 | Disable remote cloud model inference |
| `OLLAMA_KEEP_ALIVE` | Ollama | 10m | Loaded model idle retention |
| `OLLAMA_NUM_PARALLEL` | Ollama | 1 | Concurrent request slots per model |
| `OLLAMA_CONTEXT_LENGTH` | Ollama | 4096 | Pinned context window size |
| `OLLAMA_MAX_LOADED_MODELS` | Ollama | 1 | Max simultaneously resident models |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ollama-open-webui)
