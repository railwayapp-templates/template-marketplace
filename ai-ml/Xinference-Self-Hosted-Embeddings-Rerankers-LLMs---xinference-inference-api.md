# Deploy Xinference — Self-Hosted Embeddings, Rerankers & LLMs on Railway

Self-host an OpenAI-compatible endpoint — embeddings & rerankers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xinference-inference-api)

## About

Xinference (Xorbits Inference) is an open-source model-serving platform that puts LLMs, embedding models, and rerankers behind one OpenAI-compatible API — swap OpenAI for a self-hosted endpoint without rewriting your app. This template deploys the CPU build with a persistent volume for model weights and built-in authentication, sized for what runs well on Railway: fast embedding and reranker models for RAG pipelines, plus small quantized LLMs. Point any OpenAI SDK at your own private inference endpoint, on infrastructure you own.
---

Xinference is a powerful model server, and the key to a good Railway deployment is running the right kind of model — this template is set up around that.

**Best on Railway for embeddings and rerankers — the RAG workhorses.** Railway is CPU-only (no GPU), and embedding and reranker models are small, fast, and run well on CPU. Models like `bge-small-en-v1.5` (embeddings) and `bge-reranker-base` (reranking) give you a private, self-hosted endpoint for the retrieval side of any RAG pipeline — no per-call embedding fees, your data staying on your infrastructure. This is the strongest fit for the platform, and the reason to run Xinference here.

**Small quantized LLMs run too — right-size the plan.** You can serve small Q4-quantized LLMs (e.g. a 7B Q4_K_M model), but CPU inference is slower than GPU and RAM-bound: anything beyond a ~7B Q4 model needs more than 8 GB RAM and will OOM at launch. Pick smaller models or smaller quants, and size your Railway plan to the largest model you intend to run. For heavy, low-latency LLM serving, a GPU host is the right home; for a private endpoint and light generation, Railway works.

**One OpenAI-compatible endpoint for many models.** Once a model is running, point any OpenAI SDK at `https://your-domain/v1` with your API key as the bearer token — chat, completions, and embeddings all work through the standard interface, so you swap providers without changing code. It integrates natively with LangChain, LlamaIndex, and Dify.

**Authenticated from boot.** The endpoint is protected with JWT and an `XINFERENCE_API_KEY` rendered from your environment variables, and the web UI is guarded by `XINFERENCE_ADMIN_USER` and `XINFERENCE_ADMIN_PASSWORD`. Set strong values — this is a public endpoint that serves models.

**Models persist on the volume.** Downloaded weights, the model registry, and the HuggingFace cache live on the `/data` volume, so they survive redeploys instead of re-downloading each time. Manage models from the web UI at your domain with `/ui/` appended (note the trailing slash).

Typical cost: **~$5–15/month** on Railway depending on the model size and RAM you provision. Xinference is Apache-2.0 licensed and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Xinference | `xprobe/xinference:latest-cpu` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9997 | - |
| `HF_HOME` | /data/huggingface | - |
| `XINFERENCE_HOME` | /data | - |
| `XINFERENCE_API_KEY` | (secret) | - |
| `XINFERENCE_MODEL_SRC` | huggingface | - |
| `XINFERENCE_ADMIN_USER` | (secret) | Admin login username |
| `XINFERENCE_SECRET_KEY` | (secret) | - |
| `XINFERENCE_ADMIN_PASSWORD` | (secret) | Admin login password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/xinference-inference-api)
