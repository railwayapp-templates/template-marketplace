# Deploy Qwen3-0.6b on Railway

Deploy and Host Qwen3-0.6b on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/qwen3-06b)

## About

Qwen3-0.6B is Alibaba’s open-weight model family designed for lightweight reasoning, fast experimentation, and efficient integration into developer workflows.

Hosting Qwen3-0.6b is possible on railway, however this model runs at a low token per second rate as it is CPU bound.
This template will be kept up to date for ideal optimization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Caddy | [Err0r430/railway-dockerfiles](https://github.com/Err0r430/railway-dockerfiles) (root: /caddy) | Web service |
| Qwen3 | `ollama/ollama` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Caddy | 443 |
| `API_KEY` | Caddy | (secret) |
| `PORT` | Qwen3 | 11434 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "ollama serve & pid=$!; sleep 5; ollama pull qwen3:0.6b; wait $pid"`
- **Volume:** `/root/.ollama`

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/qwen3-06b)
