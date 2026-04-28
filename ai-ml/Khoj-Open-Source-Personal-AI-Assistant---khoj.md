# Deploy Khoj | Open Source Personal AI Assistant on Railway

Self Host Khoj. AI second brain with document search and custom agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/khoj)

## About

Deploy Khoj on Railway to get your own AI-powered second brain — a self-hosted personal assistant that searches your documents, chats with any LLM, builds custom agents, and automates deep research. Self-host Khoj on Railway and own your data completely.

This template pre-configures four services: the Khoj server (`ghcr.io/khoj-ai/khoj-cloud:latest`), PostgreSQL with pgvector for vector embeddings (`pgvector/pgvector:pg16`), a Terrarium code execution sandbox (`ghcr.io/khoj-ai/terrarium:latest`), and SearxNG for privacy-focused web search (`searxng/searxng:latest`). Database migrations run automatically via preDeployCommand, and all services connect over Railway's private network.

![Khoj Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777311104/1ea9fea7-7f12-4d95-a37b-9a399f01b148.png)

Khoj is an open-source (AGPL-3.0) AI personal assistant with 34k+ GitHub stars, backed by Y Combinator (W24). It combines semantic search over your private documents with conversational AI powered by any LLM — local models via Ollama or cloud APIs from OpenAI, Anthropic, Google Gemini, and DeepSeek.

Key features:

- **RAG-powered document search** — index PDFs, Markdown, Word, Notion, and org-mode files with pgvector embeddings
- **Multi-LLM support** — use GPT, Claude, Gemini, Llama, Qwen, Mistral, or any Ollama-compatible model
- **Custom AI agents** — build agents with specific knowledge bases, personas, and tool access
- **Deep research automation** — automated web research with scheduled reports and smart notifications
- **Code execution sandbox** — Terrarium sandbox lets agents run Python code safely
- **Privacy-first web search** — SearxNG integration provides web search without tracking
- **Multi-platform clients** — browser, desktop, phone, Obsidian plugin, Emacs, WhatsApp

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SearxNG | `searxng/searxng:latest` | Worker |
| Khoj | `ghcr.io/khoj-ai/khoj-cloud:latest` | Web service |
| Postgres | `pgvector/pgvector:pg16` | Database |
| Terrarium | `ghcr.io/khoj-ai/terrarium:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SEARXNG_BASE_URL` | SearxNG | http://localhost:8080/ | Internal base URL |
| `PORT` | Khoj | 42110 | Gunicorn listening port |
| `KHOJ_DEBUG` | Khoj | False | Production mode |
| `KHOJ_DOMAIN` | Khoj | - | Public domain for CSRF |
| `POSTGRES_DB` | Khoj | khoj | Database name |
| `RESEND_EMAIL` | Khoj | - | Sender email for magic link delivery |
| `KHOJ_NO_HTTPS` | Khoj | False | Railway provides TLS termination |
| `POSTGRES_HOST` | Khoj | - | Internal Postgres hostname |
| `POSTGRES_PORT` | Khoj | 5432 | Database port |
| `POSTGRES_USER` | Khoj | (secret) | Database user |
| `RESEND_API_KEY` | Khoj | (secret) | Resend API key for magic link emails |
| `GUNICORN_WORKERS` | Khoj | 2 | Worker count (reduce for 8GB) |
| `KHOJ_ADMIN_EMAIL` | Khoj | - | Admin account email |
| `KHOJ_SEARXNG_URL` | Khoj | - | Web search URL |
| `POSTGRES_PASSWORD` | Khoj | (secret) | Database password reference |
| `KHOJ_TERRARIUM_URL` | Khoj | - | Code sandbox URL |
| `KHOJ_ADMIN_PASSWORD` | Khoj | (secret) | Admin password (bootstrap-only) |
| `KHOJ_DJANGO_SECRET_KEY` | Khoj | (secret) | Django session signing key |
| `KHOJ_TELEMETRY_DISABLE` | Khoj | True | Disable telemetry |
| `POSTGRES_DB` | Postgres | khoj | Default database |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.khoj`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/khoj)
