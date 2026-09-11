# Deploy nolock + llama.cpp: ai coding harness + local slms (micro-agents) on Railway

ai coding harness + local slms (micro-agents) - unlimited free tokens

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nolock-llamacpp-ai-coding-harness-local-)

## About

nolock is an AI-native coding harness — a full IDE with chat, agents, micro-agents, tools, terminal, notebooks, and git session diffs. Paired with llama.cpp, it runs local small language models (SLMs) for private, free-token micro-agent execution — all from your browser, no API keys, no per-token bills.

This stack deploys two isolated Railway services. **nolock** serves the web frontend + Rust backend (the exact same codebase as the Tauri v2 desktop app) — chat, agents, micro-agents, file tools, search, linter, sessions, and git diffs. **llama.cpp** runs the official server image and pulls a GGUF model from HuggingFace into a persistent volume on first boot. The services talk over Railway's **private network** — llama.cpp is never exposed publicly. The model is a configuration (`MODEL_HF`), swapped by changing a variable and redeploying; previously downloaded models persist on the volume, so switching back is instant. Tool calling works end-to-end: the SLM calls tools (file ops, search, git) and uses the results in its answer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nolock | [impacte-tech/nolock](https://github.com/impacte-tech/nolock) | Web service |
| llamacpp | `ghcr.io/ggml-org/llama.cpp:server` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LLAMACPP_URL` | nolock | http://llamacpp.railway.internal:8080 | internal llamacpp dns |
| `NOLOCK_DATA_DIR` | nolock | /data/nolock | points at the Railway volume (already set on the service) |
| `NOLOCK_WEB_TOKEN` | nolock | (secret) | your token |
| `MODEL_HF` | llamacpp | impacte/ullr:Q4_K_M | choose your own HF model |
| `LLAMA_CACHE` | llamacpp | /models | model cache directory |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'echo MODEL_HF=[$MODEL_HF]; exec /app/llama-server -hf "$MODEL_HF" --host 0.0.0.0 --port 8080 --threads 4 --ctx-size 4096'`
- **Volume:** `/models`

**Category:** AI/ML · **Languages:** TypeScript, Rust, CSS, Shell, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/nolock-llamacpp-ai-coding-harness-local-)
