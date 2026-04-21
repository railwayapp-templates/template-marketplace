# Deploy Tabby | Open-Source AI Code Assistant on Railway on Railway

Self Host Tabby. AI code completions, chat, and codebase search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tabby)

## About

Deploy Tabby on Railway to run your own private AI coding assistant with full data control. Self-host Tabby and get intelligent code completions, inline chat, and codebase-aware suggestions without sending code to third-party cloud services.

This Railway template deploys Tabby with StarCoder-1B for code completion, Qwen2-1.5B-Instruct for chat, and Nomic-Embed-Text for code search — all running on CPU with persistent model storage via Railway Volumes.

![Tabby ML Chat](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776700508/tabby_chat_qecagc.png)

Tabby is an open-source, self-hosted AI coding assistant that provides GitHub Copilot-like functionality without external dependencies. Built in Rust by TabbyML, it runs inference locally using GGUF-quantized models through an integrated llama.cpp server.

Key features:

- **Code completion** — context-aware inline suggestions as you type
- **Chat interface** — ask questions about code, get explanations, generate snippets
- **Codebase indexing** — RAG-powered answers grounded in your private repositories
- **Multi-IDE support** — VS Code, JetBrains, Vim/Neovim, Emacs via LSP
- **Admin dashboard** — team management, usage analytics, model configuration
- **Fine-tuning support** — train on your private codebase for domain-specific completions
- **No telemetry** — zero data leaves your infrastructure

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tabby | `tabbyml/tabby` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP server listening port |
| `TABBY_ROOT` | /data | Root data directory on volume |
| `TABBY_WEBSERVER_JWT_TOKEN_SECRET` | (secret) | JWT signing key (UUID format) |

## Configuration

- **Start command:** `/bin/sh -c 'export LD_LIBRARY_PATH=/usr/local/cuda-12.4/compat:$LD_LIBRARY_PATH && /opt/tabby/bin/tabby-cpu serve --model StarCoder-1B --chat-model Qwen2-1.5B-Instruct --device cpu --host 0.0.0.0 --port 8080'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/tabby)
