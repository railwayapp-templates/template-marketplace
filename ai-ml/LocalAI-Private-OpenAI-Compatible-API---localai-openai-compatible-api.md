# Deploy LocalAI | Private OpenAI-Compatible API on Railway

Self-host LocalAI on Railway, run LLMs, images, and audio locally

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/localai-openai-compatible-api)

## About

Deploy LocalAI on Railway to run a self-hosted, OpenAI-compatible AI inference API on your own infrastructure. LocalAI is a free, open-source engine that runs LLMs, generates images, produces audio, and handles embeddings — all without requiring a GPU. Self-host LocalAI on Railway with a single click to get a private AI API endpoint with persistent model storage and API key authentication.

This Railway template deploys a single LocalAI service backed by a persistent volume for model storage. The CPU-optimized image provides full OpenAI API compatibility out of the box, with a built-in web UI for model management and chat.

LocalAI is the open-source AI engine created by Ettore Di Giacinto (mudler). It provides a drop-in replacement for the OpenAI API, enabling developers to run any AI model locally or on their own servers with complete data privacy.

- **Full OpenAI API compatibility** — works with any SDK or tool that supports the OpenAI API format
- **Multi-modal inference** — text generation, image creation (Stable Diffusion), text-to-speech, speech-to-text, and embeddings from a single endpoint
- **No GPU required** — runs efficiently on CPU using optimized backends (llama.cpp, whisper.cpp, stable-diffusion.cpp)
- **Built-in model gallery** — browse and install models from the web UI without manual file management
- **Function calling and tool use** — supports the OpenAI tools API for agentic workflows
- **MCP server support** — acts as a Model Context Protocol server for IDE integrations

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LocalAI | `localai/localai:latest-cpu` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP server listening port |
| `THREADS` | 2 | CPU threads for inference |
| `CONTEXT_SIZE` | 512 | Default model context window |
| `LOCALAI_API_KEY` | (secret) | API key for web UI and API auth |
| `LOCALAI_MODELS_PATH` | /models | Model storage directory path |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/models`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/localai-openai-compatible-api)
