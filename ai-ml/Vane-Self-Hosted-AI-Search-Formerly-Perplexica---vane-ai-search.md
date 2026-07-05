# Deploy Vane — Self-Hosted AI Search, Formerly Perplexica on Railway

Self-host Vane (ex-Perplexica): AI web search with cited answers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vane-ai-search)

## About

Vane — **formerly Perplexica**, renamed in March 2026 — is the most popular open-source
self-hosted alternative to Perplexity AI, with **20k+ GitHub stars**. Ask a question and it
searches the live web through its own bundled private SearXNG, reranks the results, and streams
a cited answer with source images and videos. Connect Claude, GPT-4o, Gemini, Groq, Ollama, or
LM Studio — you control the model, the search index, and the data.

One Docker image. No telemetry. No rate limits. No $20/month Perplexity Pro subscription.
Self-host on Railway for ~$10/month flat with persistent chat history and provider config.

---

Perplexity Pro costs $20/month, logs every query, and locks you to their models. Vane gives you
the same experience — live web search, cited answers, focus modes — on your own infrastructure
with full query privacy. Since the March 2026 rename from Perplexica, the project has kept
shipping: a redesigned setup wizard, deep research mode, file uploads, domain-limited search,
and a custom streaming engine that replaced LangChain entirely.

Railway runs the bundled image with automatic HTTPS and a persistent volume. The image ships
Playwright and Chromium for headless page rendering, so allocate **at least 4 GB RAM** to avoid
out-of-memory failures during cold starts — this template pre-configures that.

Typical cost: **~$10/month** on Railway's Hobby plan. Perplexity Pro is $20/month per user.
Groq and Gemini both offer generous free API tiers, so your per-query model cost can be zero.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Vane | `itzcrazykns1337/vane:latest` | Worker |
| Bifrost | `maximhq/bifrost:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Vane | 3000 | - |
| `HOSTNAME` | Vane | :: | - |
| `APP_HOST` | Bifrost | 0.0.0.0 | - |
| `APP_PORT` | Bifrost | 8080 | - |
| `LOG_LEVEL` | Bifrost | info | - |
| `LOG_STYLE` | Bifrost | json | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/app/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/vane-ai-search)
