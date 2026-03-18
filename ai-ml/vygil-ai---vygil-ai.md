# Deploy vygil-ai on Railway

Autonomous Activity Tracking & Anomaly Detection

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/vygil-ai)

## About

Hosting Vygil AI involves deploying a multi-service architecture consisting of a React frontend, FastAPI backend, and Node.js MCP server. The application uses Docker containerization with multi-stage builds optimized for Railway's infrastructure. Railway automatically handles service orchestration, environment management, and scaling. The platform requires minimal configuration - simply set your LLM API keys and Railway manages the rest, including automatic HTTPS, domain provisioning, and health monitoring.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vygil-ai | [harmanpunn/vygil-ai](https://github.com/harmanpunn/vygil-ai) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | Enter your OPENAI API Key |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/vygil-ai)
