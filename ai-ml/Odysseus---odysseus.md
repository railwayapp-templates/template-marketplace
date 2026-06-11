# Deploy Odysseus on Railway

odysseus from pewdiepie. Self-hosted AI workspace. odyseus

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odysseus)

## About

Odysseus is a self-hosted AI workspace for chat, agents, tools, documents, memory, research, email, and model integrations. This Railway template deploys Odysseus with supporting services so you can run the web UI online while connecting it to external LLM APIs or a remote OpenAI-compatible endpoint.

This template deploys a multi-service Odysseus stack on Railway: the main Odysseus app, ChromaDB for vector storage, SearXNG for web search, and ntfy for notifications. The services communicate over Railway private networking, while only the Odysseus web app is exposed publicly by default. Persistent volumes are used so application data, uploads, vectors, and service state survive redeploys. This template is intended for cloud-hosted Odysseus usage with external model providers such as OpenAI, OpenRouter, Anthropic-compatible gateways, or a remote Ollama/OpenAI-compatible server. It is not meant to run heavy local LLM inference inside Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chroma | `chromadb/chroma:latest` | Database |
| ntfy | `binwiederhier/ntfy` | Web service |
| searxng | [XavTo/odysseus](https://github.com/XavTo/odysseus) (root: /railway/searxng) | Database |
| odysseus | [XavTo/odysseus](https://github.com/XavTo/odysseus) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ANONYMIZED_TELEMETRY` | chroma | FALSE | disable Chroma telemetry |
| `NTFY_BASE_URL` | ntfy | - | internal ntfy URL used by Odysseus notifications |
| `NTFY_BEHIND_PROXY` | ntfy | true | only needed when ntfy is exposed publicly behind Railway HTTPS/reverse proxy |
| `SEARXNG_SECRET` | searxng | (secret) | cryptographic secret key used by SearXNG |
| `SEARXNG_BASE_URL` | searxng | - | internal base URL used to generate links and API responses |
| `PGID` | odysseus | 1000 | runtime group ID for non-root execution |
| `PUID` | odysseus | 1000 | runtime user ID for non-root execution |
| `HF_TOKEN` | odysseus | (secret) | optional: alternative Hugging Face token |
| `LLM_HOST` | odysseus | localhost | default local LLM host (kept for compatibility) |
| `LLM_HOSTS` | odysseus | - | optional: additional LLM hosts for model discovery |
| `AUTH_ENABLED` | odysseus | true | enable authentication |
| `DATABASE_URL` | odysseus | sqlite:///./data/app.db | SQLite database stored in the persistent volume |
| `NODE_OPTIONS` | odysseus | --max-old-space-size=4096 | increase Node.js memory limit for MCP/Playwright |
| `CHROMADB_HOST` | odysseus | - | internal Chroma service hostname |
| `CHROMADB_PORT` | odysseus | 8000 | internal Chroma service port |
| `EMBEDDING_URL` | odysseus | - | optional: OpenAI-compatible embeddings endpoint |
| `GOOGLE_PSE_CX` | odysseus | - | optional: Google Programmable Search Engine ID |
| `NTFY_BASE_URL` | odysseus | - | internal ntfy notification service URL |
| `GOOGLE_API_KEY` | odysseus | (secret) | optional: Google API key |
| `OPENAI_API_KEY` | odysseus | (secret) | optional: OpenAI API key for cloud models |
| `SECURE_COOKIES` | odysseus | true | force Secure cookies when using HTTPS |
| `SERPER_API_KEY` | odysseus | (secret) | optional: Serper Search API key |
| `TAVILY_API_KEY` | odysseus | (secret) | optional: Tavily Search API key |
| `ALLOWED_ORIGINS` | odysseus | - | allowed public frontend origin |
| `EMBEDDING_MODEL` | odysseus | - | optional: embedding model name when using EMBEDDING_URL |
| `FASTEMBED_MODEL` | odysseus | sentence-transformers/all-MiniLM-L6-v2 | default local embedding model |
| `OLLAMA_BASE_URL` | odysseus | - | optional: remote Ollama server URL (not localhost on Railway) |
| `LOCALHOST_BYPASS` | odysseus | false | disable localhost auth bypass (recommended for public deployments) |
| `SEARXNG_INSTANCE` | odysseus | - | internal SearXNG instance URL |
| `DATA_BRAVE_API_KEY` | odysseus | (secret) | optional: Brave Search API key |
| `ODYSSEUS_ADMIN_USER` | odysseus | (secret) | initial admin username |
| `FASTEMBED_CACHE_PATH` | odysseus | /app/data/fastembed | persistent FastEmbed model cache |
| `ODYSSEUS_SCRIPT_HOST` | odysseus | localhost | host used for internal scheduled scripts |
| `RESEARCH_LLM_ENDPOINT` | odysseus | - | optional: dedicated LLM endpoint used for Deep Research |
| `CLEANUP_INTERVAL_HOURS` | odysseus | 24 | background cleanup interval |
| `HUGGING_FACE_HUB_TOKEN` | odysseus | (secret) | optional: Hugging Face Hub access token |
| `ODYSSEUS_ADMIN_PASSWORD` | odysseus | (secret) | auto-generated admin password |
| `ODYSSEUS_INPROCESS_TASKS` | odysseus | 1 | enable built-in task scheduler |
| `PLAYWRIGHT_BROWSERS_PATH` | odysseus | /ms-playwright | location of Playwright browser binaries |
| `ODYSSEUS_INPROCESS_POLLERS` | odysseus | 1 | enable built-in background pollers |

## Configuration

- **Volume:** `/data`
- **Start command:** `ntfy serve`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/cache/ntfy`
- **Volume:** `/etc/searxng`
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** Python, JavaScript, CSS, HTML, Shell, PowerShell, TypeScript, Dockerfile, Batchfile

[View on Railway →](https://railway.com/deploy/odysseus)
