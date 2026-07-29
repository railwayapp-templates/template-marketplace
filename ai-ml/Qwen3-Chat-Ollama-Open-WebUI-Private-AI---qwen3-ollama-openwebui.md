# Deploy Qwen3 Chat — Ollama + Open WebUI, Private AI on Railway

Run Qwen3 models privately — Ollama + chat UI, or via API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qwen3-ollama-openwebui)

## About

Run Alibaba's Qwen3 open models privately with a ready-made stack — **Ollama** as the model server and **Open WebUI** as a ChatGPT-style interface, deployed in one click. Pick which Qwen3 model to load, and the template handles the download, wires the chat UI to the model server, and persists both your models and your conversations. No manual Ollama setup, no config files. Or point it at a Qwen API to use the largest models — your choice per deployment.

---

One thing determines what you can realistically run here, and stating it plainly saves disappointment: **Railway is CPU-only — there are no GPUs.**

**This runs the small Qwen3 models, not the flagship ones.** Qwen3 spans a huge range — from tiny 0.6B and 1.7B models up to 30B, 32B, and a 235B MoE flagship. The larger models need serious GPU memory and won't run on a CPU host. What runs well here are the **small dense models** — `qwen3:0.6b`, `1.7b`, `4b`, and (with enough RAM) `8b` — which are genuinely capable for chat, drafting, and lightweight reasoning, but respond more slowly on CPU than a GPU-backed service. Deploy expecting a private, self-hosted small model and it delivers; expecting the 235B flagship's speed and depth locally, it can't.

**Want the big Qwen models?** Skip local inference and point Open WebUI at a Qwen API — Alibaba's DashScope or any OpenAI-compatible Qwen endpoint. Set the API base URL and key in Open WebUI, and you get the full-size models running on the provider's GPUs while Railway hosts your private chat interface and history. The template supports both paths: small models locally via Ollama, or large models via API.

**Volumes are essential.** Qwen3 models are multiple gigabytes each; without a persistent volume on Ollama, every redeploy re-downloads them — slow and wasteful. Open WebUI needs its own volume for accounts and chat history, and its `WEBUI_SECRET_KEY` must stay stable or sessions are invalidated. Both are handled here.

Typical cost: **~$10–20/month** on Railway depending on model size and RAM — larger local models need more memory. Everything is open source and free; API mode adds the provider's usage cost.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ollama | `ollama/ollama` | Database |
| Open WebUI | `ghcr.io/open-webui/open-webui:main` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OLLAMA_HOST` | :: |

## Configuration

- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/qwen3-ollama-openwebui)
