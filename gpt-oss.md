# Deploy GPT-OSS on Railway

Deploy and host GPT-OSS on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gpt-oss)

## About

The GPT-OSS line is OpenAI’s open-weight models designed for powerful reasoning, agentic tasks, and versatile developer use cases.

Hosting GPT-OSS is possible on railway, however this model runs at a very low token per second rate as it is CPU bound.
This template will be kept up to date for ideal optimization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GPT-OSS Model | `ollama/ollama` | Database |
| Caddy | [Err0r430/railway-dockerfiles](https://github.com/Err0r430/railway-dockerfiles) (root: caddy) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | GPT-OSS Model | 11434 |
| `PORT` | Caddy | 443 |
| `API_KEY` | Caddy | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "ollama serve & pid=$!; sleep 5; ollama pull gpt-oss; wait $pid"`
- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/gpt-oss)
