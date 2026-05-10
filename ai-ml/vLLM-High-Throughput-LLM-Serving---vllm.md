# Deploy vLLM | High-Throughput LLM Serving on Railway

Self-host vLLM on Railway with an OpenAI-compatible API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vllm)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vllm)

vLLM is a high-throughput inference and serving engine for large language models that exposes an OpenAI-compatible HTTP API. Self-host vLLM on Railway when you want a private, OpenAI-drop-in endpoint for any Hugging Face causal-LM — no rate limits, no per-token billing, no third-party telemetry on your prompts.

This Railway template deploys the official `vllm/vllm-openai-cpu` Docker image as a single service with a persistent volume for the Hugging Face model cache, Bearer-token API key authentication, and a public HTTPS URL. The default model (`Qwen/Qwen2.5-0.5B-Instruct`) is deliberately small and ungated so the deploy boots without configuration; swap `VLLM_MODEL` to any HF model id that fits in 8 GB RAM.

vLLM was built at UC Berkeley's Sky Computing Lab and pioneered PagedAttention — a memory-management technique that turns the KV cache into pageable virtual memory, so concurrent requests share GPU/CPU memory like processes share RAM. Hugging Face put TGI into maintenance mode in late 2025 and now recommends vLLM for new deployments, making vLLM the de-facto open-source standard for serving open-weight LLMs.

Key features:

- **OpenAI-compatible API** — `/v1/chat/completions`, `/v1/completions`, `/v1/embeddings`, `/v1/models` work with any OpenAI SDK
- **Bearer-token auth** on `/v1/*` via `VLLM_API_KEY` (rotatable at any time)
- **Continuous batching + PagedAttention** for higher throughput under concurrency
- **Huge model coverage** — any Hugging Face causal-LM, including quantized (AWQ, GPTQ, INT4) and gated (Llama, Mistral) checkpoints with `HF_TOKEN`
- **Streaming responses** via Server-Sent Events
- **Persistent model cache** on the Railway volume so redeploys don't re-download weights

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vllm | `vllm/vllm-openai-cpu:v0.20.2` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | HTTP listening port |
| `HF_HOME` | /data | Hugging Face cache on volume |
| `HF_TOKEN` | (secret) | optional — required for gated models |
| `VLLM_DTYPE` | bfloat16 | tensor dtype for CPU backend |
| `VLLM_MODEL` | Qwen/Qwen2.5-0.5B-Instruct | Hugging Face model id. For example, qwen model is provided |
| `VLLM_API_KEY` | (secret) | Bearer token for /v1/* endpoints |
| `VLLM_MAX_MODEL_LEN` | 4096 | max context window in tokens |
| `VLLM_CPU_KVCACHE_SPACE` | 4 | GiB reserved for KV cache |

## Configuration

- **Start command:** `/bin/sh -c 'python -m vllm.entrypoints.openai.api_server --host 0.0.0.0 --port ${PORT} --model ${VLLM_MODEL} --dtype ${VLLM_DTYPE} --max-model-len ${VLLM_MAX_MODEL_LEN} --download-dir /data'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/vllm)
