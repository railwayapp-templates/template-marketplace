# Deploy llama-3.2-1b on Railway

Deploy and host llama 3.2-1b on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/llama-32-1b)

## About

Llama-3.2-1B is Meta’s open-weight model designed for efficient reasoning, instruction following, and lightweight deployment across diverse developer use cases.

Hosting Llama3.2-1b is possible on railway, however this model runs at a very low token per second rate as it is CPU bound.
This template will be kept up to date for ideal optimization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Caddy | [Err0r430/railway-dockerfiles](https://github.com/Err0r430/railway-dockerfiles) (root: /caddy) | Web service |
| llama3 | `ollama/ollama` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Caddy | 443 |
| `API_KEY` | Caddy | (secret) |
| `PORT` | llama3 | 11434 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "ollama serve & pid=$!; sleep 5; ollama pull llama3.2:1b; wait $pid"`
- **Volume:** `/root/.ollama`

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/llama-32-1b)
