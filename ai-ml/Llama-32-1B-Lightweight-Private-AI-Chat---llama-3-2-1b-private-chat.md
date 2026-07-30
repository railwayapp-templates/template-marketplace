# Deploy Llama 3.2 1B — Lightweight Private AI Chat on Railway

Self-host Llama 3.2 1B — fast, lightweight private chat on CPU

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/llama-3-2-1b-private-chat)

## About

Llama 3.2 1B is Meta's compact open language model — small enough to run comfortably on CPU, fast enough to feel responsive, and capable for everyday tasks like chat, summarization, classification, and drafting. This template deploys it as a private, self-hosted assistant using **Ollama** as the model server and **Open WebUI** as a ChatGPT-style interface, in one click. Because the model is only about 1.3 GB, it fits and starts quickly where larger models can't — the right size for Railway's CPU.

---

The appeal of Llama 3.2 1B is precisely its size, and this template is built around that strength rather than pretending it's something bigger.

**Small, fast, and CPU-friendly — by design.** At roughly 1 billion parameters (~1.3 GB), Llama 3.2 1B runs well on CPU, which is exactly what Railway provides. Unlike large models that crawl or crash on CPU hardware, the 1B loads quickly, responds without long waits, and fits in a modest memory footprint. It's the model to reach for when you want a private assistant that's genuinely usable on standard infrastructure.

**Capable for the right tasks.** A 1B model is excellent for chat, summarization, text classification, simple extraction, drafting, and lightweight assistant work. It is not a frontier reasoning model — for complex multi-step reasoning or long, nuanced generation you'd want a larger model. Matching the task to the model is what makes it feel great: fast and reliable at what it's good at.

**Volumes keep it efficient.** The model is cached on Ollama's persistent volume so it isn't re-downloaded on every redeploy, and Open WebUI stores accounts and chat history on its own volume. Open WebUI's `WEBUI_SECRET_KEY` should stay stable, or existing sessions are invalidated. Both are handled here.

**Want a bigger model later?** The same stack runs larger Llama variants (3B, 8B) if you allocate more RAM, or you can point Open WebUI at a hosted API for frontier models while keeping the interface private. This template starts with the fast, lightweight 1B.

Typical cost: **~$5–10/month** on Railway — the small model keeps memory and cost low. Everything is open source and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Caddy | [Err0r430/railway-dockerfiles](https://github.com/Err0r430/railway-dockerfiles) | Web service |
| llama3 | `ollama/ollama` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Caddy | 443 |
| `API_KEY` | Caddy | (secret) |
| `PORT` | llama3 | 11434 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.ollama`

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/llama-3-2-1b-private-chat)
