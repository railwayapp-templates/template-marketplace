# Deploy Perplexica | Open Source Perplexity AI Alternative on Railway

Self-host Perplexica AI. AI-powered search engine with citations.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/perplexica-ai-search)

## About

Perplexica is an open-source AI-powered search engine — a self-hostable Perplexity AI alternative that uses LLMs to read the web and answer your questions with citations, images, and videos. Originally launched as **Perplexica** and rebranded to **Vane** in March 2026, it ships as a single Docker image (`itzcrazykns1337/vane:latest`) that bundles the Next.js frontend, the API backend, and a private SearxNG metasearch engine.

This Railway template deploys Perplexica with persistent storage for chat history and provider configuration. SearxNG runs inside the same container on `localhost:8080`, so there is nothing extra to wire up — bring your own OpenAI / Anthropic / Gemini / Groq / Ollama key and start searching.

Perplexica answers questions like ChatGPT but searches the live web first, like Perplexity AI — except you control the model, the search index, and the data. There is no vendor lock-in, no usage cap, and no telemetry leaving your container.

Key features:
- Live web search powered by **SearxNG** (no Bing/Brave API keys needed)
- Six focus modes: All, Academic, YouTube, Reddit, Writing, Wolfram Alpha
- Streaming answers with inline citations and image/video sidebars
- File uploads — drop a PDF/DOCX and chat with it
- Pluggable LLMs: OpenAI, Anthropic, Gemini, Groq, Ollama, LM Studio, Lemonade, Transformers
- Conversation history persisted to embedded SQLite

The template is a single-container deployment: Next.js (port 3000) + SearxNG (port 8080, internal only) + SQLite, all inside one image. No external Postgres or Redis required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Perplexica | `itzcrazykns1337/vane:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Next.js HTTP listening port |
| `HOSTNAME` | 0.0.0.0 | Bind address for Next.js standalone |
| `GROQ_API_KEY` | (secret) | Optional — Groq API key |
| `GEMINI_API_KEY` | (secret) | Optional — Google Gemini API key |
| `OPENAI_API_KEY` | (secret) | Optional — OpenAI provider API key |
| `OLLAMA_BASE_URL` | - | Optional — external Ollama endpoint URL |
| `OPENAI_BASE_URL` | https://api.openai.com/v1 | Custom OpenAI-compatible endpoint |
| `LEMONADE_API_KEY` | (secret) | Optional — Lemonade API key |
| `ANTHROPIC_API_KEY` | (secret) | Optional — Anthropic Claude API key |
| `LEMONADE_BASE_URL` | - | Optional — Lemonade provider URL |
| `LM_STUDIO_BASE_URL` | - | Optional — LM Studio endpoint URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/vane/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/perplexica-ai-search)
