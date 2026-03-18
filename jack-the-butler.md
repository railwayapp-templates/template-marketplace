# Deploy Jack The Butler on Railway

Your AI Concierge That Never Sleeps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/jack-the-butler)

## About

**Jack The Butler** is a self-hosted, agentic AI concierge designed to act as a persistent digital assistant. Unlike standard chatbots, Jack leverages a modular RAG (Retrieval-Augmented Generation) framework to learn from your specific data, remember personal preferences, and execute complex, multi-step workflows across third-party integrations and local services.

Deploying Jack The Butler on Railway is designed to be a "zero-config" experience. It features a self-installer that works out of the box, automatically configuring the environment and initializing the necessary internal structures upon first launch. Unlike heavy enterprise stacks, Jack uses a lightweight SQLite database for persistent storage, meaning you don't have to provision or manage external database clusters.

The system is highly flexible regarding its "brain." You can connect Jack to premium cloud models like OpenAI or Anthropic's Claude for high-end reasoning, or opt for a fully private, cost-effective setup using local AI models (via Ollama or Transformers.js). Railway handles the orchestration, providing you with automated SSL, private networking, and a stable home for your concierge with minimal manual intervention.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jackthebutler/jackthebutler:latest | `ghcr.io/jackthebutler/jackthebutler:latest` | Web service |

## Configuration

- **Healthcheck:** `/health/live`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/template/jack-the-butler)
