# Deploy CoPaw - AI Assistant on Railway

Versatile local/cloud AI assistant with memory, tasks, and chat channels.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/copaw-ai)

## About

CoPaw is a personal AI assistant designed to run locally or in the cloud and connect with multiple chat applications. It provides memory and personalization, scheduled tasks, extensible Skills, MCP support, model configuration, and channels including DingTalk, Feishu, QQ, Discord, and iMessage. It also includes a web-based Console for managing the assistant.

Hosting CoPaw on Railway involves deploying the official `agentscope/copaw:latest` Docker image and exposing its Console on port `8088`. CoPaw stores configuration, memory, and Skills in its working directory, `/app/working`, so a Railway Volume should be mounted there to preserve data across deployments and restarts. Railway provides the public HTTPS endpoint for the Console, while model providers and chat channels can be configured through the Console after deployment. Cloud LLM providers may require API keys, while local model backends such as llama.cpp and MLX do not require cloud API keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CoPaw | `agentscope/copaw:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Asia/Shanghai |
| `HOST` | 0.0.0.0 |
| `PORT` | 8088 |
| `COPAW_PORT` | 8088 |
| `COPAW_SECRET_DIR` | (secret) |
| `COPAW_WORKING_DIR` | /app/working |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/working`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/copaw-ai)
