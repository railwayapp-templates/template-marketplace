# Deploy DeepSeek Chat — Ollama + Open WebUI, Private AI on Railway

Run distilled DeepSeek models privately — Ollama + chat UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deepseek-ollama-openwebui)

## About

Run DeepSeek's distilled open models privately with a ready-made stack — **Ollama** as the model server and **Open WebUI** as a ChatGPT-style interface, deployed in one click. Pick which DeepSeek model to load, and the template handles downloading it, wiring the chat UI to the model server, and persisting both your models and your conversations. No manual Ollama setup, no config files.

---

One thing to understand before deploying, because it sets expectations correctly: **Railway is CPU-only — there are no GPUs.** That determines which DeepSeek models are realistic here.

**This runs the distilled DeepSeek models, not the full 671B ones.** DeepSeek's flagship R1 and V3 models need hundreds of gigabytes of GPU memory across multiple high-end GPUs — impossible on any CPU host. What runs well here are the **distilled variants** — `deepseek-r1:1.5b`, `7b`, `8b` — which are compact enough for CPU inference. They're genuinely capable for many tasks, but they are smaller models, and on CPU they respond more slowly than a GPU-backed service. If you deploy expecting the full R1's speed and depth, that expectation won't match reality; deploy expecting a private, self-hosted small reasoning model and it delivers.

**Want the full DeepSeek models instead?** Skip local inference and point Open WebUI at DeepSeek's API — set the DeepSeek API base URL and key in Open WebUI, and you get the full R1/V3 models running on DeepSeek's own GPUs while Railway just hosts your private chat interface and history. The template supports both paths: local distilled models via Ollama, or the full models via API.

**Volumes are essential.** DeepSeek models are multiple gigabytes each; without a persistent volume on Ollama, every redeploy re-downloads them, which is slow and wasteful. Open WebUI needs its own volume for accounts and chat history. Both are mounted here.

Typical cost: **~$10–20/month** on Railway depending on model size and RAM — larger distilled models need more memory. Everything is open source and free; API mode adds DeepSeek's usage cost.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| deepseek | `ollama/ollama` | Database |
| Open-WebUI | `ghcr.io/open-webui/open-webui` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `OLLAMA_HOST` | deepseek | :: |
| `OLLAMA_DEFAULT_MODELS` | deepseek | deepseek-r1:1.5b |
| `WEBUI_SECRET_KEY` | Open-WebUI | (secret) |
| `CORS_ALLOW_ORIGIN` | Open-WebUI | * |

## Configuration

- **Volume:** `/root/.ollama`
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deepseek-ollama-openwebui)
