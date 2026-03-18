# Deploy Deepseek-R1-8b on Railway

Deploy and host Deepseek-R1-8b on railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/deepseek-r1-8b)

## About

DeepSeek-R1-8B is DeepSeek’s open-weight reasoning model designed for long-form problem solving, reflective “chain-of-thought” style outputs, and efficient deployment for developer-driven use cases.

Hosting Deepseek-R1-8b is possible on railway, however this model runs at a very low token per second rate as it is CPU bound.
This template will be kept up to date for ideal optimization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Deepseek-R1 | `ollama/ollama` | Database |
| Caddy | [Err0r430/railway-dockerfiles](https://github.com/Err0r430/railway-dockerfiles) (root: /caddy) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Deepseek-R1 | 11434 |
| `PORT` | Caddy | 443 |
| `API_KEY` | Caddy | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "ollama serve & pid=$!; sleep 5; ollama pull deepseek-r1:8b; wait $pid"`
- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/deepseek-r1-8b)
