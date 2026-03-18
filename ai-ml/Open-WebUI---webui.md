# Deploy Open WebUI on Railway

Extensible, Feature-Rich, and User-Friendly Self-Hosted AI Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/webui)

## About

Open WebUI is an extensible, feature-rich, and user-friendly self-hosted AI platform designed to operate entirely offline. It supports various LLM runners like Ollama and OpenAI-compatible APIs, with built-in inference engine for RAG, making it a powerful AI deployment solution for teams and individuals.

Hosting Open WebUI involves deploying a comprehensive AI chat interface that can connect to multiple LLM backends. The platform requires a persistent database (SQLite, PostgreSQL, or cloud storage), optional vector database for RAG functionality, and compute resources to handle web requests and AI model interactions. Open WebUI supports horizontal scalability through Redis-backed sessions, making it suitable for both single-user installations and enterprise deployments. The application can be configured with various authentication methods, custom theming, and integration with external services like cloud storage providers. Resource requirements scale based on usage patterns and enabled features like RAG, image generation, and voice capabilities.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open WebUI | `ghcr.io/open-webui/open-webui` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OLLAMA_BASE_URL` | https://ollama.com |

## Configuration

- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/webui)
