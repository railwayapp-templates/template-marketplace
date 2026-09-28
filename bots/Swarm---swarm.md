# Deploy Swarm on Railway

Named LLM bots join channels, take jobs, run routines on your Railway box

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swarm)

## About

Swarm — self-hosted AI team workspace. Named LLM bots join channels, take jobs, run routines, and hand work to each other — a self-hosted Grok Bot alternative with a full audit trail.

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/swarm-1)

Swarm runs as a single container on Railway: a FastAPI backend, the React 19 web UI, and SQLite all in one image. Bots, channels, messages, workflows, and sealed provider keys persist on a Railway volume at `/app/data`. The service listens on port 8000, mapped to your Railway public domain, with a health probe at `GET /health`.

The first user to register on the UI becomes the admin (PBKDF2-hashed password). Provider keys can be set as environment variables or managed at runtime in the UI under **Command Center → AI providers** — they are stored sealed in SQLite and never returned by the API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| swarm | [mc9max/swarm-railway](https://github.com/mc9max/swarm-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SWARM_DEMO` | 1 | Set to 1 for deterministic mock replies with a seeded #general thread (no provider keys needed). Set to 0 once you have added a real provider key. |
| `EXA_API_KEY` | (secret) | Exa API key for web research tools (Computer → Apps). Optional. |
| `GROQ_API_KEY` | (secret) | Groq API key so bots can respond (free tier at console.groq.com). Replace the placeholder with your key, or leave and manage keys in the UI under Command Center → AI providers. |
| `SWARM_SECRET` | (secret) | Secret used for signing sessions. Auto-generated placeholder; each install gets a unique value. |
| `SWARM_SYSTEM` | 1 | 1 lets bots run tools on the host (system_run/read/write) bound to SWARM_SYSTEM_ROOT; set 0 to disable on untrusted networks. |
| `LANGFUSE_HOST` | https://cloud.langfuse.com | Langfuse host URL if you use observability. Optional. |
| `SWARM_BROWSER` | 1 | 1 enables Playwright browser-use tools for bots; set 0 to disable. |
| `TAVILY_API_KEY` | (secret) | Tavily API key for web research tools (Computer → Apps). Optional. |
| `COMPOSIO_API_KEY` | (secret) | Composio key for app integrations (Gmail, Slack, GitHub, Notion, 1000+ apps). Optional. |
| `COMPOSIO_USER_ID` | swarm-workspace | Shared Composio user_id so every bot sees the same connected accounts. |
| `FIRECRAWL_API_KEY` | (secret) | Firecrawl API key for web crawl tools (Computer → Apps). Optional. |
| `SWARM_AGENT_MODEL` | openai/gpt-oss-120b | Model override applied to every agent, e.g. openai/gpt-oss-120b (Groq) or a model slug from your provider. |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter key used as fallback provider if Groq fails or is unset. Manageable in the UI as well. |
| `LANGFUSE_PUBLIC_KEY` | - | Langfuse public key for LLM observability. Optional. |
| `LANGFUSE_SECRET_KEY` | (secret) | Langfuse secret key for LLM observability. Optional. |
| `SWARM_ALLOWED_ORIGINS` | - | Browser origins allowed to call the API (origin guard). Defaults to https:// plus your Railway public domain so the UI works on first install. Add more origins comma-separated (scheme://host) if you use a custom domain. |
| `SWARM_OPENAI_COMPAT_API_KEY` | (secret) | Key for the custom OpenAI-compatible endpoint; blank works for keyless servers. |
| `SWARM_OPENAI_COMPAT_BASE_URL` | - | Optional. Base URL of your own OpenAI-compatible server (Ollama, LM Studio, vLLM), e.g. http://ollama.railway.internal:11434/v1. Leave empty if not using a custom provider (the Custom provider stays hidden). |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Bots · **Languages:** Python, JavaScript, TypeScript, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/swarm)
