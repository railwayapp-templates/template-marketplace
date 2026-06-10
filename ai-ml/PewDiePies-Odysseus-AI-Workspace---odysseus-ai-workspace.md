# Deploy PewDiePie's Odysseus AI Workspace on Railway

Self-hosted AI workspace with memory, RAG & web search. No ChatGPT fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odysseus-ai-workspace)

## About

![Odysseus self-hosted AI workspace](https://res.cloudinary.com/dh2nt6hgh/image/upload/v1780982827/Screenshot_2026-06-09_at_10.56.59_AM_i70jx3.png)

Odysseus is the self-hosted AI workspace built by PewDiePie — chat, persistent memory,
RAG document search, private web research, agent workflows, email tools, Playwright browser
automation, and push notifications, all in one platform. Connect Claude, GPT-4o, Gemini,
OpenRouter, or any OpenAI-compatible endpoint. Every conversation, memory, and document
stays on your Railway instance — nothing shared with any third-party platform.

This template deploys the complete four-service Odysseus stack: the web app, ChromaDB for
vector memory, private SearXNG for web search, and ntfy for push notifications — all
pre-wired over Railway's private networking with persistent volumes.

---

Running Odysseus in production requires four coordinated services with private networking,
persistent volumes, and shared credentials. Without a managed host, you're configuring
Docker Compose, inter-service networking, SearXNG settings files, and SSL manually.

Railway pre-wires all four services over private networking with auto-generated admin
credentials and persistent volumes — public HTTPS domain for Odysseus UI provisioned
automatically.

Typical cost: **~$5–10/month** on Railway's Hobby plan. ChatGPT Plus costs $20/month per
user with no persistent cross-session memory, no private web search, and no self-hosted
option. Odysseus gives your whole team all of that at flat compute cost.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Odysseus | [XavTo/odysseus](https://github.com/XavTo/odysseus) | Web service |
| ntfy | `binwiederhier/ntfy` | Database |
| searxng | [XavTo/odysseus](https://github.com/XavTo/odysseus) | Database |
| chroma | `chromadb/chroma:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PGID` | Odysseus | 1000 | - |
| `PUID` | Odysseus | 1000 | - |
| `LLM_HOST` | Odysseus | localhost | - |
| `AUTH_ENABLED` | Odysseus | true | - |
| `DATABASE_URL` | Odysseus | sqlite:///./data/app.db | - |
| `NODE_OPTIONS` | Odysseus | --max-old-space-size=4096 | - |
| `CHROMADB_PORT` | Odysseus | 8000 | - |
| `OPENAI_API_KEY` | Odysseus | (secret) | optional: OpenAI API key for cloud models |
| `SECURE_COOKIES` | Odysseus | true | - |
| `EMBEDDING_MODEL` | Odysseus | - | optional: embedding model name when using EMBEDDING_URL |
| `FASTEMBED_MODEL` | Odysseus | sentence-transformers/all-MiniLM-L6-v2 | - |
| `LOCALHOST_BYPASS` | Odysseus | false | - |
| `ODYSSEUS_ADMIN_USER` | Odysseus | (secret) | initial admin username |
| `FASTEMBED_CACHE_PATH` | Odysseus | /app/data/fastembed | - |
| `ODYSSEUS_SCRIPT_HOST` | Odysseus | localhost | - |
| `CLEANUP_INTERVAL_HOURS` | Odysseus | 24 | - |
| `ODYSSEUS_ADMIN_PASSWORD` | Odysseus | (secret) | Inital admin password |
| `ODYSSEUS_INPROCESS_TASKS` | Odysseus | 1 | - |
| `PLAYWRIGHT_BROWSERS_PATH` | Odysseus | /ms-playwright | - |
| `ODYSSEUS_INPROCESS_POLLERS` | Odysseus | 1 | - |
| `NTFY_BEHIND_PROXY` | ntfy | true | - |
| `SEARXNG_SECRET` | searxng | (secret) | - |
| `ANONYMIZED_TELEMETRY` | chroma | FALSE | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/cache/ntfy`
- **Volume:** `/etc/searxng`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Python, CSS, HTML, Shell, PowerShell, TypeScript, Dockerfile, Batchfile

[View on Railway →](https://railway.com/deploy/odysseus-ai-workspace)
