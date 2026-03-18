# Deploy Function Gemma on Railway

Lightweight function calling model based on Gemma 3

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/function-gemma)

## About

FunctionGemma is Google's specialized function calling model that translates natural language commands into executable API actions. With just 270M parameters, it delivers near-instant latency for on-device agentic workflows, achieving 85% accuracy on mobile action tasks after fine-tuning. Running on as little as 550MB of RAM, it's perfect for privacy-focused, local-first applications that need reliable function calling without sending data to external services.

Hosting FunctionGemma provides access to a lightweight, specialized model designed as a foundation for building custom function calling agents. This deployment handles natural language to API translation, tool selection, and structured function call generation. With its compact size and efficient architecture, it enables developers to create fast, private agents that execute commands locally, from smart home controls to mobile system actions, while maintaining complete data privacy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Auth Proxy | [FraglyG/CaddyAuthProxy](https://github.com/FraglyG/CaddyAuthProxy) | Web service |
| Function Gemma | `ollama/ollama` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Auth Proxy | 80 | - |
| `API_KEY` | Auth Proxy | (secret) | - |
| `PORT` | Function Gemma | 11434 | - |
| `MODEL` | Function Gemma | functiongemma:270m | Model from https://ollama.com/library |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "ollama serve & pid=$!; sleep 5; ollama pull $MODEL; wait $pid"`
- **Volume:** `/root/.ollama`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/function-gemma)
