# Deploy Khoj — Self-Hosted AI Second Brain on Railway

Self-host Khoj — chat with your docs, AI second brain

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/khoj-ai-second-brain)

## About

Khoj is an open-source personal AI assistant and "second brain" — chat with your documents, run semantic search across your notes, browse the web, and build custom agents, all self-hosted so your knowledge stays private. Backed by Y Combinator with 34k+ GitHub stars, it connects to OpenAI, Anthropic, or Gemini and turns your files into a searchable, conversational knowledge base. This template deploys Khoj's full stack — server, pgvector database, code sandbox, and web search — pre-wired, so you have a private AI assistant over your own data in minutes.

---

Khoj is a capable multi-service assistant, and a few specifics make it deploy cleanly on Railway — all handled here.

**Four services, pre-wired — the setup that's hard to do by hand.** Khoj isn't a single container: it needs the server, a pgvector database, the Terrarium code-execution sandbox, and SearxNG for web search, all connected. This template wires them over the private network so document search, agent code execution, and web research work immediately, instead of assembling four services and their URLs manually.

**pgvector, not standard Postgres.** Khoj stores document embeddings and runs semantic search through the pgvector extension, which Railway's managed Postgres doesn't include — so this template uses the `pgvector/pgvector:pg16` image. This is what lets Khoj retrieve the right context from your notes by meaning, not just keywords.

**Reduce `GUNICORN_WORKERS` to fit Railway's RAM.** This is the key Railway-specific tuning: Khoj defaults to 6 Gunicorn workers, which exceeds an 8 GB plan and causes out-of-memory crashes. Set `GUNICORN_WORKERS` to 2–3 so the server stays within the plan limit. With cloud LLM APIs, Khoj then runs comfortably in about 4 GB. This template sets a sensible worker count for Railway.

**Use cloud LLM APIs — not local models.** Khoj supports local models via Ollama, but that needs a GPU and 8–16 GB RAM, which isn't practical on Railway. Use cloud APIs instead: set `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or `GEMINI_API_KEY` (or add them in the admin panel), and you bring your own keys, paying each provider directly.

**Set your admin and Django secret.** `KHOJ_ADMIN_EMAIL` and `KHOJ_ADMIN_PASSWORD` create your admin account, and `KHOJ_DJANGO_SECRET_KEY` (a long random 50+ character string) secures sessions — keep it stable. After deploy, sign in at `/server/admin` to add API keys and configure chat models.

**Your data persists in Postgres.** Documents, embeddings, chat history, and agent configurations live in the pgvector database, so they survive redeploys — back it up to preserve your second brain.

Typical cost: **~$10–20/month** on Railway for the four services, plus your LLM provider usage. Khoj is AGPL-3.0 and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Khoj | `ghcr.io/khoj-ai/khoj-cloud` | Web service |
| Terrarium | `ghcr.io/khoj-ai/terrarium` | Worker |
| SearxNG | `searxng/searxng:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Khoj | 42110 | - |
| `KHOJ_DEBUG` | Khoj | False | - |
| `POSTGRES_DB` | Khoj | khoj | - |
| `RESEND_EMAIL` | Khoj | - | Sender email for magic link delivery |
| `KHOJ_NO_HTTPS` | Khoj | False | - |
| `POSTGRES_PORT` | Khoj | 5432 | - |
| `POSTGRES_USER` | Khoj | (secret) | - |
| `RESEND_API_KEY` | Khoj | (secret) | Resend API key for magic link emails |
| `GUNICORN_WORKERS` | Khoj | 2 | - |
| `KHOJ_ADMIN_EMAIL` | Khoj | - | Admin account email |
| `POSTGRES_PASSWORD` | Khoj | (secret) | - |
| `KHOJ_ADMIN_PASSWORD` | Khoj | (secret) | Admin password (bootstrap-only) |
| `KHOJ_DJANGO_SECRET_KEY` | Khoj | (secret) | - |
| `KHOJ_TELEMETRY_DISABLE` | Khoj | True | - |
| `SEARXNG_BASE_URL` | SearxNG | http://localhost:8080/ | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/khoj-ai-second-brain)
