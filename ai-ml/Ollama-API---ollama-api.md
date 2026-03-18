# Deploy Ollama API on Railway

A powerful platform for running AI models securely through API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ollama-api)

## About

Ollama API enables you to run large language models and expose them via authenticated HTTP endpoints. This template provides a production-ready deployment with proxy authentication and customizable model selection through environment variables, making it easy to serve models like Llama, Mistral, and CodeLlama at scale.

Hosting Ollama API involves containerizing the Ollama runtime environment and exposing its REST endpoints through a secure proxy layer. This deployment handles model downloading, and request routing. The template includes authentication middleware to secure your API endpoints, automatic model installation based on configuration, and horizontal scaling capabilities to handle varying workloads efficiently.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ollama | `ollama/ollama` | Database |
| Auth Proxy | [FraglyG/CaddyAuthProxy](https://github.com/FraglyG/CaddyAuthProxy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ollama | 11434 | - |
| `MODEL` | ollama | - | Model from https://ollama.com/library |
| `PORT` | Auth Proxy | 80 | - |
| `API_KEY` | Auth Proxy | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "ollama serve & pid=$!; sleep 5; ollama pull $MODEL; wait $pid"`
- **Volume:** `/root/.ollama`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/ollama-api)
