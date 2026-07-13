# Deploy Odysseus (PewDiePie) [Updated Jul '26] on Railway

Odysseus [Jul '26] (Self-Hosted AI Workspace, Agents & Memory) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odysseus-pewdiepie)

## About

Odysseus is an open-source, self-hosted AI workspace from PewDiePie's archdaemon project - the privacy-first version of the UI you get from ChatGPT and Claude. It brings chat across multiple LLM providers, an agent system with tool access, model management, deep research, side-by-side model comparison, document editing, persistent memory and skills, email, notes and tasks, and a CalDAV calendar into one mobile-responsive app. Bring your own model through any OpenAI-compatible API and keep every conversation on infrastructure you control.

Self hosting Odysseus means your chats, documents, memory, API keys, and email stay on infrastructure you own, with no usage caps and no third-party data retention. With Railway the full stack deploys automatically - the FastAPI web app, a ChromaDB vector store, a SearXNG engine for deep research, and an ntfy server, all wired over private networking with HTTPS and volumes. Railway handles orchestration so you skip Docker Compose, reverse proxy, and TLS setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| odysseus | [Shinyduo/odysseus](https://github.com/Shinyduo/odysseus) | Web service |
| chromadb | `chromadb/chroma:1.0.21` | Database |
| searxng | [Shinyduo/odysseus-searxng](https://github.com/Shinyduo/odysseus-searxng) | Worker |
| ntfy | [Shinyduo/odysseus-ntfy](https://github.com/Shinyduo/odysseus-ntfy) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | odysseus | 7000 |
| `AUTH_ENABLED` | odysseus | true |
| `DATABASE_URL` | odysseus | sqlite:////app/data/app.db |
| `CHROMADB_PORT` | odysseus | 8000 |
| `SECURE_COOKIES` | odysseus | true |
| `LOCALHOST_BYPASS` | odysseus | false |
| `ODYSSEUS_ADMIN_USER` | odysseus | (secret) |
| `FASTEMBED_CACHE_PATH` | odysseus | /app/data/fastembed |
| `ODYSSEUS_ADMIN_PASSWORD` | odysseus | (secret) |
| `IS_PERSISTENT` | chromadb | TRUE |
| `ANONYMIZED_TELEMETRY` | chromadb | FALSE |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/data`

**Category:** Automation · **Languages:** Python, JavaScript, CSS, HTML, Shell, PowerShell, TypeScript, Dockerfile, Batchfile

[View on Railway →](https://railway.com/deploy/odysseus-pewdiepie)
