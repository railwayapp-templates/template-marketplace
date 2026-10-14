# Deploy Odysseus v1 Private AI Workspace on Railway

Self-hosted AI workspace with web search, vector memory and alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odysseus-v1-private-ai-workspace)

## About

Odysseus is an open-source, self-hosted AI workspace: chat with local or cloud models, agents with tools, deep research, persistent memory, documents, notes, tasks, calendar and email in one web app. This template deploys Odysseus with private web search, a vector store, push alerts and a local model, ready to chat without an API key.

Odysseus is a FastAPI application that keeps its data in SQLite and files on disk, stores memory and document vectors in ChromaDB, searches the web through SearXNG and sends reminders through ntfy. Running it well means pinning the app image, giving each stateful service a volume, starting the app only after its vector store is reachable, keeping login enabled because the agent can run shell and file tools, and connecting at least one language model. This community template runs the official Odysseus 1.0.3 image with all four upstream services, adds a CPU Ollama service with a small model, creates the admin account from a generated password, and registers the model, the ntfy integration and your optional API provider on first boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ollama | [baranberkay96/odysseus-railway](https://github.com/baranberkay96/odysseus-railway) (branch: main) (root: /services/ollama) | Database |
| Odysseus | [baranberkay96/odysseus-railway](https://github.com/baranberkay96/odysseus-railway) (branch: main) (root: /services/odysseus) | Web service |
| SearXNG | [baranberkay96/odysseus-railway](https://github.com/baranberkay96/odysseus-railway) (branch: main) (root: /services/searxng) | Worker |
| ChromaDB | `chromadb/chroma:1.5.9@sha256:1e0b73a187a28757c572acba508c46f48c9e8b0acaf5c20e6d95cdedce1acdf6` | Database |
| ntfy | [baranberkay96/odysseus-railway](https://github.com/baranberkay96/odysseus-railway) (branch: main) (root: /services/ntfy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Ollama | 11434 | Ollama API port (private). |
| `OLLAMA_HOST` | Ollama | [::]:11434 | Bind address (IPv4 + IPv6). |
| `OLLAMA_THINKING` | Ollama | false | false: qwen3 answers directly, without a hidden reasoning phase (much faster on CPU). true: keep the model's own template, so qwen3 reasons before every answer. Redeploy Ollama after changing. |
| `OLLAMA_BASE_MODEL` | Ollama | qwen3:1.7b | Library model pulled on first boot (1.4 GB, Q4_K_M, tool calling, CPU-friendly). |
| `OLLAMA_KEEP_ALIVE` | Ollama | 30m | Unload the model after 30 idle minutes to free RAM. |
| `OLLAMA_NUM_THREAD` | Ollama | - | Optional. CPU threads for inference. Empty: this service's CPU quota, at most 8 (more threads than granted CPU time stall generation on shared hosts). |
| `OLLAMA_GO_TEMPLATE` | Ollama | 1 | Render chats with each model's Modelfile TEMPLATE (needed for the thinking-off template; otherwise Ollama may use the GGUF's embedded template). |
| `OLLAMA_PULL_MODELS` | Ollama | - | Models pulled on first boot (comma-separated). |
| `OLLAMA_NUM_PARALLEL` | Ollama | 1 | One request at a time (CPU); keeps memory predictable. |
| `OLLAMA_DEFAULT_MODEL` | Ollama | qwen3-cpu:1.7b | Tuned copy of OLLAMA_BASE_MODEL that Odysseus uses: CPU thread count, OLLAMA_CONTEXT_LENGTH and (for qwen3) thinking off. Recreated on every start. |
| `OLLAMA_KV_CACHE_TYPE` | Ollama | q8_0 | 8-bit KV cache: halves context memory with little quality loss. |
| `OLLAMA_CONTEXT_LENGTH` | Ollama | 16384 | Context window (num_ctx): room for Odysseus' tool instructions, memory and search results. |
| `OLLAMA_FLASH_ATTENTION` | Ollama | 1 | Flash attention, needed for the quantized KV cache below. |
| `OLLAMA_MAX_LOADED_MODELS` | Ollama | 1 | Keep one model in memory. |
| `PORT` | Odysseus | 7000 | Port uvicorn listens on (0.0.0.0). Railway routes the public domain and the /api/health check here. |
| `NTFY_TOPIC` | Odysseus | odysseus | ntfy topic for reminders and alerts. Subscribe to it in the ntfy app. |
| `AUTH_ENABLED` | Odysseus | true | Keep true: login required for the web UI and API. false would expose shell, file and agent tools to anyone with the URL. |
| `DATABASE_URL` | Odysseus | sqlite:////app/data/app.db | SQLite database for sessions, messages, documents and model endpoints, on the /app/data volume. |
| `OLLAMA_MODEL` | Odysseus | - | Tuned Ollama model registered on first boot; it becomes the default chat model unless LLM_PROVIDER_MODEL is set or you picked another default. |
| `CHROMADB_HOST` | Odysseus | - | Private hostname of the ChromaDB vector store (memory vectors, RAG, semantic skills). |
| `CHROMADB_PORT` | Odysseus | - | ChromaDB port. |
| `ALLOWED_ORIGINS` | Odysseus | - | Exact origins allowed for cross-origin API clients. |
| `FASTEMBED_MODEL` | Odysseus | sentence-transformers/all-MiniLM-L6-v2 | Local ONNX embedding model for memory and documents (upstream default, runs on CPU). |
| `OLLAMA_BASE_URL` | Odysseus | - | Private URL of the bundled Ollama service. Registered as a model endpoint on first boot. |
| `LOCALHOST_BYPASS` | Odysseus | false | Keep false: loopback requests must authenticate too (upstream: development only). |
| `SEARXNG_INSTANCE` | Odysseus | - | Private SearXNG URL used for web search and deep research. |
| `NTFY_INTERNAL_URL` | Odysseus | - | Private ntfy URL. Added as the ntfy integration for reminders on first boot. |
| `LLM_PROVIDER_MODEL` | Odysseus | - | Optional. Model id on that provider (e.g. gpt-5-mini, or openai/gpt-5-mini on OpenRouter). When set it becomes the default chat model instead of the local Ollama model; otherwise pick a model in the chat model menu. |
| `NTFY_PUBLISH_TOKEN` | Odysseus | (secret) | Write-only ntfy access token Odysseus publishes reminders with (stored encrypted in Odysseus). |
| `ODYSSEUS_ADMIN_USER` | Odysseus | (secret) | Username of the admin account created on first boot. |
| `FASTEMBED_CACHE_PATH` | Odysseus | /app/data/fastembed | Embedding model cache on the volume, so it is downloaded once. |
| `LLM_PROVIDER_API_KEY` | Odysseus | (secret) | Optional, recommended for fast answers. API key of an OpenAI-compatible provider (OpenAI, OpenRouter, Groq, ...). When set, the provider is registered as a model endpoint on boot. More providers can be added in Settings. |
| `LLM_PROVIDER_BASE_URL` | Odysseus | https://api.openai.com/v1 | Optional. OpenAI-compatible base URL for LLM_PROVIDER_API_KEY, e.g. https://openrouter.ai/api/v1. |
| `CLEANUP_INTERVAL_HOURS` | Odysseus | 24 | Interval of the built-in cleanup job. |
| `OAUTH_REDIRECT_BASE_URL` | Odysseus | - | External origin for remote MCP server OAuth callbacks. |
| `ODYSSEUS_ADMIN_PASSWORD` | Odysseus | (secret) | Admin password, generated at deploy. Used only to create the admin on first boot (and by the one-time bootstrap); change it later in Settings. |
| `CHROMADB_CONNECT_TIMEOUT` | Odysseus | 5.0 | Seconds for the ChromaDB connect probe at startup. |
| `GOOGLE_OAUTH_REDIRECT_URI` | Odysseus | - | Gmail OAuth redirect URI (Railway's proxy is not on a trusted address, so it is pinned here). Only used if you connect Gmail. |
| `WAIT_FOR_SERVICES_SECONDS` | Odysseus | 300 | How long the start script waits for ChromaDB before starting Odysseus anyway. |
| `PORT` | SearXNG | 8080 | SearXNG port (granian, dual-stack ::). Railway's healthcheck probes /healthz here. |
| `SEARXNG_SECRET` | SearXNG | (secret) | SearXNG secret key (overrides server.secret_key), generated at deploy. |
| `SEARXNG_BASE_URL` | SearXNG | - | Base URL SearXNG uses for its own links (private network only). |
| `PORT` | ChromaDB | 8000 | ChromaDB HTTP port (private). Railway's healthcheck probes /api/v2/heartbeat here. |
| `ANONYMIZED_TELEMETRY` | ChromaDB | FALSE | Chroma product telemetry off (as in upstream compose). |
| `PORT` | ntfy | 8080 | ntfy HTTP port. Railway routes the public domain and the /v1/health check here. |
| `NTFY_BASE_URL` | ntfy | - | Public URL of this ntfy server: use it as the server in the ntfy app. |
| `NTFY_AUTH_FILE` | ntfy | /var/lib/ntfy/user.db | User and access-control database, on the volume. |
| `NTFY_ADMIN_USER` | ntfy | (secret) | ntfy login for the web app and the Android/iOS app. |
| `NTFY_CACHE_FILE` | ntfy | /var/lib/ntfy/cache.db | Message cache on the volume, so phones that were offline still get alerts after a redeploy. |
| `NTFY_LISTEN_HTTP` | ntfy | :8080 | ntfy listen address (Go, dual-stack). |
| `NTFY_BEHIND_PROXY` | ntfy | true | Trust Railway's proxy headers for client IPs (rate limiting). |
| `NTFY_ENABLE_LOGIN` | ntfy | (secret) | Show the login in the ntfy web app. |
| `NTFY_REQUIRE_LOGIN` | ntfy | (secret) | The web app is only usable after login. |
| `NTFY_ADMIN_PASSWORD` | ntfy | (secret) | Password of NTFY_ADMIN_USER, generated at deploy. |
| `NTFY_CACHE_DURATION` | ntfy | 72h | How long messages are kept for clients that were offline. |
| `NTFY_ODYSSEUS_TOKEN` | ntfy | (secret) | Access token of the write-only 'odysseus' publisher user (ntfy format tk_ + 29 chars). Odysseus reads it by reference. |
| `NTFY_UPSTREAM_BASE_URL` | ntfy | - | Optional. Set https://ntfy.sh for instant iOS push (ntfy.sh then relays a wake-up poll with only the message ID). Android and web need nothing. |
| `NTFY_AUTH_DEFAULT_ACCESS` | ntfy | deny-all | Anonymous users can neither read nor publish. |
| `NTFY_ATTACHMENT_CACHE_DIR` | ntfy | /var/lib/ntfy/attachments | Attachment storage on the volume. |

## Configuration

- **Healthcheck:** `/`
- **Volume:** `/root/.ollama`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/api/v2/heartbeat`
- **Volume:** `/data`
- **Healthcheck:** `/v1/health`
- **Volume:** `/var/lib/ntfy`

**Category:** AI/ML · **Tags:** odysseus, ai-workspace, ai-agents, llm, ollama · **Languages:** Python, Shell, Dockerfile, Go Template

[View on Railway →](https://railway.com/deploy/odysseus-v1-private-ai-workspace)
