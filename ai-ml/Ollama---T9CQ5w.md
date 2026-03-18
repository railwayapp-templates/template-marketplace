# Deploy Ollama on Railway

A powerful and user-friendly platform for running LLMs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/T9CQ5w)

## About

Ollama is a platform designed for deploying and managing AI models. It provides a user-friendly interface for integrating AI into applications, offering tools to streamline the deployment process. Ollama supports various model types and allows customization to fit specific needs. Its flexible architecture ensures scalability and efficiency, making it suitable for both small projects and large-scale implementations.

![Ollama - Banner image](https://ollama.com/public/blog/openai.png)

Hosting Ollama means running an AI model deployment platform that manages model downloads, inference serving, and API endpoints for AI model access. The platform handles model storage, memory management for large language models, and API request processing while maintaining model availability for applications. Production deployment requires managing disk space for model storage, configuring memory allocation for model inference, handling concurrent API requests, and maintaining model version management. Railway simplifies Ollama deployment by providing persistent storage for models, managing container resources for inference workloads, handling API routing, and offering optional web interface integration for user-friendly model configuration.

![Ollama - Banner image](https://github.com/jmorganca/ollama/assets/3325447/4b63b9ee-f9c9-4aa1-8e2f-3b9e3df13295)

ℹ️ **Optional Feature**: This template also includes an optional user-friendly web interface to configure Ollama, visit their [repository](https://github.com/open-webui/open-webui) for related assistance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ollama | `ollama/ollama` | Database |
| Open WebUI | `ghcr.io/open-webui/open-webui` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OLLAMA_HOST` | :: |

## Configuration

- **Volume:** `/root/.ollama`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/T9CQ5w)
