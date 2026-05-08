# Deploy Flowise on Railway

Lightweight Flowise with web UI, auth, and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-ai-agent)

## About

Flowise AI Agent is an open-source, low-code platform for building AI agents, chatbots, and LLM workflows through a visual drag-and-drop interface. It helps you connect language models, tools, memory, retrievers, vector stores, APIs, and custom logic without building a full AI application from scratch.

![](https://i.imgur.com/hbOkfpX.png)

Deploying Flowise AI Agent on Railway uses the prebuilt official Flowise Docker image for a faster and simpler setup. Instead of building Flowise from the GitHub repository, Railway pulls the ready-to-run image and starts the web UI on port `3000`. Railway manages infrastructure, networking, deployments, and scaling, while Flowise provides the browser-based interface for creating and managing AI agents. A Railway Volume should be mounted at `/root/.flowise` so saved flows, credentials, API keys, logs, and configuration files persist across restarts and redeployments.

> **Note**
> This template uses the prebuilt Flowise Docker image, so deployment is usually faster, lighter, and lower-cost than building Flowise from source.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flowiseai | `flowiseai/flowise` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `FLOWISE_PASSWORD` | (secret) |
| `FLOWISE_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.flowise`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-ai-agent)
