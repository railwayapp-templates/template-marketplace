# Deploy nolock + llama.cpp: ai coding harness + local slms (micro-agents) on Railway

ai coding harness + local slms (micro-agents)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nolock-llamacpp-ai-coding-harness-local-)

## About

nolock is an AI-native coding harness — a full IDE with chat, agents, micro-agents, tools, terminal, notebooks, and git session diffs. Paired with llama.cpp, it runs local small language models (SLMs) for private, free-token micro-agent execution — all from your browser, no API keys, no per-token bills.

This stack deploys two isolated Railway services. **nolock** serves the web frontend + Rust backend (the exact same codebase as the Tauri v2 desktop app) — chat, agents, micro-agents, file tools, search, linter, sessions, and git diffs. **llama.cpp** runs the official server image wrapped with a small model store, and pulls a GGUF model from HuggingFace into a persistent volume on first boot. The services talk over Railway's **private network** — llama.cpp is never exposed publicly. The model is a configuration (`MODEL_HF`), swapped by changing a variable and redeploying; models pulled from the nolock UI persist on the volume, so switching back is instant. Tool calling works end-to-end: the SLM calls tools (file ops, search, git) and uses the results in its answer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nolock | [impacte-tech/nolock](https://github.com/impacte-tech/nolock) | Web service |
| llama.cpp | [impacte-tech/nolock](https://github.com/impacte-tech/nolock) (root: /deploy/llamacpp) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LLAMACPP_URL` | nolock | http://llamacpp.railway.internal:8080 | internal llamacpp dns |
| `NOLOCK_DATA_DIR` | nolock | /data/nolock | points at the Railway volume (already set on the service) |
| `NOLOCK_WEB_TOKEN` | nolock | (secret) | your token |
| `NOLOCK_MODEL_PULL_TOKEN` | nolock | (secret) | shared model pull token |
| `LLAMACPP_MODEL_STORE_URL` | nolock | http://llamacpp.railway.internal:8081 | model store url |
| `PORT` | llama.cpp | 8080 | inference port |
| `MODEL_HF` | llama.cpp | impacte/ullr:Q4_K_M | "choose your own HF model" |
| `LLAMA_CACHE` | llama.cpp | /models | "model cache directory" |
| `NOLOCK_MODEL_DIR` | llama.cpp | /models | model storage path |
| `NOLOCK_MODEL_PULL_TOKEN` | llama.cpp | (secret) | secret, same value as defined in the other service |
| `NOLOCK_MODEL_STORE_PORT` | llama.cpp | 8081 | model provider private port |

## Configuration

- **Start command:** `/app/nolock-server`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/entrypoint.sh`
- **Volume:** `/models`

**Category:** AI/ML · **Languages:** TypeScript, Rust, CSS, Python, Shell, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/nolock-llamacpp-ai-coding-harness-local-)
