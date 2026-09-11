# Deploy Vane (Perplexica) + SearXNG on Railway

Perplexity-style AI answering engine with a private SearXNG backend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vane-perplexica-searxng)

## About

Vane, formerly Perplexica, is an open-source, privacy-focused AI answering engine. It searches the web through SearXNG, reads the results with the LLM of your choice, and returns cited answers in a Perplexity-style chat UI. It supports OpenAI, Anthropic, Google Gemini, Groq, Ollama, LM Studio, and any OpenAI-compatible server, plus local embeddings that need no API key.

Vane is a Next.js app that keeps its settings, chat history, and uploads in a single `data` directory, and it needs a SearXNG instance with the JSON format enabled. Upstream's default Docker image bundles SearXNG inside the Vane container. This template follows upstream's documented alternative: the official slim image (`itzcrazykns1337/vane:slim-v1.12.2`) talks to a separate, private SearXNG service over Railway's internal network. Vane gets a public domain, a healthcheck on `/`, and a volume at `/home/vane/data`. SearXNG is built from the same source as the published OpenClaw and Hermes templates (JSON API on, rate limiter off), has no public domain, and keeps its `settings.yml` on its own volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SearXNG | [protemplate/searxng](https://github.com/protemplate/searxng) | Database |
| Vane | `itzcrazykns1337/vane:slim-v1.12.2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | SearXNG | 8080 | SearXNG listen port. The official image binds [::]:8080 (GRANIAN_HOST=:: / GRANIAN_PORT=8080). Must be set explicitly so Vane can reference ${{SearXNG.PORT}} over private networking and so the /healthz healthcheck probes the right port. |
| `SEARXNG_BASE_URL` | SearXNG | - | Base URL SearXNG uses for absolute links (server.base_url). This service is private-only, so it points at the Railway private domain. If you add a public domain, change it to https://<domain>/. |
| `SEARXNG_SECRET_KEY` | SearXNG | (secret) | Session secret written into /etc/searxng/settings.yml (server.secret_key) by the image entrypoint at boot. |
| `SEARXNG_UWSGI_THREADS` | SearXNG | 4 | Legacy thread count build arg kept for parity with the shared SearXNG source. Current granian-based images ignore it (GRANIAN_BLOCKING_THREADS=4). |
| `SEARXNG_UWSGI_WORKERS` | SearXNG | 4 | Legacy worker count build arg kept for parity with the shared SearXNG source. Current granian-based images ignore it. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | SearXNG | true | Railway flag that makes Alpine/musl DNS resolve *.railway.internal names correctly. Required for private networking from this image. |
| `PORT` | Vane | 3000 | Vane listen port. Railway's healthcheck and edge proxy probe $PORT, and the Next.js standalone server reads PORT, so keep it at 3000 (the domain target port). |
| `HOSTNAME` | Vane | 0.0.0.0 | Bind address for the Next.js standalone server. Docker sets HOSTNAME to the container id, which makes Next.js bind a single interface and fail Railway's healthcheck; 0.0.0.0 listens on all interfaces. |
| `GROQ_API_KEY` | Vane | (secret) | Optional. Pre-registers a Groq provider on first boot. |
| `GEMINI_API_KEY` | Vane | (secret) | Optional. Pre-registers a Google Gemini provider (chat + embeddings) on first boot. |
| `OPENAI_API_KEY` | Vane | (secret) | Optional. Pre-registers an OpenAI provider on first boot. You can also add any provider (OpenAI, Anthropic, Gemini, Groq, Ollama, LM Studio, Lemonade) in the setup wizard or Settings. |
| `SEARXNG_API_URL` | Vane | - | Private URL of the bundled SearXNG service (no trailing slash; Vane appends /search?format=json). Seeds search.searxngURL in data/config.json on first boot; change it later in Settings > Search. |
| `ANTHROPIC_API_KEY` | Vane | (secret) | Optional. Pre-registers an Anthropic provider on first boot. Anthropic has no embedding models; keep the built-in local Transformers embeddings or add another provider. |

## Configuration

- **Healthcheck:** `/healthz`
- **Volume:** `/etc/searxng`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/vane/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/vane-perplexica-searxng)
