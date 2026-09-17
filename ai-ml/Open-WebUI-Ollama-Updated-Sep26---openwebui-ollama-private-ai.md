# Deploy Open WebUI + Ollama [Updated Sep'26] on Railway

Self-host a private, login-gated AI chat UI — your data stays yours

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openwebui-ollama-private-ai)

## About

This template pairs Open WebUI — the most popular self-hosted AI chat interface — with Ollama, behind authentication, as a private AI workspace you fully own. Every conversation stays on your infrastructure: no third-party logging, no per-user fees, and a login wall in front of the whole thing. Connect cloud models (OpenAI, Anthropic) for heavy work, run small local models or embeddings on Ollama, and point Ollama at an external GPU host when you need serious local inference — all through one polished, private ChatGPT-style UI.

---

This is a private, authenticated AI workspace, and understanding what runs well where — plus keeping it locked down — is the key. This template is set up honestly around Railway's compute.

**Authenticated and private — that's the point.** The reason to run this over a public chatbot is control: Open WebUI sits behind a login (set `WEBUI_SECRET_KEY` and create the first admin, then set `ENABLE_SIGNUP=false`), and every conversation, document, and model call stays on your Railway infrastructure rather than a vendor's servers. No per-seat fees, no training on your data, no third party in the loop. It's a genuine private ChatGPT alternative for you or your team.

**Open WebUI is the reliable win — the private frontend.** You get a full ChatGPT-style interface: multi-model chat, user accounts and roles, conversation history, built-in RAG over your documents, and a tool runner — all self-hosted. This works great on Railway regardless of where the models actually run, which is the durable value here.

**Ollama on Railway suits small models and embeddings — sized honestly.** Railway provides CPU compute, not GPUs, so Ollama here runs small models (1–3B) and embedding models at usable speeds — handy for lightweight chat, testing, and RAG embeddings. Larger models (7B and up) run slowly on CPU and can exceed memory. For fast local inference on big models, point Open WebUI at an external GPU-backed Ollama host via `OLLAMA_BASE_URL`, or use a cloud API for heavy generation. This template is honest about that so you configure it for good results rather than hitting a wall.

**Mix cloud and local in one private UI.** Set `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` and those frontier models appear alongside anything Ollama serves — run a small local model for quick private tasks, and switch to a cloud model for heavy work, all behind the same login.

**Persist both volumes.** Open WebUI's data (chats, users, documents, RAG vectors) lives on its volume, and Ollama's models on theirs — both survive redeploys, so you don't lose history or re-download multi-gigabyte models.

Typical cost: **~$5–15/month** on Railway for the two services and model storage, plus any cloud LLM usage. Both tools are free and open source.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenWebUI | `ghcr.io/open-webui/open-webui` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| Ollama | `ollama/ollama:0.32.5` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | OpenWebUI | 8080 | PORT |
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
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | Ollama | 11434 | Port Railway health-checks |
| `OLLAMA_HOST` | Ollama | [::]:11434 | IPv6 bind, required for private DNS |
| `OLLAMA_MODELS` | Ollama | /root/.ollama/models | Model storage path on volume |
| `OLLAMA_NO_CLOUD` | Ollama | 1 | Disable remote cloud model inference |
| `OLLAMA_KEEP_ALIVE` | Ollama | 10m | Loaded model idle retention |
| `OLLAMA_NUM_PARALLEL` | Ollama | 1 | Concurrent request slots per model |
| `OLLAMA_CONTEXT_LENGTH` | Ollama | 4096 | Pinned context window size |
| `OLLAMA_MAX_LOADED_MODELS` | Ollama | 1 | Max simultaneously resident models |

## Configuration

- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.ollama`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openwebui-ollama-private-ai)
